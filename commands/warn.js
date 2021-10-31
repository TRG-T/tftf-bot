const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require("@discordjs/builders");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

module.exports = client = {
    data: new SlashCommandBuilder()
        .setName("warn")
        .setDescription("warn an user")
        .addUserOption(option => option.setName('user').setDescription('User to warn'))
        .addStringOption(option => option.setName('reason').setDescription('Reason')),

    async execute(client, interaction) {
        const mention = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');
        const warnReply = new MessageEmbed()
            .setColor(`#ffffff`)
            .setThumbnail(user.avatarURL())
            .setTitle(`Warned`)
            .setDescription(`${user.username} warned \n reason: ${reason}`)
            .setFooter(interaction.user.tag, interaction.user.displayAvatarURL())

        interaction.reply({ 
            embeds: [warnReply], 
        })

        const user = await prisma.users.findFirst({
            where: { serverId: BigInt(interaction.guildId), userId: BigInt(mention.id) }
        })
        await prisma.users.update({
            where: { id: user.id },
            data: { warns: user.warns += 1 },
        })
    },
}
