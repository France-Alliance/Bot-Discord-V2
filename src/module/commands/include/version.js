const { SlashCommandBuilder } = require('@discordjs/builders');
const { version } = require('discord.js');
const { env } = require('node:process');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('version')
    .setDescription('Replies with bot and DiscordJs version'),
  async execute(interaction) {
    return interaction.reply(
      `Discord.js : v${version}\nBot : v${env.VERSION}`
    );
  },
};
