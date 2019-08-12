const fs = require('fs')
const d = require('discord.js')
const bot = new d.Client()
const request = require('request')
bot.on('message',async msg => {
    if(msg.author.id !== 'your id') return
    if(msg.channel.type !== 'dm') return
    if(msg.content.toLowerCase().startsWith('^leave')){
        let args = msg.content.split(" ").slice(1)
        if(!args) msg.channel.send(`Please provide an invite like of the server to leave!`)
        if(args[0].length > 18) return msg.channel.send(`That is now a valid invite link!`)
        var request = require("request");

        var options = { method: 'DELETE',
        url: 'https://discordapp.com/api/v6/users/@me/guilds/' + args[0],
        headers: 
         { 
           Host: 'discordapp.com',
           Accept: '*/*',
           Authorization: String('token').replace('\r',''),
           'Content-Type': 'application/json' },
        json: true };
    request(options, function (error, response, body) {
    if (error) return msg.channel.send(error)
    console.log(response.body)
    if(response.body === undefined) return msg.channel.send(`Successfully left the server \`${bot.guilds.get(args[0])}\``)
    if(response.body.message) return msg.channel.send(response.body.message)
    });
    }
    if(msg.content.toLowerCase().startsWith('^join')){
        let args = msg.content.split(' ').slice(1)
        if(!args) return msg.channel.send(`Please provide a server invite to join.`)
        if(args[0].length > 6) return msg.channel.send(`That is not an invite link!`)
        console.log(args[0])
        var request = require("request");

var options = { method: 'POST',
  url: 'https://discordapp.com/api/v6/invite/' + args[0],
  headers: 
   { 'cache-control': 'no-cache',
     Connection: 'keep-alive',
     Host: 'discordapp.com',
     Accept: '*/*',
     Authorization: String('token').replace('\r',''),
     'Content-Type': 'application/json' },
    json: true };
    request(options, function (error, response, body) {
    if (error) return msg.channel.send(error)
    if(body.message === 'The user is banned from this guild.') return msg.channel.send(body.message)
    msg.channel.send(`Successfully joined the server \`${body.guild.name}\``)
    });
    }
})
bot.login(`token`)