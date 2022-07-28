const { SlashCommandBuilder } = require('@discordjs/builders');

const command = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with "Pong!" and latency !')
    .toJSON(),
  execute = async (interaction) =>
    interaction.reply(
      `For real, latency is ${
        (await interaction.channel.send('Pong !')).createdTimestamp -
        interaction.createdTimestamp
      }ms`
    );

module.exports = { command, execute };
