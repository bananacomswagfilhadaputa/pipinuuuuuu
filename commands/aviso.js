const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: false});

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(message.author.toString() + " apenas administradores podem executar esse comando.");
    const Aviso = args.join(" ");

    let semnada = new Discord.RichEmbed()
    .setColor("4a2aed")
    .setAuthor(bot.user.username, bot.user.avatarURL)
    .addField("!aviso", "Manda um aviso mencionando todos os jogadores no canal que o usuário enviou a mensagem.")

    if(!Aviso)
    return message.author.send(semnada)
    message.delete().catch();
    message.channel.send("@everyone"); // Mencionar todos os jogadores
    let aviso = new Discord.RichEmbed()
    .setColor("edac2a")
    .setAuthor("⚠️ Anúncio ", "mc-atlantic.tk", "https://cdn.discordapp.com/attachments/409846357982183434/429837842697682955/emoji.png")
    .setDescription(Aviso)
      
    .setTimestamp()
    .setFooter(`Por: ${message.author.tag} - {bot.user.username} | Anúncio`, message.author.avatarURL)
    return message.channel.send(aviso);
  }
  
module.exports.help = {
    name: "aviso"
  }
