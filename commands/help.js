const Discord = require('discord.js');
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("All available commands"),
    
    async execute(client, interaction) {
        const info = new Discord.MessageEmbed()
            .setColor("#ffffff")
            .setAuthor("TFTF BOT", "https://i.imgur.com/J4O9NsF.jpg", "https://github.com/TARGEToff/tftf-bot")
            .setThumbnail("https://i.imgur.com/J4O9NsF.jpg")
            .setTitle("All commands")
            .addFields(
                { name: "!info", value: "Bot information"},
                { name: "!mute [user] [time]", value: "Mute a user"},
                { name: "!unmute [user]", value: "Unmute a user"},
                { name: "!translate [text]", value: "translate to galactic and vice versa"})
        interaction.reply({ 
                embeds: [info], 
                ephemeral: true 
        })
    }
};
