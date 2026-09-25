const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

const {
    getConfig
} = require("../database/database");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("configuracao")
        .setDescription("Abre o painel de configuração."),

    async execute(interaction) {

        if (
            !interaction.member.permissions.has("Administrator")
        ) {

            return interaction.reply({
                content:
                    "❌ Você precisa ser administrador para acessar este painel.",
                ephemeral: true
            });

        }

        getConfig(interaction.guild.id);

        const embed = new EmbedBuilder()

            .setTitle("⚙️ FiveM Manager")
            .setDescription(
                "### Painel de Configuração\n\n" +

                "Configure o bot diretamente pelo Discord.\n\n" +

                "🎫 **Tickets**\n" +
                "Configure categorias e permissões.\n\n" +

                "📝 **Registro**\n" +
                "Configure o sistema de registros.\n\n" +

                "🌾 **Farm**\n" +
                "Configure o sistema de farm.\n\n" +

                "👥 **Membros**\n" +
                "Configure o gerenciamento de membros.\n\n" +

                "🔐 **Permissões**\n" +
                "Defina quais cargos podem utilizar cada sistema.\n\n" +

                "📢 **Canais**\n" +
                "Defina os canais utilizados pelo bot."
            )

            .setFooter({
                text: "FiveM Manager • Sistema Administrativo"
            })

            .setTimestamp();

        const row1 = new ActionRowBuilder()
            .addComponents(

                new ButtonBuilder()
                    .setCustomId("config_tickets")
                    .setLabel("Tickets")
                    .setEmoji("🎫")
                    .setStyle(ButtonStyle.Primary),

                new ButtonBuilder()
                    .setCustomId("config_registro")
                    .setLabel("Registro")
                    .setEmoji("📝")
                    .setStyle(ButtonStyle.Secondary),

                new ButtonBuilder()
                    .setCustomId("config_farm")
                    .setLabel("Farm")
                    .setEmoji("🌾")
                    .setStyle(ButtonStyle.Success),

                new ButtonBuilder()
                    .setCustomId("config_membros")
                    .setLabel("Membros")
                    .setEmoji("👥")
                    .setStyle(ButtonStyle.Secondary)

            );

        const row2 = new ActionRowBuilder()
            .addComponents(

                new ButtonBuilder()
                    .setCustomId("config_permissoes")
                    .setLabel("Permissões")
                    .setEmoji("🔐")
                    .setStyle(ButtonStyle.Danger),

                new ButtonBuilder()
                    .setCustomId("config_canais")
                    .setLabel("Canais")
                    .setEmoji("📢")
                    .setStyle(ButtonStyle.Primary),

                new ButtonBuilder()
                    .setCustomId("config_status")
                    .setLabel("Status")
                    .setEmoji("📊")
                    .setStyle(ButtonStyle.Secondary)

            );

        await interaction.reply({

            embeds: [embed],

            components: [
                row1,
                row2
            ],

            ephemeral: true

        });

    }

};