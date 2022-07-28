require('dotenv').config();
const { SlashCommandBuilder } = require('@discordjs/builders'),
  { version } = require('discord.js'),
  { env } = require('node:process'),
  command = new SlashCommandBuilder()
    .setName('version')
    .setDescription('Replies with bot and DiscordJs version')
    .toJSON(),
  execute = async (interaction) =>
    interaction.reply(
      `Discord.js : v${version}\nBot : v${env.VERSION.replaceAll('"', '')}`
    );

module.exports = { command, execute };
