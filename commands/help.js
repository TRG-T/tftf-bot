const Discord = require('discord.js');

module.exports = {
    name : `help`,
    description : `All available commands`,

    execute(message, args, client) {
        const info = new Discord.MessageEmbed()
            .setColor(`#ffffff`)
            .setAuthor(`TFTF BOT`, `https://i.imgur.com/J4O9NsF.jpg`, `https://github.com/TARGEToff/tftf-bot`)
            .setThumbnail('https://i.imgur.com/J4O9NsF.jpg')
            .setTitle(`All commands`)
            .addFields(
                { name: `!info`, value: `Bot information`},
                { name: `!mute [user] [time]`, value: `Mute a user`},
                { name: `!unmute [user]`, value: `Unmute a user`},
                { name: `!play [title]`, value: `Play a song`})
        message.channel.send(info);
    }
};
