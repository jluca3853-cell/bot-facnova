const {

    Events,

    ActionRowBuilder,

    ButtonBuilder,

    ButtonStyle,

    EmbedBuilder,

    ChannelSelectMenuBuilder,

    RoleSelectMenuBuilder,

    ChannelType

} = require("discord.js");

const {

    getConfig,

    updateConfig

} = require("../database/database");


module.exports = {

    name: Events.InteractionCreate,

    async execute(interaction) {


        /*
        ========================================
        COMANDOS SLASH
        ========================================
        */

        if (interaction.isChatInputCommand()) {

            const command =
                interaction.client.commands.get(
                    interaction.commandName
                );

            if (!command) return;

            try {

                await command.execute(
                    interaction
                );

            } catch (error) {

                console.error(error);

                if (
                    interaction.replied ||
                    interaction.deferred
                ) {

                    await interaction.followUp({
                        content:
                            "❌ Ocorreu um erro.",
                        ephemeral: true
                    });

                } else {

                    await interaction.reply({
                        content:
                            "❌ Ocorreu um erro.",
                        ephemeral: true
                    });

                }

            }

            return;
        }


        /*
        ========================================
        PAINEL DE CANAIS
        ========================================
        */

        if (
            interaction.isButton() &&
            interaction.customId === "config_canais"
        ) {

            const embed =
                new EmbedBuilder()

                    .setTitle("📢 Configuração de Canais")

                    .setDescription(
                        "Selecione abaixo os canais utilizados pelo bot."
                    );

            const logs =
                new ActionRowBuilder()
                    .addComponents(

                        new ChannelSelectMenuBuilder()

                            .setCustomId(
                                "select_log_channel"
                            )

                            .setPlaceholder(
                                "📋 Selecionar canal de logs"
                            )

                            .setChannelTypes(
                                ChannelType.GuildText
                            )

                    );


            const tickets =
                new ActionRowBuilder()
                    .addComponents(

                        new ChannelSelectMenuBuilder()

                            .setCustomId(
                                "select_ticket_panel"
                            )

                            .setPlaceholder(
                                "🎫 Selecionar painel de tickets"
                            )

                            .setChannelTypes(
                                ChannelType.GuildText
                            )

                    );


            const ticketCategory =
                new ActionRowBuilder()
                    .addComponents(

                        new ChannelSelectMenuBuilder()

                            .setCustomId(
                                "select_ticket_category"
                            )

                            .setPlaceholder(
                                "📁 Selecionar categoria de tickets"
                            )

                            .setChannelTypes(
                                ChannelType.GuildCategory
                            )

                    );


            const registro =
                new ActionRowBuilder()
                    .addComponents(

                        new ChannelSelectMenuBuilder()

                            .setCustomId(
                                "select_registration_channel"
                            )

                            .setPlaceholder(
                                "📝 Selecionar canal de registros"
                            )

                            .setChannelTypes(
                                ChannelType.GuildText
                            )

                    );


            const farm =
                new ActionRowBuilder()
                    .addComponents(

                        new ChannelSelectMenuBuilder()

                            .setCustomId(
                                "select_farm_channel"
                            )

                            .setPlaceholder(
                                "🌾 Selecionar canal de farm"
                            )

                            .setChannelTypes(
                                ChannelType.GuildText
                            )

                    );


            const salvar =
                new ActionRowBuilder()
                    .addComponents(

                        new ButtonBuilder()

                            .setCustomId(
                                "save_channel_config"
                            )

                            .setLabel(
                                "Salvar configurações"
                            )

                            .setEmoji("💾")

                            .setStyle(
                                ButtonStyle.Success
                            )

                    );


            await interaction.update({

                embeds: [embed],

                components: [
                    logs,
                    tickets,
                    ticketCategory,
                    registro,
                    farm,
                    salvar
                ]

            });

            return;
        }


        /*
        ========================================
        SELEÇÃO DE CANAIS
        ========================================
        */

        if (
            interaction.isChannelSelectMenu()
        ) {

            const channel =
                interaction.channels.first();

            if (!channel) return;


            const channelMap = {

                select_log_channel:
                    "log_channel_id",

                select_ticket_panel:
                    "ticket_panel_channel_id",

                select_ticket_category:
                    "ticket_category_id",

                select_registration_channel:
                    "registration_channel_id",

                select_farm_channel:
                    "farm_channel_id"

            };


            const field =
                channelMap[
                    interaction.customId
                ];


            if (!field) return;


            updateConfig(

                interaction.guild.id,

                field,

                channel.id

            );


            await interaction.reply({

                content:
                    `✅ Configurado: ${channel}`,

                ephemeral: true

            });

            return;
        }


        /*
        ========================================
        PAINEL DE PERMISSÕES
        ========================================
        */

        if (
            interaction.isButton() &&
            interaction.customId ===
                "config_permissoes"
        ) {

            const embed =
                new EmbedBuilder()

                    .setTitle(
                        "🔐 Configuração de Permissões"
                    )

                    .setDescription(
                        "Selecione os cargos responsáveis por cada função."
                    );


            const admin =
                new ActionRowBuilder()
                    .addComponents(

                        new RoleSelectMenuBuilder()

                            .setCustomId(
                                "select_admin_role"
                            )

                            .setPlaceholder(
                                "👑 Cargo de Administrador"
                            )

                    );


            const staff =
                new ActionRowBuilder()
                    .addComponents(

                        new RoleSelectMenuBuilder()

                            .setCustomId(
                                "select_staff_role"
                            )

                            .setPlaceholder(
                                "🛡️ Cargo de Staff"
                            )

                    );


            const support =
                new ActionRowBuilder()
                    .addComponents(

                        new RoleSelectMenuBuilder()

                            .setCustomId(
                                "select_support_role"
                            )

                            .setPlaceholder(
                                "🎫 Cargo de Suporte"
                            )

                    );


            const member =
                new ActionRowBuilder()
                    .addComponents(

                        new RoleSelectMenuBuilder()

                            .setCustomId(
                                "select_member_role"
                            )

                            .setPlaceholder(
                                "👥 Cargo de Membro"
                            )

                    );


            await interaction.update({

                embeds: [embed],

                components: [
                    admin,
                    staff,
                    support,
                    member
                ]

            });

            return;
        }


        /*
        ========================================
        SELEÇÃO DE CARGOS
        ========================================
        */

        if (
            interaction.isRoleSelectMenu()
        ) {

            const role =
                interaction.roles.first();

            if (!role) return;


            const roleMap = {

                select_admin_role:
                    "admin_role_id",

                select_staff_role:
                    "staff_role_id",

                select_support_role:
                    "support_role_id",

                select_member_role:
                    "member_role_id"

            };


            const field =
                roleMap[
                    interaction.customId
                ];


            if (!field) return;


            updateConfig(

                interaction.guild.id,

                field,

                role.id

            );


            await interaction.reply({

                content:
                    `✅ Cargo configurado: ${role}`,

                ephemeral: true

            });

            return;
        }


        /*
        ========================================
        STATUS
        ========================================
        */

        if (
            interaction.isButton() &&
            interaction.customId ===
                "config_status"
        ) {

            const config =
                getConfig(
                    interaction.guild.id
                );


            const canal = id =>
                id
                    ? `<#${id}>`
                    : "❌ Não configurado";


            const cargo = id =>
                id
                    ? `<@&${id}>`
                    : "❌ Não configurado";


            const embed =
                new EmbedBuilder()

                    .setTitle(
                        "📊 Status da Configuração"
                    )

                    .addFields(

                        {
                            name: "📢 Canais",
                            value:
                                `Logs: ${canal(config.log_channel_id)}\n` +
                                `Tickets: ${canal(config.ticket_panel_channel_id)}\n` +
                                `Categoria: ${canal(config.ticket_category_id)}\n` +
                                `Registro: ${canal(config.registration_channel_id)}\n` +
                                `Farm: ${canal(config.farm_channel_id)}`
                        },

                        {
                            name: "🔐 Cargos",
                            value:
                                `Administrador: ${cargo(config.admin_role_id)}\n` +
                                `Staff: ${cargo(config.staff_role_id)}\n` +
                                `Suporte: ${cargo(config.support_role_id)}\n` +
                                `Membro: ${cargo(config.member_role_id)}`
                        }

                    )

                    .setTimestamp();


            await interaction.update({

                embeds: [embed],

                components: []

            });

            return;
        }


        /*
        ========================================
        BOTÃO TICKETS
        ========================================
        */

        if (
            interaction.isButton() &&
            interaction.customId ===
                "config_tickets"
        ) {

            const embed =
                new EmbedBuilder()

                    .setTitle(
                        "🎫 Configuração de Tickets"
                    )

                    .setDescription(
                        "O sistema de tickets utilizará automaticamente:\n\n" +
                        "📁 A categoria configurada em **Canais**.\n" +
                        "🛡️ O cargo configurado em **Staff**.\n" +
                        "🎫 O canal configurado como painel.\n\n" +
                        "Configure esses itens primeiro."
                    );


            await interaction.update({

                embeds: [embed],

                components: []

            });

            return;
        }


        /*
        ========================================
        REGISTRO
        ========================================
        */

        if (
            interaction.isButton() &&
            interaction.customId ===
                "config_registro"
        ) {

            await interaction.reply({

                content:
                    "📝 O sistema de registro utilizará o canal definido em **📢 Canais**.",

                ephemeral: true

            });

            return;
        }


        /*
        ========================================
        FARM
        ========================================
        */

        if (
            interaction.isButton() &&
            interaction.customId ===
                "config_farm"
        ) {

            await interaction.reply({

                content:
                    "🌾 O sistema de Farm utilizará o canal definido em **📢 Canais**.",

                ephemeral: true

            });

            return;
        }


        /*
        ========================================
        MEMBROS
        ========================================
        */

        if (
            interaction.isButton() &&
            interaction.customId ===
                "config_membros"
        ) {

            await interaction.reply({

                content:
                    "👥 O sistema de membros utilizará os cargos definidos em **🔐 Permissões**.",

                ephemeral: true

            });

        }

    }

};