const { Client } = require(`discord.js`);
const { PrismaClient } = require('@prisma/client');
const commandHandler = require(`./command_handler.js`);
const chalk = require("chalk");
require("dotenv").config();

const prisma = new PrismaClient()
const client = new Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"],
    allowedMentions: { parse: ["users", "roles"], repliedUser: true },
});
commandHandler(client);

client.once("ready", () => {
    client.user.setActivity("/info", { type: "PLAYING" });
    console.log(chalk.green(`${client.user.tag} working!`));
});


client.on("guildCreate", async guild => {
    await prisma.servers.create({
        data: {
            id: BigInt(guild.id),
            name: guild.name,  
        },
    })
    guild.members.fetch()
        .then((result) => { 
            let guilds = result.map(guild => guild)
            guilds.forEach(async guildMember => {
                await prisma.users.create({
                    data: {
                        userId: BigInt(guildMember.user.id),
                        username: encodeURI(guildMember.user.username),  
                        tag: guildMember.user.discriminator,
                        isBot: guildMember.user.bot,
                        serverId: BigInt(guild.id)
                    },
                })
            })
        })
})    

client.on("guildDelete", async guild => {
    await prisma.users.deleteMany({
        where: { serverId: BigInt(guild.id) }
    })
    await prisma.servers.delete({
        where: { id: BigInt(guild.id) }
    })
})


client.on("guildMemberAdd", async member => {
    await prisma.users.create({
        data: {
            userId: BigInt(member.id),
            username: encodeURI(member.user.username),  
            tag: member.user.discriminator,
            isBot: member.user.bot,
            serverId: BigInt(member.guild.id)
        },
    })
})

client.on("guildMemberRemove", async member => {
    await prisma.users.deleteMany({
        where: { 
            serverId: BigInt(member.guild.id), 
            userId: BigInt(member.id)
        }
    })
})

const main = async () => {
}

main()
    .catch((e) => { throw e })
    .finally(async () => { await prisma.$disconnect() })

client.login(process.env.D_TOKEN);
