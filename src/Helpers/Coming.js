/**
 * @author Jinzulen
 * @license MIT License
 * @copyright Copyright (C) 2019 Jinzulen <root@jinzulen.xyz>
 * @description Automate the process of logging leaving users' roles and granting them back upon rejoin on a Discord server.
 */

const Colors = require ("colors");

module.exports = function (Member, Database)
{
    try
    {
        Database.get("SELECT * FROM hirsh_logs WHERE user_id = ?", Member.id, (Error, Data) => {
            if (Error)
            {
                throw (Error);
            }

            if (typeof Data !== "undefined")
            {
                let Flairs = (Data.user_roles).split(", ");

                // Grant
                for (i in Flairs)
                {
                    if (Member.guild.roles.find("id", Flairs[i]))
                    {
                        Member.addRole(Flairs[i]).catch(console.error);
                    } else {
                        console.error (Colors.bold.red ("# [Hirsh: Service] Could not locate role belonging to ID # " + Flairs[i]));
                    }
                }

                // TO-DO: MOD LOGS (ONCE COMMANDO SETTINGS ARE SORTED OUT).

                // Delete
                Database.run("DELETE FROM hirsh_logs WHERE user_id = ?", Member.id, (Error) => {
                    if (Error)
                    {
                        throw (Error);
                    }

                    // TO-DO: Record in database instead of logging to console.
                    console.log (Colors.bold.blue (`# [Hirsh: Service] Deleted record for: ${Member.user.username}#${Member.user.discriminator}`));
                });
            }
        });
    } catch (E) {
        throw new Error (E);
    }
}
