module.exports = {
    name : `voiceunmute`,
    description : `voice unmute a user`,

    execute(message, args, furtherArgs) {
        const user = message.mentions.users.first();
        if (user) {
            const member = guild.members.cache.get(user.id);
            if (member) {
                member.voice.setMute(false);
                message.reply("Voice unmuted")
            }
        }
    }
};