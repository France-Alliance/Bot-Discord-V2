const { SlashCommandBuilder } = require('@discordjs/builders'),
  { logs } = require('../../../../utils/logs.cjs'),
  { readFile, readFileSync, existsSync, writeFile } = require('node:fs'),
  command = new SlashCommandBuilder()
    .setName('last_message')
    .setDescription(
      "Replies with the date of a Discord user's last message, you by default",
    )
    .addUserOption((opt) => opt.setName('tag').setDescription('The user tag'))
    .toJSON(),
  execute = async (interaction) => {
    readFile(
      `./src/data/LAST_MESSAGE/${interaction.guildId}.json`,
      (err, data) => {
        if (err) {
          if (err.message.includes('no such file or directory'))
            return interaction.reply(
              `${interaction.user.username} never talked`,
              {
                ephemeral: !0,
              },
            );
          logs('error', interaction, err, !0);
          return;
        }

        var data = JSON.parse(data),
          user = interaction.options.getUser('tag');

        return user
          ? user in data
            ? interaction.reply(
                `${user.username} last message: ${new Date(
                  data[user],
                ).toLocaleString()}`,
                { ephemeral: !0 },
              )
            : interaction.reply(`${interaction.user.username} never talked`, {
                ephemeral: !0,
              })
          : interaction.reply(
              `${interaction.user.username} last message: ${new Date(
                data[interaction.user.id],
              ).toLocaleString()}`,
              { ephemeral: !0 },
            );
      },
    );
  },
  middleware = async (message) => {
    if (message.author.bot || message.channel.type === 'dm') return;
    var pathFile = `./src/data/LAST_MESSAGE/${message.guild.id}.json`;
    if (existsSync(pathFile)) {
      var data = JSON.parse(readFileSync(pathFile));
      data[message.author.id] = message.createdTimestamp;
      writeFile(pathFile, JSON.stringify(data), (err) => {
        if (err) throw err;
      });
    }
  };

module.exports = { command, execute, middleware };
