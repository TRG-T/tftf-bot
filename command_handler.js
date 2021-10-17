const { Collection } = require(`discord.js`)
const { readdirSync } = require('fs');
const { prefix } = require('./config.json');
const table = require("cli-table3")

const commandsTable = new table({
    head: ['command', 'found?'],
    colWidths: [15, 8]
});

module.exports = client => {
    client.command = new Collection()
    const commandFiles = readdirSync(__dirname + `/commands`).filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
        const command = require(__dirname + `/commands/${file}`)
        if (command.name) {
            client.command.set(command.name, command)
            commandsTable.push([file, `✅`])
        } else {
            commandsTable.push([file, `❌ -> missing name!`])
            continue
        }
    }
    console.log(commandsTable.toString())

    client.on('messageCreate', message => {
    	const { author, guild, content } = message;
        const args = content
            .toLowerCase()
            .slice(prefix.length)
            .trim()
            .replace(/,/g, '')
            .split(' ')

        const cmd = args[0];
        const furtherArgs = args.splice(2).toString().replace(/[^a-zA-Z ]/g, " ")
        console.log(author.tag, guild.name, args)

    	if (!guild || author.bot || !content.startsWith(prefix) || !client.command.has(cmd)) {
    		return
    	} else if (message.client.id === "437682160862887947") {
            message.reply("You're not supposed to do this command")
            return
        }

        try {
            client.command.get(cmd).execute(message, args, furtherArgs, client)
        } catch (error) {
            console.log(error)
            message.reply(`I could not execute the ${cmd} command <:Sadge:869242274813468763>`);
        }
    });
}
