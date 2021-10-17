const { MessageEmbed } = require("discord.js");

module.exports = {
    name: `ban`,
    description: `ban a user`,

    execute(message, args, furtherArgs) {
        const user = message.mentions.users.first();
        const banReply = new MessageEmbed()
            .setColor(`#ffffff`)
            .setThumbnail(user.avatarURL())
            .setTitle(`Banned`)
            .setDescription(`${user.username} banned for 7 days \n reason: ${furtherArgs}`)
            .setFooter(message.author.tag, message.author.displayAvatarURL());

        if (user) {
            const member = guild.members.cache.get(user.id);
            if (member) {
                member
                    .ban({ days: 7, reason: `${furtherArgs}` })
                    .then(message.reply(banReply))
                    .catch(console.error);
            }
        }
    },
};
