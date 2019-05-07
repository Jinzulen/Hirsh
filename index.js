/**
 * @author Jinzulen
 * @license MIT License
 * @copyright Copyright (C) 2019 Jinzulen <root@jinzulen.xyz>
 * @description Automate the process of logging leaving users' roles and manually assigning them back upon rejoin on a Discord server.
 */

exports.Instance = function (Configuration)
{
    return require ("./src") (Configuration);
}
