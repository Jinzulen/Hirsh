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

# Listen for Incoming Users
Client.on "guildMemberAdd", (Member) ->
    try
        Database.get "SELECT * FROM hirsh_logs WHERE user_id = ?", Member.id, (Error, Row) ->
            if Error
                throw Error

            if typeof Row != "undefined"
                Flairs = (Row.user_roles).split ", "

                # Grant
                for i of Flairs
                    if Member.guild.roles.find "id", Flairs[i]
                        Member.addRole Flairs[i]
                    else
                        console.error Colors.bold.red "# [Hirsh: Service] Could not locate role belonging to ID # " + Flairs[i]

                # Log
                if Configuration.Moderation.LOGS_STATUS == "on"
                    Channel = Member.guild.channels.find "id", Configuration.Moderation.LOGS_CHANNEL

                    if Channel
                        Embed = new Discord.RichEmbed()
                        .setColor "#66ff33"
                        .setAuthor Client.user.username, Client.user.avatarURL
                        .setThumbnail Member.user.avatarURL
                        .setDescription Member.user.username + "#" + Member.user.discriminator + " has been automatically granted **" + Flairs.length + "** of their previous roles."

                        Channel.send Embed
                    else
                        console.error Colors.bold.red "# [Hirsh: Service] Logs channel not found, action will not be registered."

                # Delete
                Database.run "DELETE FROM hirsh_logs WHERE user_id = ?", Member.id, (Error) ->
                    if Error
                        throw Error

                    console.log Colors.bold.blue "# [Hirsh: Service] Deleted record for: " + Member.user.username + "#" + Member.user.discriminator#
    catch E
      throw new Error E

# Authenticate Hirsh
Client.login Configuration.Application.BOT_TOKEN
