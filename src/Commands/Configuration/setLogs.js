/**
 * @author Jinzulen
 * @license MIT License
 * @copyright Copyright (C) 2019 Jinzulen <root@jinzulen.xyz>
 * @description Automate the process of logging leaving users' roles and manually assigning them back upon rejoin on a Discord server.
 */

const { RichEmbed } = require ("discord.js");
const { Command } = require("discord.js-commando");

module.exports = class setLogsCommand extends Command
{
    constructor (client)
    {
        super(client, {
            name: "set-logs",
            aliases: ["mod-logs"],
            group: "configuration",
            memberName: "set-logs",
            examples: ["h.set-logs 411446712243060737"],
            userPermissions: ["ADMINISTRATOR", "MANAGE_GUILD"],
            description: "Configure the channel Hirsh uses for moderation logs.",
            args: [
                {
                    key: "Channel",
                    type: "channel",
                    label: "channel ID",
                    prompt: "What is the ID of the channel you'd like Hirsh to use for this?"
                }
            ]
        });
    }

    async run (Message, {Channel})
    {
        if (Channel.id !== this.client.provider.get(Message.guild.id, "mod-logs"))
        {
            if (this.client.provider.set(Message.guild.id, "mod-logs", Channel.id))
            {
                if (this.client.provider.init(this.client))
                {
                    Message.guild.channels.find("id", Channel.id).send(new RichEmbed()
                        .setColor("#33ccff")
                        .setAuthor(Message.client.user.username, Message.client.user.avatarURL)
                        .setDescription(`<#${Channel.id}> has been successfully set as Hirsh's logs channel.`)
                    ).catch(console.error);
                } else {
                    Message.channel.send("Error occurred when trying to reload SQLiteProvider. :exclamation: **-** Please try again later.");
                }
            } else {
                Message.channel.send("Error occurred when trying to set the mod logs channel. If this persists then please open an issue at: https://github.com/Jinzulen/Hirsh/issues/new");
            }
        } else {
            Message.channel.send("No changes have been made. :ok_hand:")
        }
    }
}
