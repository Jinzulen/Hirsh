/**
 * @author Jinzulen
 * @license MIT License
 * @copyright Copyright (C) 2019 Jinzulen <root@jinzulen.xyz>
 * @description Automate the process of logging leaving users' roles and granting them back upon rejoin on a Discord server.
 */

module.exports = function (Member, Database)
{
    try
    {
        let Data = [Member.id, (Member.roles.map(F => F.id).join(", ")).replace(`${Member.guild.id}, `, ""), Member.guild.id];

        Database.run("INSERT INTO hirsh_logs (user_id, user_roles, user_guild) VALUES (?, ?, ?)", Data, function (Error) {
            if (Error)
            {
                throw (Error);
            }

            // TO-DO: MOD-LOGS
        });
    } catch (E) {
        throw new Error (E);
    }
}
