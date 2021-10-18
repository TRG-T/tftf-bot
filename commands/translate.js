const { latin, galactic } = require("./../utils/alphabets.js")
const { MessageActionRow, MessageButton } = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("translate")
        .setDescription("translate"),

    async execute(client, interaction) {
        let translatedText = [];
        const translateLetter = (letter, method) => (
            method === "togalactic" 
            ? galactic[latin.indexOf(letter)] 
            : latin[galactic.indexOf(letter)]
        )

        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId("to-galactic")
                .setEmoji('✨')
                .setLabel("To galactic")
                .setStyle("PRIMARY"),
            new MessageButton()
                .setCustomId("to-latin")
                .setEmoji('✨')
                .setLabel("To latin")
                .setStyle("PRIMARY")
        )

        interaction.reply({
            content: " in which side?",
            components: [row],
            ephemeral: true,
        })


        // if (args[1] === "togalactic") {
        //     for(let i=0; i<=furtherArgs.length-1; i++) {
        //         furtherArgs[i].search(/[a-zA-Z]/g) === 0
        //         ? translatedText.push(translateLetter(furtherArgs[i], "togalactic"))
        //         : translatedText.push(furtherArgs[i])
        //     }
        // } else {
        //     for(let i=0; i<=furtherArgs.length-1; i++) {
        //         furtherArgs[i].search(/[a-zA-Z,!?]/g) === 0
        //         ? translatedText.push(translateLetter(furtherArgs[i], "toalphabet"))
        //         : translatedText.push(" ") 
        //     }
        // }
        // message.reply(translatedText.join(""))

    }
}