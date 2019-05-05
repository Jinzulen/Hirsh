# Hirsh
The best solution to get rid of the stress and strain of manually giving users back their roles, with minimal configuration requirements and an easy setup process, you'll enjoy the full benefits of task automation in no time.

## FAQ
> So where can I invite this bot?

Hirsh is a self-hosted bot, meaning you have to download and set it up yourself and then invite it to your own server(s).

> Hirsh is unable to add some roles?

- **Potential Reason #1:** The bot under which Hirsh is operating does not possess the `Manage Roles` permission.

- **Potential Reason #2:** You would face this problem if the role Hirsh is trying to give is above its own in the role hierarchy. To fix this, you can try pushing Hirsh up the hierarchy enough that it can award that role or add the problematic role to the list of ignored roles in the config file under the `[Ignores]` section if you either don't want to have it so that Hirsh is able to award that role or if you simply want it to ignore it.

- **Potential Reason #3:** The process during which Hirsh ascertains which roles a user has had in order to award them back includes an additional step that checks whether any of the roles no longer exist on the server (by way of their IDs). if Hirsh failed to give a role and it had nothing to do with permissions/role hierarchy, that would most likely be the reason why.


## License
This tool is licensed under the MIT license. See the [LICENSE](https://github.com/Jinzulen/Hirsh/blob/master/LICENSE.md) file for more information.
