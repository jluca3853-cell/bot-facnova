require("dotenv").config();

const {
    Client,
    GatewayIntentBits,
    Collection
} = require("discord.js");

const {
    initDatabase
} = require("./database");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

client.commands = new Collection();

const configuracao = require("./configuracao");

if (configuracao.data && configuracao.execute) {
    client.commands.set(
        configuracao.data.name,
        configuracao
    );
}

const ready = require("./ready");
const interactionCreate = require("./interactionCreate");

client.once(
    ready.name,
    (...args) => ready.execute(...args)
);

client.on(
    interactionCreate.name,
    (...args) => interactionCreate.execute(...args)
);

initDatabase();

client.login(process.env.DISCORD_TOKEN);