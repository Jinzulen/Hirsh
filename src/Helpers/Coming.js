/**
 * @author Jinzulen
 * @license MIT License
 * @copyright Copyright (C) 2019 Jinzulen <root@jinzulen.xyz>
 * @description Automate the process of logging leaving users' roles and manually assigning them back upon rejoin on a Discord server.
 */

const Colors = require ("colors");
const { RichEmbed } = require ("discord.js");

module.exports = function (Hirsh, Member, Database)
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

                // Mod Log
                if (Hirsh.provider.get(Member.guild.id, "mod-logs") !== null)
                {
                    if (Hirsh.provider.get(Member.guild.id, "alert-rejoin") !== "off")
                    {
                        if (Hirsh.provider.get(Member.guild.id, "mod-logs"))
                        {
                            const Channel = Hirsh.provider.get(Member.guild.id, "mod-logs");

                            Member.guild.channels.find("id", Channel).send(new RichEmbed()
                            .setColor("#ff9900")
                            .setTitle("Successfully Assigned")
                            .setThumbnail(Member.user.avatarURL)
                            .setAuthor(Member.guild.client.user.username, Member.guild.client.user.avatarURL)
                            .setDescription(`I have successfully re-assigned all of **${Member.user.username}#${Member.user.discriminator}**'s roles and deleted their previous save.`)).catch(console.error);
                        }
                    }
                }

                // Delete
                Database.run("DELETE FROM hirsh_logs WHERE user_id = ?", Member.id, (Error) => {
                    if (Error)
                    {
                        throw (Error);
                    }

                    console.log (Colors.bold.blue (`# [Hirsh: Service] Deleted record for: ${Member.user.username}#${Member.user.discriminator}`));
                });
            }
        });
    } catch (E) {
        throw new Error (E);
    }
}
