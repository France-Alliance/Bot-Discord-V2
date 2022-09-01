const join = require("node:path").join;
const readFileSync = require("node:fs").readFileSync;
const { SlashCommandBuilder } = require("@discordjs/builders");

const DISCORD_EPOCH = 1420070400000; // Discord start it's timestamp format (snowflakes) @ January 1st, 2016
function snowflakeToDate(snowflake) {
  // https://discordapp.com/developers/docs/reference#snowflakes
  return (Number(snowflake) + Number(DISCORD_EPOCH));
}

(command = new SlashCommandBuilder()
  .setName("last_message")
  .setDescription(
    "Replies with the date of a Discord user's last message, you by default"
  )
  .addUserOption((opt) => opt.setName("tag").setDescription("The user tag"))
  .toJSON()),
  (execute = async (interaction) => {
    try {

      // If no argument is submitted, we submit the author of the message as the argument
      var user = interaction.options.getUser("tag");
      if (user == null) {
        var user = interaction.user.id;
      } else {
        var user = user.id;
      }

      var dirPath = join(__dirname, `../../../../data/lm`); // Location of the dabases directory
      var filePath = join(dirPath, `/${interaction.guildId}.json`); // Location of the database file

      // Compare wanted ID with IDs int the database. If it finds a match, it reply to the discord message with the human formatted time
      const data = JSON.parse(readFileSync(filePath));
      if (user in data) {
          await interaction.reply({
            content: `<@${user}> : ${new Date(Number(data[user])).toLocaleString()}`,
            ephemeral: true,
          });
      } else {
        interaction.reply({
          content: `<@${user}> never talked while I was online since it's not in my database`,
          ephemeral: true,
        });
      }

    } catch (error) {
      console.log(error);
    }
  });

module.exports = { command, execute };
