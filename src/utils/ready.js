import chalk from 'chalk';
import { hours, minutes, secondes } from './time.js';

const ready = (client) => {
  client.user.setActivity(
    `${client.guilds.cache.size} servers | type "/" to see the commands | Dev`,
    {
      type: 'WATCHING',
    },
  );

  console.log(
    chalk.green(
      `----------------------------------------------------------------------------------------------`,
    ),
  );
  console.log(
    `Bot is ready @ ${hours()}:${minutes()}:${secondes()}\nHe has started in ${
      client.guilds.cache.size
    } guilds, with ${client.users.cache.size} users in ${
      client.channels.cache.size
    } channels`,
  );
  console.log(
    chalk.green(
      `----------------------------------------------------------------------------------------------`,
    ),
  );
  console.log(
    chalk.green(
      `                                            COMMAND LOG                                           `,
    ),
  );
};

export default ready;
