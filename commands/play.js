const { MessageEmbed } = require('discord.js')
const { Player, Queue } = require("discord-player");

module.exports = client = {
    name: `play`,
    description: `Play music from youtube`,

    execute(message, furtherArgs) {

        const player = new Player(client);
        player.on("trackStart", (message, track) => {
            const playReply = new MessageEmbed()
            .setColor(`#ffffff`)
            .setThumbnail('https://i.imgur.com/aatOWNE.jpg')
            .setTitle(`Now Playing`)
            .setDescription(`${track.title}`)
            .setFooter(`Added by ${message.author.tag}`, message.author.displayAvatarURL())

            message.channel.send(playReply)
            // player._createQueue(message, track)
            // player._addTrackToQueue(message, track)
        })
        player.play(message, furtherArgs, true);
    }
}
