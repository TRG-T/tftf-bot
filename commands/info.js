const Discord = require('discord.js');

module.exports = {
    name : `info`,
    description : `Information about bot`,

    execute(message, args, client) {
        const info = new Discord.MessageEmbed()
            .setColor(`#ffffff`)
            .setAuthor(`TFTF BOT`, `https://i.imgur.com/aatOWNE.jpg`, `https://github.com/TARGEToff/tftf-bot`)
            .setThumbnail('https://i.imgur.com/aatOWNE.jpg')
            .setTitle(`Bot info`)
            .addFields({ name: `Commands`, value: `!help`}, { name: `Github`, value: `[link](https://github.com/TARGEToff/tftf-bot)`})
        message.channel.send(info);
    }
};
