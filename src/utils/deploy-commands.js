import { env } from 'node:process';

import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import { config } from 'dotenv';

import { searchJSCommand } from './utils.js';
import { mkdir } from 'node:fs';

config();

const getCommand = async () => {
  var commands = await searchJSCommand('module/commands/include', !0);
  commands.forEach((c, idx) => {
    commands[idx] = c.command;
    mkdir(
      './src/logs/' + c.command.name.toUpperCase(),
      { recursive: !0 },
      (err) => {
        if (err) throw err;
      },
    );
  });
  return commands;
};

const rest = new REST({ version: '10' }).setToken(env.TOKEN);

rest
  .put(Routes.applicationGuildCommands(env.CLIENT, env.GUILD), {
    body: await getCommand(),
  })
  .then(() => console.log('Successfully registered application commands.'))
  .catch((err) => console.error(err));
