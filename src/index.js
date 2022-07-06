const { readdirSync } = require('node:fs');
const { env } = require('node:process');

const { Client, Collection, Intents } = require('discord.js');
const dotenv = require('dotenv');

const { members } = require('./module/flux/members.js');
const { update } = require('./utils/update.js');

dotenv.config();
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();

update();

try {
  const commandFiles = readdirSync('./src/module/commands/include/').filter((file) =>
    file.endsWith('.js')
  );

  for (const file of commandFiles) {
    const command = require(`./module/commands/include/${file}`);
    client.commands.set(command.data.name, command);
  }

  client.once('ready', () => {
    console.log('Ready!');
  });

  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      await interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      });
    }
  });

  members.join(client);
  members.exit(client);

  client.login(env.TOKEN);
} catch (err) {
  console.log('Not found file in ./commands !');
  console.error(err)
}
