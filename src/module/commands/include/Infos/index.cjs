const { SlashCommandBuilder } = require('@discordjs/builders');

const command = new SlashCommandBuilder()
    .setName('infos')
    .setDescription('Replies multiple infos on you and your context !')
    .toJSON(),
  execute = async (interaction) =>
    interaction.reply(
      `Your username: ${interaction.user.username}\nChannel name: ${interaction.channel.name}\nServer name: ${interaction.guild.name} (with ${interaction.guild.memberCount} total members)`
    );

module.exports = { command, execute };
