import { env } from 'node:process';
import { Client, Collection, IntentsBitField } from 'discord.js';
import dotenv from 'dotenv';
import Members from './module/flux/include/Members/index.js';
import update from './utils/update.js';
import { searchJSCommand } from './utils/utils.js';
import ready from './utils/ready.js';
import { logs } from './utils/logs.cjs';
import { schedule } from 'node-cron';
import run from './utils/scrapper.js';

dotenv.config();

const Intents = new IntentsBitField(3276799);
//3276799
//[GatewayIntentBits.Guilds]
const client = new Client({ intents: Intents });
let middlewares = [];

client.commands = new Collection();

console.log(`
  _____               _                _         _______                         
 / ____|             | |              | |       |__   __|                        
| |      ___   _ __  | |_  _ __  ___  | |  ___     | |  ___ __      __ ___  _ __ 
| |     / _ \\ | '_ \\ | __|| '__|/ _ \\ | | / _ \\    | | / _ \\\\ \\ /\\ / // _ \\| '__|
| |____| (_) || | | || |_ | |  | (_) || ||  __/    | || (_) |\\ V  V /|  __/| |   
 \\_____|\\___/ |_| |_| \\__||_|   \\___/ |_| \\___|    |_| \\___/  \\_/\\_/  \\___||_| 
______________________________________________________________________________________________
`);

update();

try {
  await searchJSCommand('module/commands/include', !1, (module) => {
    client.commands.set(module.command.name, module);
    if (module.middleware) middlewares.push(module.middleware);
  });

  // schedule('6 1 * * *', () => {
  //   run();
  // });
  run()

  client.once('ready', () => {
    console.log('\r');
    ready(client);
    console.log('\r\r');
  });

  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;
    var option = '';
    interaction.options.data.length === 0
      ? (option = 'Aucune option à était passé')
      : interaction.options.data.forEach((opt) => {
          option += `\n - ${opt.name} = ${opt.value}`;
        });

    logs('info', interaction, option, !0);

    try {
      await command.execute(interaction);
    } catch (error) {
      await interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      });
    }
  });

  // TODO: Add Logs each commands
  client.on('messageCreate', async (message) => {
    middlewares.forEach((middleware) => {
      middleware(message);
    });
  });

  Members.join(client);
  Members.exit(client);

  client.login(env.TOKEN);
} catch (err) {
  console.log('Not found file in commands/include !');
  console.error(err);
}
