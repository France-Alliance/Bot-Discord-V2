import { env } from 'node:process';
import {
  existsSync,
  writeFile,
  mkdir,
  writeFileSync,
  readFileSync,
} from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'url';
import { Client, Collection, IntentsBitField } from 'discord.js';
import dotenv from 'dotenv';
import Members from './module/flux/include/Members/index.js';
import update from './utils/update.js';
import { searchJSCommand } from './utils/utils.js';
import ready from './utils/ready.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();

const Intents = new IntentsBitField(3276799);
//3276799
//[GatewayIntentBits.Guilds]
const client = new Client({ intents: Intents });

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
  });

  client.once('ready', () => {
    console.log('\r');
    ready(client);
    console.log('\r\r');
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

  // TODO: Add Logs each commands
  // client.on('messageCreate', async (message) => {
  //   var GUILD = message.guildId;
  //   var AUTHOR = message.author.id;
  //   var TIMESTAMP = message.createdTimestamp;

  //   var dirPath = join(__dirname, `/data/lm`);
  //   var filePath = join(dirPath, `/${GUILD}.json`);

  //   if (existsSync(dirPath)) {
  //     //console.log("Directory exists !");
  //   } else {
  //     //console.log("Directory not found.");
  //     mkdir(dirPath, function (err) {
  //       if (err) throw err;
  //       //console.log("Directory is created.");
  //     });
  //   }

  //   if (existsSync(filePath)) {
  //     //console.log(`${GUILD}.json exist`);
  //   } else {
  //     //console.log(`${GUILD}.json don't exist`);
  //     writeFile(filePath, '{}', function (err) {
  //       if (err) throw err;
  //       //console.log("File is created successfully.");
  //     });
  //   }

  //   const data = JSON.parse(readFileSync(filePath));
  //   data[AUTHOR] = `${Number(TIMESTAMP)}`;
  //   writeFileSync(filePath, JSON.stringify(data, null, 4));
  // });

  Members.join(client);
  Members.exit(client);

  client.login(env.TOKEN);
} catch (err) {
  console.log('Not found file in commands/include !');
  console.error(err);
}
