const { latin, galactic } = require("./../utils/alphabets.js")
const { MessageActionRow, MessageButton, ButtonInteraction } = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("translate")
        .setDescription("translate to galactic and vice versa")
        .addStringOption(option => option.setName('text').setDescription('Text to translate')),
    
    async execute(client, interaction) {
        let translatedText = [];
        const text = interaction.options.getString('text');
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

        const collector = interaction.channel.createMessageComponentCollector({ componentType: 'BUTTON' });
        collector.on('collect', async button => {
            text.split("")
            if(button.customId === "to-galactic") {
                for(let i=0; i<=text.length-1; i++) {
                    text[i].search(/[a-zA-Z]/g) === 0
                    ? translatedText.push(translateLetter(text[i], "togalactic"))
                    : translatedText.push(text[i])
                }
                interaction.followUp({ content: translatedText.join("") })
            } else {
                for(let i=0; i<=text.length-1; i++) {
                    text[i].search(/[a-zA-Z]/g) === 0
                    ? translatedText.push(translateLetter(text[i], "toalphabet"))
                    : translatedText.push(" ") 
                }
                interaction.followUp({ content: translatedText.join("") })
            }
        })
    }
}