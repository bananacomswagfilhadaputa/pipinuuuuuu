const Discord = require("discord.js");
const fs = require("fs");
let warns = require("../util/warnings.json");

module.exports.run = async (client, message, args, prefix) =>{

    message.delete().catch(O_o=>{});
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(`você não tem permissão! ${emojinop}`).then(msg => msg.delete(6000));
    const comousar = new Discord.RichEmbed()
    .setAuthor("Atlantic - Punições", client.user.avatarURL)
    .setDescription(`Ao executar, ira ver os avisos do membro mencionado`)
    .setColor("#4a2aed")
    .setFooter("© Atlantic - Paosz#5829")
    .addField("Como usar:", "`!warns @usuário`")
    let member = message.mentions.members.first();
    if(!member)
        return message.channel.send(message.author, comousar).then(msg => msg.delete(10000));
    
    if(!warns[`${member.user.id}-${message.guild.id}`]) warns[`${member.user.id}-${message.guild.id}`] = {
        warns: 0
    };
    
    const avisoseb = new Discord.RichEmbed()
      .setAuthor(member.user.tag, member.user.avatarURL)
      .setDescription(`O${member} tem __${warns[`${member.user.id}-${message.guild.id}`].warns}__ avisos!`)
      .setColor("#4a2aed")
      .setFooter("Atlantic - Moderação")
    message.channel.send(message.author, avisoseb)

    fs.writeFile("./util/warnings.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err)
    });
   
   
   
}

exports.help = {
    name: "avisos",
    aliases: [
        'warns'
    ]
}