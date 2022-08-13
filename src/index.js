import { env } from 'node:process';
import { readdirSync, existsSync, writeFile, mkdir, writeFileSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'url';
import { Client, Collection, GatewayIntentBits, IntentsBitField } from 'discord.js';
import dotenv from 'dotenv';
import Members from './module/flux/include/Members/index.js';
import update from './utils/update.js';
import { searchJSCommand } from './utils/utils.js';
import { art, info, activity } from './module/functions/Presentation.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();

const Intents = new IntentsBitField(3276799);
//3276799
//[GatewayIntentBits.Guilds]
const client = new Client({ intents: Intents });

client.commands = new Collection();

art();

update()

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

  client.on('messageCreate', async (message) => {
    if (message.content == "stop" && message.author.id == "145525624939741184" || message.content == "stop" && message.author.id == "331778741917319168") {
      await message.reply(":robot: :zzz:");
      console.log("🤖 💤");
      process.exit(0);
    }

    

    var GUILD = message.guildId;
    var AUTHOR = message.author.id; 
    var TIMESTAMP = message.createdTimestamp;
    
    var dirPath = join(__dirname, `/data/lm`);
    var filePath = join(dirPath, `/${GUILD}.json`);

    if (existsSync(dirPath)) {
      //console.log("Directory exists !");
    } else {
      //console.log("Directory not found.");
      mkdir(dirPath, function (err) {
        if (err) throw err;
        //console.log("Directory is created.");
      });
    }

    if (existsSync(filePath)) {
      //console.log(`${GUILD}.json exist`);
    } else {
      //console.log(`${GUILD}.json don't exist`);
      writeFile(filePath, "{}", function (err) {
        if (err) throw err;
        //console.log("File is created successfully.");
      });
    }

    const data = JSON.parse(readFileSync(filePath));
    data[AUTHOR] = `${Number(TIMESTAMP)}`;
    writeFileSync(
      filePath,
      JSON.stringify(data, null, 4)
    );

  })

  Members.join(client);
  Members.exit(client);

  client.login(env.TOKEN);
} catch (err) {
  console.log('Not found file in commands/include !');
  console.error(err);
}
