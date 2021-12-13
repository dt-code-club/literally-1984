/**
 * Written in 2021 by climbTheStairs <yxtqwf@gmail.com>
 *
 * This file is part of LITERALLY 1984.
 * 
 * To the extent possible under law,
 * the author(s) have dedicated all copyright
 * and related and neighboring rights to this software
 * to the public domain worldwide.
 * This software is distributed without any warranty.
 * 
 * You should have received a copy
 * of the CC0 Public Domain Dedication along with this software.
 * If not, see <http://creativecommons.org/publicdomain/zero/1.0/>. 
 */

"use strict"

const fs = require("fs")
const { Client, Intents } = require("discord.js")
const conf = require("./etc/config.json")

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
    console.log(conf.info.ready)
    client.user.setActivity(conf.activity)
    client.user.setStatus(conf.status)
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
const warn = (msg) => msg.reply(conf.info.warning)
const report = ({ author, channel, content }) => {
    const reportsChannel = client.channels.cache.get(conf.reportsChannelId)
    const profanityReport = (
        `<@${author.id}> wrote in <#${channel.id}>:\n` + content
    )
    reportsChannel.send(profanityReport)
}

// Log in
const tokenLoc = __dirname + "/etc/token"
const token = fs.readFileSync(tokenLoc, "utf-8").trim()
client.login(token)
