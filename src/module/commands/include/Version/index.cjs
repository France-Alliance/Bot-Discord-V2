const { SlashCommandBuilder } = require('@discordjs/builders');
const { version } = require('discord.js');
const { env } = require('node:process');
require('dotenv').config();

const command = new SlashCommandBuilder()
    .setName('version')
    .setDescription('Replies with bot and DiscordJs version')
    .toJSON(),
  execute = async (interaction) =>
    interaction.reply(`Discord.js : v${version}\nBot : v${env.VERSION}`);

module.exports = { command, execute };
