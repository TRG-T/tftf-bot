module.exports = {
    name : `voicemute`,
    description : `voice mute a user`,

    execute(message, args, furtherArgs) {
        const user = message.mentions.users.first();
        if (user) {
            const member = guild.members.cache.get(user.id);
            if (member) {
                member.voice.setMute(true);
                message.reply("Voice muted")
            }
        }
    }
};
