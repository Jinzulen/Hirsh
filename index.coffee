# Core Modules
FS = require "fs"
Path = require "path"
Colors = require "colors"

# Discord
Discord = require "discord.js"
Client = new Discord.Client

# Fetch and Parse Configuration
TOML = require "toml"
conLocation = Path.join __dirname, "config.toml"

Configuration = TOML.parse FS.readFileSync conLocation, "utf8"

# SQLite
SQLite = require "sqlite3"
dbLocation = Path.join __dirname, "Hirsh.db"

Database = new SQLite.Database dbLocation, (Error) ->
    if Error
        console.error Colors.bold.red Error.message
        process.exit 1

    console.log Colors.bold.green "# [Hirsh: DB] Successfully connected to SQLite database."

# Discord Operations
Client.on "warn", (E) -> console.warn Colors.bold.blue E

Client.on "error", (E) -> console.error Colors.bold.red E

Client.on "debug", (E) ->
    if Configuration.Application.APP_DEBUG == "on"
        console.info Colors.bold.yellow E

Client.on "ready", () ->
    console.log Colors.bold.green "# [Hirsh: User] Successfully logged in using " + Client.user.username + "#" + Client.user.discriminator

# Authenticate Hirsh
Client.login Configuration.Application.BOT_TOKEN
