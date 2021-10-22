# LITERALLY 1984

LITERALLY 1984 is a Discord bot
created by the DT Code Club
to keep watch for profanity in its Discord guild.

Upon detecting a message that contains words
matched by the configurable blacklist,
it will send a warning to the message author
and report the message to the club admins.

LITERALLY 1984 is extremely simple,
written under fifty lines of Node.js source code,
with no dependencies other than [discord.js](https://github.com/discordjs/discord.js).

## Setup

This bot is meant for DT Code Club's Discord guild,
but feel free to host your own instance!

Clone the source code and `cd` into the directory:

    git clone https://github.com/dt-code-club/literally-1984
    cd literally-1984

Install the dependencies:

    npm install

You probably want to update the information
in `package.json` and `etc/config.json`.
To find the channel ID of your reports channel,
enable Discord's Developer Mode in App Settings > Advanced
and click "Copy ID" in the pop-up menu
that appears when you right-click on your desired channel.

To update the list the bot uses to detect profanity,
edit `etc/blacklist.txt`.
Each line is a regular expression that will match at least one word.

Go to [Discord Developer Portal](https://discord.com/developers/applications)
and create a new application.
Click "Bot" on the side panel and click "Add Bot".
Copy the token located under the "Build-A-Bot" section,
and write that into a new file, `etc/token`.

    echo YOUR_TOKEN > etc/token

Your bot is now ready!
To start running, enter into your shell:

    node .

To add your bot to your Discord guild,
authorize it at `https://discord.com/oauth2/authorize?client_id=APPLICATION_ID&permissions=2048&scope=bot`,
with `APPLICATION_ID` replaced by your bot's application ID.
You can find that in the "General Information" section
of your application on Discord Developer Portal.

## Author

Written by [@climbTheStairs](https://github.com/climbTheStairs).

## Reporting bugs

Please report any bugs you find in the GitHub issues,
or notify the author of this program
or the DT Code Club by email at <dtcodeclub@gmail.com>.
Feedback and suggestions are welcome as well!

## License

Copyright (C) 2021 climbTheStairs <yxtqwf@gmail.com>

LITERALLY 1984 is free software,
licensed under [GPL-2.0-or-later](https://www.gnu.org/licenses/agpl-2.0.html).
