const { readdirSync } = require('node:fs');
const { env } = require('node:process');

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');

const dotenv = require('dotenv');

dotenv.config();

const commands = [];
const commandFiles = readdirSync('./src/module/commands/include').filter(file =>
  file.endsWith('.js')
);

for (const file of commandFiles) {
  const command = require(`../module/commands/include/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(env.TOKEN);

rest
  .put(
    Routes.applicationGuildCommands(env.CLIENT, env.GUILD),
    { body: commands }
  )
  .then(() => console.log('Successfully registered application commands.'))
  .catch((err) => console.error(err));
