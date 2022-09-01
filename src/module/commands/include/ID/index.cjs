const { SlashCommandBuilder } = require('@discordjs/builders'),
  command = new SlashCommandBuilder()
    .setName('id')
    .setDescription('Replies with Discord ID, your ID is default tag')
    .addUserOption((opt) => opt.setName('tag').setDescription('The user tag'))
    .toJSON(),
  execute = async (interaction) => {
    const user = interaction.options.getUser('tag');
    return user
      ? interaction.reply(`${user.username} id: ${user.id}`)
      : interaction.reply(
          `${interaction.user.username} id: ${interaction.user.id}`,
        );
  };

module.exports = { command, execute };
