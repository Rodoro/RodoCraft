const { readdirSync } = require('fs');

module.exports = (client) => {
    client.handleComponents = async () => {
        const componentFolder = readdirSync(`./bot/discord/components`);
        for (const folder of componentFolder) {
            const componentFiles = readdirSync(`./bot/discord/components/${folder}`).filter(
                (file) => file.endsWith(".js")
            );

            switch (folder) {
                case 'buttons':
                    for (const file of componentFiles) {
                        const button = require(`../../components/${folder}/${file}`);
                        client.buttons.set(button.data.name, button);
                    }
                    break;

                case 'selectMenus':
                    for (const file of componentFiles) {
                        const menu = require(`../../components/${folder}/${file}`);
                        client.selectMenus.set(menu.data.name, menu);
                    }
                    break;

                case 'modals':
                    for (const file of componentFiles) {
                        const modal = require(`../../components/${folder}/${file}`);
                        client.modals.set(modal.data.name, modal);
                    }
                    break;
            
                default:
                    break;
            }

        }
    }
}