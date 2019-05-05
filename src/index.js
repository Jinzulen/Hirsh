/**
 * @author Jinzulen
 * @license MIT License
 * @copyright Copyright (C) 2019 Jinzulen <root@jinzulen.xyz>
 * @description Automate the process of logging leaving users' roles and granting them back upon rejoin on a Discord server.
 */

const Path = require("path");
const Colors = require("colors");
const SQLite = require ("sqlite");
const SQLite3 = require ("sqlite3");
const Commando = require ("discord.js-commando");

module.exports = function (Configuration)
{
    // Discord client instance.
    const Parent = Configuration.Parent;

    // Bot owners.
    const Sudoers = Configuration.Sudoers;

    /**
     * Initialize Hirsh client.
     *
     * @param owner List of Discord users who own the bot Hirsh will be operating under.
     * @param commandPrefix The prefix used by the bot to listen for commands. - DON'T CHANGE.
     * @param nonCommandEditable Whether Hirsh should listen for messages that are later edited into commands. - DON'T CHANGE.
     * @param unknownCommandResponse Whether Hirsh should send a "Command not found/Unknown command" message upon trigger by prefix. - DON'T CHANGE.
     */
    const Hirsh = new Commando.Client
    ({
        owner: Sudoers,
        commandPrefix: "h.",
        disableEveryone: true,
        nonCommandEditable: false,
        unknownCommandResponse: false
    });

    const Database = new SQLite3.Database(Path.join(__dirname, "../Hirsh.db"), (Error) => {
        if (Error)
        {
            console.error (Colors.bold.red (Error.message));
            process.exist (1);
        }
    });

    // Commando server settings database.
    Hirsh.setProvider(SQLite.open(Path.join(__dirname, "../Hirsh.db")).then(db => new Commando.SQLiteProvider(db))).catch(console.error);

    Hirsh.on("ready", () => {
        if (Hirsh.provider.init(Hirsh))
        {
            console.log (Colors.bold.green ("# [Hirsh: DB] SQLite module initialized."));
        }

        console.log (Colors.bold.green (`# [Hirsh: Service] Started listening using: ${Hirsh.user.username}#${Hirsh.user.discriminator}.\n`));
    });

    Hirsh.on("commandError", (Command, Error) => {
        if (Error instanceof Client.FriendlyError) return;

        return console.error (Colors.bold.red (`# [Hirsh: Commands] Error in ${Command.groupID}:${Command.memberName}`, Error.message));
    });

    Hirsh.registry.registerGroups([
        ["configuration", "Commands respective to Hirsh's configuration."]
    ]).registerDefaultTypes().registerCommandsIn(Path.join(__dirname, "Commands/"));

    // Listen for incoming users.
    Hirsh.on("guildMemberAdd", (Member) => {
        return require ("./Helpers/Coming") (Member, Database);
    });

    // Listen for leavers.
    Hirsh.on("guildMemberRemove", (Member) => {
        return require ("./Helpers/Leaving") (Member, Database);
    });

    // Authenticate Hirsh.
    if (Parent.token)
    {
        Hirsh.login (Parent.token);
    } else {
        console.error (Colors.bold.red ("# [Hirsh: Service] Cannot launch Hirsh due to a missing bot token."));
    }
}
