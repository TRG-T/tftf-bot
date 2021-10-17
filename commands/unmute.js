const { MessageEmbed } = require('discord.js');

module.exports = (client) = {
    name : `unmute`,
    description : `Unmute a person`,

    execute(message) {
        const { guild, author, mentions } = message;
        const user = mentions.users.first();
        const muteReply = new MessageEmbed()
            .setColor(`#ffffff`)
            .setThumbnail(user.avatarURL())
            .setTitle(`Unmuted`)
            .setDescription(`${user.username} unmuted `)
            .setFooter(author.tag, author.displayAvatarURL())
    
        const muteRole = guild.roles.cache.find(role => role.name === "Muted")
        if (user) {
            const member = guild.members.cache.get(user.id);
            if (member) {
                member.roles.remove([`${muteRole.id}`])
                message.reply({ embeds: [muteReply] })
            }
        }
    }
}
