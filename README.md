# Hirsh
[![Build Status](https://scrutinizer-ci.com/g/Jinzulen/Hirsh/badges/build.png?b=master)](https://scrutinizer-ci.com/g/Jinzulen/Hirsh/build-status/master) [![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FJinzulen%2FHirsh.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FJinzulen%2FHirsh?ref=badge_shield) [![CodeFactor](https://www.codefactor.io/repository/github/jinzulen/hirsh/badge)](https://www.codefactor.io/repository/github/jinzulen/hirsh) [![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/Jinzulen/Hirsh/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/Jinzulen/Hirsh/?branch=master) [![Known Vulnerabilities](https://snyk.io/test/github/Jinzulen/Hirsh/badge.svg?targetFile=package.json)](https://snyk.io/test/github/Jinzulen/Hirsh?targetFile=package.json)

[![https://nodei.co/npm/hirsh.png](https://nodei.co/npm/hirsh.png)](https://www.npmjs.com/package/hirsh)

The best solution to get rid of the stress and strain of manually re-assigning user roles, with minimal configuration requirements and an easy setup process, you'll enjoy the full benefits of task automation in no time.

## Installation & Setup
You can install Hirsh through whichever dependency manager you prefer via commands similar to: `npm i hirsh`

Once installed, you can easily launch Hirsh by calling it from within your `ready` event like so:
```js
const discord = require("discord.js"),
      client  = new discord.Client();

client.on("ready", () => {
    console.log(`Logged in as ${client.user.username}.`);

    // Call and initialize Hirsh.
    require("hirsh").Instance({
        "Parent": client, // Discord client instance.
        "Sudoers": ["236123737525583872", "02102020220202"] // etc... Your user ID or the IDs of the bot's owners.
    });
});
```

And voila! It's that simple! Now once you launch your bot, it should take a couple of seconds at most for Hirsh to kick in and it's smooth sailing from there.

## Commands
| # | Name | Argument | Category | Permissions | Aliases | Description | Guild Only
--- | --- | --- | --- | --- | --- | --- | ---
1 | set-logs | Channel ID | Configuration | Admin / Server Manager | mod-logs | Assigns the channel Hirsh will use for logs. | Yes

## FAQ
> So where can I invite this bot?

Hirsh is a self-hosted bot, meaning you have to download and set it up yourself and then invite it to your own server(s).

> I want this thing to log what it does, is that possible?

Yes. You need only use the `h.set-logs` command to designate the channel you'd like Hirsh to document its actions in. It is recommended that you configure Hirsh's mod logs channel right after first launch, as it is disabled by default.

> Is there a config file somewhere?

No, Hirsh comes with its own configuration commands suite that's intended to be a easier and more convenient for server personnel to configure it.

> Hirsh is unable to add some roles?

- **Potential Reason #1:** The bot under which Hirsh is operating does not possess the `Manage Roles` permission.

- **Potential Reason #2:** You could also face this problem if the role Hirsh is trying to assign is above its own in the role hierarchy. To fix this, you can try pushing Hirsh up the hierarchy enough that it can assign that role.

- **Potential Reason #3:** The process during which Hirsh ascertains which roles a user has had in order to award them back includes an additional step that checks whether any of the roles no longer exist on the server (by way of their IDs), if Hirsh failed to assign a role and it had nothing to do with permissions/role hierarchy, that would most likely be the reason.

> I seem to be unable to use the configuration commands?

To use Hirsh's configuration commands, you must either be an administrator or possess `Manage Server` permissions.

## Acknowledgements
This project would not be possible without the [Discord.js](https://www.npmjs.com/package/discord.js) library and its command framework [Commando](https://www.npmjs.com/package/discord.js-commando).

Other dependencies that this project uses and/or relies on include:
- [Colors](https://www.npmjs.com/package/colors)
- [SQLite](https://www.npmjs.com/package/sqlite) & [SQLite3](https://www.npmjs.com/package/sqlite3)

## License
This tool is licensed under the MIT license. See the [LICENSE](https://github.com/Jinzulen/Hirsh/blob/master/LICENSE.md) file for more information. Credits are not necessary if you happen to use this project in the future but are appreciated.

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FJinzulen%2FHirsh.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FJinzulen%2FHirsh?ref=badge_large)
