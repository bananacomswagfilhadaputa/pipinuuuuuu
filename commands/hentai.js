const Discord = require("discord.js");
const bot = new Discord.Client();
const snekfetch = require('snekfetch');
exports.run = async (client, message, args) => {
        const { body } = await snekfetch
        
            .get('https://nekos.life/api/lewd/neko')
       
        if (!message.channel.nsfw) return message.channel.send("Você só pode executar comandos __NSFW__ em #nsfw.")
        const embed = new Discord.RichEmbed()
        .setImage(body.neko)
        .setAuthor("Então você gosta de um hentai, rsrs")
        message.channel.send(embed).catch(console.error);
  }
   