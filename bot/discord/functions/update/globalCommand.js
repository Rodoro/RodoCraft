const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token, clientId } = require('../../../../public/json/bot.json');

module.exports = (client) => {
    client.globalCommand = async () => {
        const commandFolders = fs.readdirSync('client/commands');
        for (const folder of commandFolders) {
            const commandFiles = fs
                .readdirSync(`client/commands/${folder}`)
                .filter((file) => file.endsWith('.js'));

            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`)
                client.commandArray.push(command.data.toJSON());
            }
        }

        const rest = new REST({ version: '10' }).setToken(token);
        try {
            await rest.put(Routes.applicationGuildCommands(clientId), { body: client.commandArray });
            console.log('[SC] Были обновлены на всех серверах')
        } catch (error) {
            console.error(error);
        }
    }
}