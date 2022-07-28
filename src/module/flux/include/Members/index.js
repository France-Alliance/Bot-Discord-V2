import dayjs from 'dayjs';

const MemberExit = (client) => {
    client.on('guildMemberRemove', (member) => {
      member.guild.channels.cache
        .find((channel) => channel.name === '➡-entry')
        .send(
          `We have lost ${member} | ${member.user.username}#${
            member.user.discriminator
          }... @ [${dayjs().format(
            'HH:mm:ss [-] DD/MM/YYYY'
          )}]\r<@&938558988126126120>`
        );
    });
  },
  MemberJoin = (client) => {
    client.on('guildMemberAdd', (member) => {
      member.guild.channels.cache
        .find((channel) => channel.name === '➡-entry')
        .send(
          `Welcome to ${member}| ${member.user.username}#${
            member.user.discriminator
          }... @ [${dayjs().format(
            'HH:mm:ss [-] DD/MM/YYYY'
          )}]\r<@&938558988126126120>`
        );
    });
  };

export default { join: MemberJoin, exit: MemberExit };
