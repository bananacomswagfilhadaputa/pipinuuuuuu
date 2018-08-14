const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: false});

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(message.author.toString() + " Desculpe, apenas administradores podem usar esse comando");
    const Aviso = args.join(" ");

    message.delete().catch();
    message.channel.send("@here"); // Mencionar todos os jogadores
    let aviso = new Discord.RichEmbed()
    .setColor("edac2a")
    .setAuthor("AtlanticMC", "Avisos")
    .setDescription(Aviso)
    
      
    .setTimestamp()
    .setFooter(`Por: ${message.author.tag} `, message.author.avatarURL)
    return message.channel.send(aviso);
  }
  
module.exports.help = {
    name: "aviso"
  }
