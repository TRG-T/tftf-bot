const { Client } = require(`discord.js`);
const { PrismaClient } = require('@prisma/client');
const commandHandler = require(`./command_handler.js`);
const chalk = require("chalk");
require("dotenv").config();

const prisma = new PrismaClient()
const client = new Client({
    intents: ["GUILDS", "GUILD_MESSAGES"],
    allowedMentions: { parse: ["users", "roles"], repliedUser: true },
});
commandHandler(client);

client.once("ready", () => {
    client.user.setActivity("!info", { type: "PLAYING" });
    console.log(chalk.green(`${client.user.tag} working!`));

    console.log("I belong to:");
    client.guilds.cache.forEach(async(guild) => {
        console.log(`${chalk.blue(guild.name)} | ${chalk.green(guild.id)}`);
        // await prisma.servers.create({
        //     data: {
        //         id: Number(guild.id),
        //         name: guild.name,  
        //     },
        // })
    });
});

const main = async () => {
    const allServers = await prisma.servers.findMany({
        select: { name: true }
    })
    console.log(allServers)
}

main()
  .catch((e) => {
    throw e
})
  .finally(async () => {
    await prisma.$disconnect()
})

client.login(process.env.D_TOKEN);
