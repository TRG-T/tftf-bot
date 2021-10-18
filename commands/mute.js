const { MessageEmbed } = require('discord.js');


module.exports = (client) = {
    name : `mute`,
    description : `Mute a person`,

    execute(message, args, furtherArgs) {
        const { guild, author } = message;
        const user = message.mentions.users.first();
        const muteReply = new MessageEmbed()
            .setColor(`#ffffff`)
            .setThumbnail(user.avatarURL())
            .setTitle(`Muted`)
            .setDescription(`${user.username} muted \n reason: ${furtherArgs}`)
            .setFooter(author.tag, author.displayAvatarURL())

        const muteRole = guild.roles.cache.find(role => role.name === "Muted")
        const muteUser = user => {
            if (user) {
                const member = guild.members.cache.get(user.id);
                if (member) {
                    member.roles.add([`${muteRole.id}`])
                    message.reply({ embeds: [muteReply] })

                    guild.channels.cache.forEach( channel => {
                        channel.permissionOverwrites.create(muteRole, {
                            SEND_MESSAGES: false
                          })
                            // .then(channel => console.log(channel.permissionOverwrites.cache.get(muteRole.id)))
                            .catch(console.error)
                    })
                }
            }
        }

        if (muteRole === undefined) {
            guild.roles.create({
                name: "Muted",
                color: "BLUE",
                reason: `You need "Muted" role for this bot to work`
            })
                .catch(console.error)

            message.reply({ content: `I created a "Muted" role, use this command one more time to mute a user` })
        } else {
            muteUser(user)
        }
    }
}
