const Discord = require('discord.js');
const bot = new Discord.Client({disableEveryone: false});
const fs = require('fs');
var request = require('request');
const ping = require('mc-hermes');
const send = require('quick.hook');

module.exports.run = async (bot, message, args) => {
    serverr = args[0];
    let url = "http://mcapi.us/server/status?ip=" + serverr;
    request(url, function(err, response, body) {

    if(!serverr) return message.reply(`Você precisa colocar um ip.`)
    var status = "Offline";
    if (body.online) {
        status ="Online";
    }

// PC Ping
        body = JSON.parse(body);

        //if (body.online === 'true') {
          //  return 'Online';
        //}

        console.log(`\`${serverr}\`: Jogadores online: ${body.players.now}`);
        sv = new Discord.RichEmbed()
        .setAuthor(`Informações sobre o servidor: ${serverr}`, `https://mcapi.de/api/image/favicon/${serverr}`)
        .setThumbnail(`https://mcapi.de/api/image/favicon/${serverr}`)
        .addField("Versões", body.server.name, true)
        .addField("Motd", body.motd, true)
        .addField("Disponibilidade", body.online)
        .addField('Protocolo', body.server.protocol, true)
        .addField("Jogadores", body.players.now + "/" + body.players.max, true)
        .setFooter(message.author.username, message.author.displayAvatarURL)
        .setTimestamp()
        send(message.channel, sv, {
            name: 'Minecraft',
            icon: 'https://www.freeiconspng.com/uploads/minecraft-icon-0.png'
        })
        //message.channel.send(sv)
    });
        //message.reply(`Servidor: \`${serverr}\`: Jogadores online: ${data.players.online}`);





    //.then((data)=>{
        //console.log(`Jogadores Online: ${data.players.online}`);
    //})
    //.catch(console.error);

    //message.channel.send(`Jogadores online no servidor \`/${serverr}\`/: ${data.players.online}`)
    //.catch(error => {

        //message.channel.send(`Servidor não encontrado.`)

    //})
}
  
module.exports.help = {
    name: "mcserver"
  }