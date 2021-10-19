const { Collection } = require(`discord.js`)
const { readdirSync } = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const table = require("cli-table3")
require("dotenv").config();

const commandsTable = new table({
    head: ['command', 'found?'],
    colWidths: [15, 8]
});
const commands = [];

module.exports = client => {
    client.command = new Collection()
    const commandFiles = readdirSync(__dirname + `/commands`).filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        if (command.data) {
            commandsTable.push([file, `✅`])
            commands.push(command.data.toJSON());
            client.command.set(command.data.name, command)
        } else {
            commandsTable.push([file, `❌ -> missing name!`])
            continue
        }
    }
    console.log(commandsTable.toString())
    const rest = new REST({ version: '9' }).setToken(process.env.D_TOKEN);
    const clientId = "744645938982944798"
    const guildId = "868440999020613653";

    (async () => {
        try {
            console.log('Started refreshing application (/) commands.');
    
            await rest.put(
                Routes.applicationGuildCommands(clientId, guildId),
                { body: commands },
            );
    
            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    })();

    client.on('interactionCreate', interaction => {
        if(interaction.isCommand()) {
            const cmd = client.command.get(interaction.commandName)

            try {
                cmd.execute(client, interaction)
            } catch (error) {
                console.log(error)
                interaction.reply({ content: `I could not execute the ${cmd} command <:Sadge:869242274813468763>`, ephemeral: true });
            }
        }
    });
}
