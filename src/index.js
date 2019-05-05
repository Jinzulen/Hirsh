/**
 * @author Jinzulen
 * @license MIT License
 * @copyright Copyright (C) 2019 Jinzulen <root@jinzulen.xyz>
 * @description Automate the process of logging leaving users' roles and granting them back upon rejoin on a Discord server.
 */

const Path = require("path");
const Colors = require("colors");
const SQLite = require ("sqlite");
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

    // Commando server settings database.
    Hirsh.setProvider(SQLite.open(Path.join(__dirname, "Hirsh.db")).then(db => new Commando.SQLiteProvider(db))).catch(console.error);

    Hirsh.on("ready", () => {
        console.log (Colors.bold.green(`# [Hirsh: Service] Started listening using: ${Hirsh.user.username}#${Hirsh.user.discriminator}.\n`));
    });

    // Authenticate Hirsh.
    Hirsh.login (Parent.token);
}
