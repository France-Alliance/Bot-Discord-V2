import chalk from "chalk";
import {hours, minutes, secondes} from "./Time.js";
/*
  const clichannelsize = client.channels.cache.size;
  const cliusersize = client.users.cache.size;
  const cliguildsize = client.guilds.cache.size;
  const cliuser = client.user;
*/

export function art() {
  console.log(`
  _____               _                _         _______                         
 / ____|             | |              | |       |__   __|                        
| |      ___   _ __  | |_  _ __  ___  | |  ___     | |  ___ __      __ ___  _ __ 
| |     / _ \\ | '_ \\ | __|| '__|/ _ \\ | | / _ \\    | | / _ \\\\ \\ /\\ / // _ \\| '__|
| |____| (_) || | | || |_ | |  | (_) || ||  __/    | || (_) |\\ V  V /|  __/| |   
 \\_____|\\___/ |_| |_| \\__||_|   \\___/ |_| \\___|    |_| \\___/  \\_/\\_/  \\___||_| 
______________________________________________________________________________________________
`);
}

export function info(client) {
  
  console.log(
    chalk.green(
      `----------------------------------------------------------------------------------------------`
    )
  );
  console.log(
    `Bot is ready @ ${hours()}:${minutes()}:${secondes()}\nHe has started in ${client.guilds.cache.size} guilds, with ${client.users.cache.size} users in ${client.channels.cache.size} channels`
  );
  console.log(
    chalk.green(
      `----------------------------------------------------------------------------------------------`
    )
  );
  console.log(
    chalk.green(
      `                                            COMMAND LOG                                           `
    )
  );
}

export function activity(client){
  client.user.setActivity(
    `${client.guilds.cache.size} servers | type "/" to see the commands | Dev`,
    {
      type: "WATCHING",
    }
  );
}
