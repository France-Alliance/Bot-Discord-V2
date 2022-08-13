import { get } from "node:https";
import { env } from "node:process";
import { exec } from "node:child_process";

import { config } from "dotenv";

config();

const update = async () => {
  var data;

  get(
    "https://raw.githubusercontent.com/France-Alliance/Bot-Discord-V2/master/package.json",
    (res) => {
      res.on("data", async (chunk) => {
        data = JSON.parse(chunk);

        if (
          (data.version[0] !== env.VERSION[0] ||
            data.version[2] !== env.VERSION[2] ||
            data.version[4] !== env.VERSION[4]) &&
          env.DEV !== "1"
        ) {
          /* console.log(
            `[Update] - Version ${data.version} of the bot is available !`
          ); */

          /*console.log(`[Update] - Updating...`);*/
          execFile("git fetch --all -P");
          /*console.log(`[Update] - Update done !`);*/
        } else {
          /*console.log(`[Update] - You used the latest version of the bot !`);*/

        }

        const packageUpdate = exec("npm outdated --json", {
          encoding: "utf8",
        });
        packageUpdate.stdout.on("data", async (data) => {
          data = JSON.parse(data);

          if (data !== {}) {
            /*console.log(`[Update] - Some dependencies are not up to date !`);
            console.log(`[Update] - Updateing...`);*/
            exec("pnpm update");
            packageUpdate.on("exit", () => {
              /*console.log(`[Update] - Update done !`);*/
            });
          } else {
            /*console.log(`[Update] - All dependencies are up to date !`);*/
          }
        });
      });
    }
  );
};

export default update;
