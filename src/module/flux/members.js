const MemberExit = (client) => {
  client.on('guildMemberRemove', (member) => {
    member.guild.channels.cache
      .find((channel) => channel.name === '➡-entry')
      .send(
        `We have lost ${member} | ${member.user.username}#${
          member.user.discriminator
        }... @ [${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()} - ${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}]\r<@&938558988126126120>`
      );
  });
};

const MemberJoin = (client) => {
  client.on('guildMemberAdd', (member) => {
    member.guild.channels.cache
      .find((channel) => channel.name === '➡-entry')
      .send(
        `Welcome to ${member}| ${member.user.username}#${
          member.user.discriminator
        }... @ [${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()} - ${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}]\r<@&938558988126126120>`
      );
  });
};

module.exports.members = { join: MemberJoin, exit: MemberExit };