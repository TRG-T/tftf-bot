const { latin, galactic } = require("./../utils/alphabets.js")
const { MessageActionRow, MessageButton } = require("discord.js")

module.exports = (client) = {
    name : `translate`,
    description : `translate latin alphabet to galactic`,

    execute(message, args, furtherArgs) {
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

        message.reply({
            content: "which side?",
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