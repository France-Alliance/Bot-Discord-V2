const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong and latency !'),
  async execute(interaction) {
    return interaction.reply(
      `For real, latency is ${
        (await interaction.channel.send('Pong !')).createdTimestamp -
        interaction.createdTimestamp
      }ms`
    );
  },
};
