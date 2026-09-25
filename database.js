const Database = require("better-sqlite3");

const db = new Database("database.sqlite");

function initDatabase() {

    db.pragma("journal_mode = WAL");

    db.exec(`

        CREATE TABLE IF NOT EXISTS server_config (

            guild_id TEXT PRIMARY KEY,

            log_channel_id TEXT,
            ticket_category_id TEXT,
            ticket_panel_channel_id,

            registration_channel_id TEXT,
            farm_channel_id TEXT,
            member_channel_id TEXT,
            admin_panel_channel_id TEXT,

            admin_role_id TEXT,
            staff_role_id TEXT,
            support_role_id TEXT,
            member_role_id TEXT,

            updated_at TEXT DEFAULT CURRENT_TIMESTAMP
        );

    `);

    console.log("✅ Banco de dados iniciado.");

}

function getConfig(guildId) {

    let config = db.prepare(`
        SELECT *
        FROM server_config
        WHERE guild_id = ?
    `).get(guildId);

    if (!config) {

        db.prepare(`
            INSERT INTO server_config
            (guild_id)
            VALUES (?)
        `).run(guildId);

        config = db.prepare(`
            SELECT *
            FROM server_config
            WHERE guild_id = ?
        `).get(guildId);
    }

    return config;
}

function updateConfig(guildId, field, value) {

    const allowedFields = [

        "log_channel_id",
        "ticket_category_id",
        "ticket_panel_channel_id",

        "registration_channel_id",
        "farm_channel_id",
        "member_channel_id",
        "admin_panel_channel_id",

        "admin_role_id",
        "staff_role_id",
        "support_role_id",
        "member_role_id"

    ];

    if (!allowedFields.includes(field)) {
        throw new Error("Campo inválido.");
    }

    getConfig(guildId);

    db.prepare(`
        UPDATE server_config
        SET ${field} = ?,
            updated_at = CURRENT_TIMESTAMP
        WHERE guild_id = ?
    `).run(value, guildId);

}

module.exports = {
    db,
    initDatabase,
    getConfig,
    updateConfig
};