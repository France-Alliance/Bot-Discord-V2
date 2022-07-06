const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('id')
    .setDescription('Replies with Discord ID, your ID is default tag')
    .addUserOption((opt) => opt.setName('tag').setDescription('The user tag')),
  async execute(interaction) {
    const user = interaction.options.getUser('tag');
    if (user) return interaction.reply(`${user.username} id: ${user.id}`);
    return interaction.reply(
      `${interaction.user.username} id: ${interaction.user.id}`
    );
  },
};
