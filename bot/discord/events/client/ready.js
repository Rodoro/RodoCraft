const { ActivityType } = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`Старт ${client.user.tag}`);


        let guilds = client.guilds.cache.size;
        let members = client.guilds.cache.map((guild) => guild.memberCount).reduce((a, c) => a + c);

        const option = {
            type: ActivityType.Watching,
            text: `за ${guilds} сервером и ${members} участников`,
            status: "online",
        }

        client.user.setPresence({
            activities: [{
                name: option.text,
                type: option.type,
            }],
            status: option.status
        });

    }
}