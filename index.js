/**
 * Copyright (C) 2021 David Thompson Coding Club
 *
 * This file is part of LITERALLY 1984.
 * 
 * LITERALLY 1984 is free software:
 * you can redistribute it and/or modify it
 * under the terms of the GNU Affero General Public License
 * as published by the Free Software Foundation,
 * either version 3 of the License,
 * or (at your option) any later version.
 * 
 * LITERALLY 1984 is distributed
 * in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Affero General Public License for more details.
 * 
 * You should have received
 * a copy of the GNU Affero General Public License
 * along with LITERALLY 1984.
 * If not, see <https://www.gnu.org/licenses/>.
 */

"use strict"

const fs = require("fs")
const { Client, Intents } = require("discord.js")
const {
    activity,
    info,
    reportsChannelId,
    status,
} = require("./etc/config.json")

const blacklistLoc = __dirname + "/etc/blacklist.txt"
const blacklist = fs.readFileSync(blacklistLoc, "utf-8").trim().split("\n")
const blacklistPat = new RegExp(`\\b(${blacklist.join("|")})\\b`, "i")

// Initialize bot
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ]
})
client.once("ready", () => {
    console.log(info.ready)
    client.user.setActivity(activity)
    client.user.setStatus(status)
})

// Listen for new messages
client.on("messageCreate", (msg) => {
    const { author, channel, content } = msg
    if (author.bot)
        return
    if (isProfane(content)) {
        warn(msg)
        report(msg)
    }
})

const isProfane = (content) => blacklistPat.test(content)
const warn = (msg) => msg.reply(info.warning)
const report = ({ author, channel, content }) => {
    const reportsChannel = client.channels.cache.get(reportsChannelId)
    const profanityReport = (
        `<@${author.id}> wrote in <#${channel.id}>:\n` + content
    )
    reportsChannel.send(profanityReport)
}

// Log in
const tokenLoc = __dirname + "/etc/token"
const token = fs.readFileSync(tokenLoc, "utf-8").trim()
client.login(token)
