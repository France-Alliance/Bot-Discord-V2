const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('infos')
    .setDescription('Replies multiple infos on you and your context !'),
  async execute(interaction) {
    return interaction.reply(
      `Your username: ${interaction.user.username}\nChannel name: ${interaction.channel.name}\nServer name: ${interaction.guild.name} (with ${interaction.guild.memberCount} total members)`
    );
  },
};
