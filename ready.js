const {
    Events,
    REST,
    Routes
} = require("discord.js");

module.exports = {

    name: Events.ClientReady,

    once: true,

    async execute(client) {

        console.log(
            `✅ Bot conectado como ${client.user.tag}`
        );

        const commands = [
            ...client.commands.values()
        ].map(command =>
            command.data.toJSON()
        );

        const rest = new REST({
            version: "10"
        }).setToken(
            process.env.DISCORD_TOKEN
        );

        try {

            await rest.put(

                Routes.applicationGuildCommands(
                    process.env.CLIENT_ID,
                    process.env.GUILD_ID
                ),

                {
                    body: commands
                }

            );

            console.log(
                `✅ ${commands.length} comandos registrados.`
            );

        } catch (error) {

            console.error(
                "Erro ao registrar comandos:",
                error
            );

        }

    }

};