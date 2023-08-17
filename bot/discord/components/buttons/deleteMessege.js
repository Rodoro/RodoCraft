module.exports = {
    data: { 
        name: 'deleteMessage'
    },
    async execute(interaction) {

        await interaction.message.delete();
    }
}