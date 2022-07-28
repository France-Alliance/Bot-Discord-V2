import { env } from 'node:process';
import { readdirSync } from 'node:fs';
import { Client, Collection, Intents } from 'discord.js';
import dotenv from 'dotenv';
import { update } from './utils/update.js';
import Members from './module/flux/include/Members/index.js';

dotenv.config();
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();

update();

try {
  // console.log(readdirSync('./src/module/commands/include'));
  const commandFoler = readdirSync('./src/module/commands/include/');

  for (const commandFiles of commandFoler) {
    import(`./module/commands/include/${commandFiles}/index.cjs`)
      .then((module) => {
        client.commands.set(module.command.name, module);
      })
      .catch((err) => console.error(err));
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

  Members.join(client);
  Members.exit(client);

  client.login(env.TOKEN);
} catch (err) {
  console.log('Not found file in ./commands/include !');
  console.error(err);
}
