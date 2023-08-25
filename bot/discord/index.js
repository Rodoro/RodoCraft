const { token, guildId } = require('./../../private/json/discordBot.json');
var client;


module.exports = {
    botStart: function () {
        const { Client, Collection } = require('discord.js');
        const fs = require('fs');
         client = new Client({ intents: 131071 });


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
    addRole: async function (roleId, userId) {
        const guild = await client.guilds.cache.get(guildId);
        const member = await guild.members.fetch(userId);

        await member.roles.add(roleId);
    }
}