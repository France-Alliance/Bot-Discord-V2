const { SlashCommandBuilder } = require('@discordjs/builders'),
  command = new SlashCommandBuilder()
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

/* const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Pong ?'),
	async execute(interaction) {
		const m = await interaction.reply({ content: "Pong!", fetchReply: true });
        await interaction.followUp({ content: `Pong!\nPour de vrai, la latence est de ${m.createdTimestamp - interaction.createdTimestamp}ms` });

	},
}; */
