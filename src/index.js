import { env } from 'node:process';
import { readdirSync } from 'node:fs';
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import Members from './module/flux/include/Members/index.js';
import update from './utils/update.js';
import { searchJSCommand } from './utils/utils.js';
import { art, info, activity } from './module/functions/Presentation.js';

dotenv.config();
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

art();

update();


try {
  await searchJSCommand('module/commands/include', !1, (module) => {
    client.commands.set(module.command.name, module);
  });

  client.once('ready', () => {
    console.log("\r");
    activity(client);
    info(client);
    console.log("\r\r");
  });

  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

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
  console.log('Not found file in commands/include !');
  console.error(err);
}
