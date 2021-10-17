const { Client } = require(`discord.js`);
const commandHandler = require(`./command_handler.js`);
require("dotenv").config();

const client = new Client({
    intents: ["GUILDS", "GUILD_MESSAGES"],
    allowedMentions: { parse: ["users", "roles"], repliedUser: true },
});
commandHandler(client);

client.once("ready", () => {
    client.user.setActivity(`!info`, { type: "PLAYING" });
    console.log(`${client.user.tag} working!`);

    console.log(`I belong to:`);
    client.guilds.cache.forEach((guild) => {
        console.log(`${guild.name} | ${guild.id}`);
    });
});

client.login(process.env.D_TOKEN);
