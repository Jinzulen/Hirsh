/**
 * @author Jinzulen
 * @license MIT License
 * @copyright Copyright (C) 2019 Jinzulen <root@jinzulen.xyz>
 * @description Automate the process of logging leaving users' roles and manually assigning them back upon rejoin on a Discord server.
 */

const { RichEmbed } = require ("discord.js");

module.exports = function (Hirsh, Member, Database)
{
    try
    {
        let Data = [Member.id, (Member.roles.map(F => F.id).join(", ")).replace(`${Member.guild.id}, `, ""), Member.guild.id];

        // Save
        Database.run("INSERT INTO hirsh_logs (user_id, user_roles, user_guild) VALUES (?, ?, ?)", Data, function (Error) {
            if (Error)
            {
                throw (Error);
            }

            // Mod Log
            if (Hirsh.provider.get(Member.guild.id, "mod-logs") !== null)
            {
                if (Hirsh.provider.get(Member.guild.id, "alert-leaving") !== false)
                {
                    if (Hirsh.provider.get(Member.guild.id, "mod-logs"))
                    {
                        const Channel = Member.guild.channels.find("id", Hirsh.provider.get(Member.guild.id, "mod-logs"));

                        if (Channel)
                        {
                            Channel.send(new RichEmbed()
                            .setColor("#ff9900")
                            .setTitle("Successfully Documented")
                            .setThumbnail(Member.user.avatarURL)
                            .setAuthor(Member.guild.client.user.username, Member.guild.client.user.avatarURL)
                            .setDescription(`I have saved all of **${Member.user.username}#${Member.user.discriminator}**'s roles and I stand ready to re-assign them upon rejoin.`)).catch(console.error);
                        }
                    }
                }
            }
        });
    } catch (E) {
        throw new Error (E);
    }
}
