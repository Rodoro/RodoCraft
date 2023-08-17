const { token, guildId } = require('./../../public/json/bot.json');


module.exports = {
    botStart: function () {
        const { Client, Collection } = require('discord.js');
        const fs = require('fs');
        const client = new Client({ intents: 131071 });


        client.commands = new Collection();
        client.buttons = new Collection();
        client.selectMenus = new Collection();
        client.modals = new Collection();
        client.commandArray = [];


        const functionFolders = fs.readdirSync(`./bot/discord/functions`);
        for (const folder of functionFolders) {
            const functionFiles = fs
                .readdirSync(`./bot/discord/functions/${folder}`)
                .filter(file => file.endsWith('.js'));
            for (const file of functionFiles)
                require(`./functions/${folder}/${file}`)(client);
        }


        client.handleEvents();
        client.handleCommands();
        client.handleComponents();


        client.login(token);
    },
    addRole: function (roleId, userId) {
        const { Client } = require('discord.js');
        const client = new Client({ intents: 131071 });

        client.login(token)
            .then(async() => {
                 const guild = await client.guilds.cache.get(guildId);
                const member = await guild.members.fetch(userId);
                const role = await guild.roles.cache.get(roleId);

                await member.roles.add(roleId);
                client.destroy;
            })

    }
}