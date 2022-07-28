import { readdirSync } from 'node:fs';
import { env } from 'node:process';

import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';

import { config } from 'dotenv';

config();

const getCommand = async () => {
  const commands = [];
  const commandFoler = readdirSync('./src/module/commands/include');

  for (const commandFiles of commandFoler) {
    await import(`../module/commands/include/${commandFiles}/index.cjs`)
      .then((module) => {
        console.log(module.command);
        commands.push(module.command);
      })
      .catch((err) => console.error(err));
  }
  return commands;
};

const rest = new REST({ version: '10' }).setToken(env.TOKEN);

rest
  .put(Routes.applicationGuildCommands(env.CLIENT, env.GUILD), {
    body: await getCommand(),
  })
  .then(() => console.log('Successfully registered application commands.'))
  .catch((err) => console.error(err));
