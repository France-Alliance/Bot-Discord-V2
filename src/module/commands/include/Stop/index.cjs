const { SlashCommandBuilder } = require('@discordjs/builders'),
  { PermissionFlagsBits } = require('discord.js'),
  command = new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stop the bot')
    .setDefaultMemberPermissions(
      PermissionFlagsBits.Administrator |
        PermissionFlagsBits.BanMembers |
        PermissionFlagsBits.KickMembers |
        PermissionFlagsBits.ManageChannels,
    )
    .toJSON(),
  execute = async (interaction) => {
    console.log('🤖 💤');
    setTimeout(() => {
      process.exit(0);
    }, 5000);
    return interaction.reply(':robot: :zzz:');
  };

module.exports = { command, execute };
