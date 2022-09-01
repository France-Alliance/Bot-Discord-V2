import { exec, spawn } from 'node:child_process';

let scrapperState;

const run = () => {
  exec('py ./src/dist/scrapper/main.py', (err, stdout, stderr) => {
    if (err) {
      console.log(`error: ${err.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    if (stdout) {
      console.log(`stdout: ${stdout}`);
    }
  });
};

export default run;
export { scrapperState };
