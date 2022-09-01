const { appendFile } = require('node:fs');

const logs = (type, interaction, message, file = !1) => {
  import('chalk').then(({ default: chalk }) => {
    console.log(
      chalk[type === 'error' ? 'red' : type === 'warn' ? 'yellow' : 'white'](
        `${interaction.commandName.toUpperCase()} à ${Date.now()} par ${
          interaction.user.username
        } ${message}\n`,
      ),
    );
  });
  if (file) logsFile(type, interaction, message);
};

const logsFile = (type, interaction, message) => {
  var module = interaction.commandName.toUpperCase();
  appendFile(
    `./src/logs/${module}/${type}.log`,
    `${interaction.user.username} à ${Date.now()} ${message}\n`,
    { encoding: 'utf8', flag: 'a+' },
    (err) => {
      if (err) throw err;
    },
  );
};

module.exports = { logs, logsFile };
