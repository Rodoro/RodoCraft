const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token, clientId, guildId } = require('./../../../../private/json/discordBot.json');

module.exports = (client) => {
    client.handleCommands = async () => {
        const commandFolders = fs.readdirSync('./bot/discord/commands');
        for (const folder of commandFolders) {
            const commandFiles = fs
                .readdirSync(`./bot/discord/commands/${folder}`)
                .filter((file) => file.endsWith('.js'));

            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`)
                client.commands.set(command.data.name, command);
                client.commandArray.push(command.data.toJSON());
            }
        }

        const rest = new REST({ version: '10' }).setToken(token);
        try {
            await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: client.commandArray });
            console.log('Commands apdated private server')
        } catch (error) {
            console.error(error);
        }
    }
}