const { InteractionType } = require('discord.js')

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);
            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({
                    content: 'Что-то пошло не так при выполнении этой команды... ',
                    ephemeral: true
                })
            }
        } else if (interaction.isButton()) {
            const button = client.buttons.get(interaction.customId);
            if (!button) return new Error('Для этой кнопки нету функции.');

            try {
                await button.execute(interaction, client);
            } catch (err) {
                console.error(err);
            }
        } else if (interaction.isSelectMenu()) {
            const menu = client.selectMenus.get(interaction.customId);
            if (!menu) return new Error('Для этого выподающего меню нету функции.');

            try {
                await menu.execute(interaction, client);
            } catch (err) {
                console.error(err);
            }
        } else if (interaction.type == InteractionType.ModalSubmit) {
            const modal = client.modals.get(interaction.customId);
            if (!modal) return new Error('Для этого модального окна нету функции.');

            try {
                await modal.execute(interaction, client);
            } catch (err) {
                console.error(err);
            }
        }  else if (interaction.isContextMenuCommand()) {
            const contextCommand = client.commands.get(interaction.commandName);
            if (!contextCommand) return new Error('Для этого приложения нету функции.');

            try {
                await contextCommand.execute(interaction, client);
            } catch (err) {
                console.error(err);
            }
        }
    }
}