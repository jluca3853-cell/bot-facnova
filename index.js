require("dotenv").config();

const {
    Client,
    GatewayIntentBits,
    Collection
} = require("discord.js");

const fs = require("fs");
const path = require("path");

const { initDatabase } = require("./database/database");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");

for (const file of fs.readdirSync(commandsPath)) {
    if (!file.endsWith(".js")) continue;

    const command = require(path.join(commandsPath, file));

    if (command.data && command.execute) {
        client.commands.set(
            command.data.name,
            command
        );
    }
}

const eventsPath = path.join(__dirname, "events");

for (const file of fs.readdirSync(eventsPath)) {
    if (!file.endsWith(".js")) continue;

    const event = require(path.join(eventsPath, file));

    if (event.once) {
        client.once(
            event.name,
            (...args) => event.execute(...args)
        );
    } else {
        client.on(
            event.name,
            (...args) => event.execute(...args)
        );
    }
}

initDatabase();

client.login(process.env.DISCORD_TOKEN);