const { get } = require('node:https');
const { env } = require('node:process');
const { exec } = require('node:child_process');

const dotenv = require('dotenv');

dotenv.config();

const update = () => {
  var data;

  get(
    'https://raw.githubusercontent.com/France-Alliance/Bot-Discord/master/package.json', res => {
      res.on('data', chunk => {
        data = JSON.parse(chunk);
      }).on('end', () => {
        var packageUpdate = exec('npm outdated --json', (err, stdout, stderr) => JSON.parse(stdout));
        if (data.version !==  env.VERSION) {
          console.log(`[Update] - Version ${data.version} of the bot is available !`);
          console.log(`[Update] - Updateing...`);
          // execFile("git fetch --all")
          // execFile("git reset --hard origin/master")
          console.log(`[Update] - Update done !`);
        } else {
          console.log(`[Update] - You used the latest version of the bot !`);
        }

        if (packageUpdate.dependencies) {
          console.log(`[Update] - Some dependencies are not up to date !`);
          console.log(`[Update] - Updateing...`);
          exec('pnpm update');
          console.log(`[Update] - Update done !`);
        } else {
          console.log(`[Update] - All dependencies are up to date !`);
        }
      });
    }
  )
};

module.exports.update = update;
