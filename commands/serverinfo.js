const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  
  let online = message.guild.members.filter(member => member.user.presence.status !== 'offline');
  let day = message.guild.createdAt.getDate()
  let month = 1 + message.guild.createdAt.getMonth()
  let year = message.guild.createdAt.getFullYear()
   let sicon = message.guild.iconURL;
   let serverembed = new Discord.RichEmbed()
   .setAuthor(message.guild.name, sicon)
   .setFooter(`Servidor criado • ${day}.${month}.${year}`)
   .setColor("#cc22a7")
   .setTimestamp()
   .setThumbnail(sicon)
   .addField("ID:", message.guild.id, true)
   .addField("Nome:", message.guild.name, true)
   .addField("Dono:", message.guild.owner.user.tag, true)
   .addField("Região:", message.guild.region, true)
   .addField("Channels", message.guild.channels.size, true)
   .addField("Membros:", message.guild.memberCount, true)
   .addField("Bots:", message.guild.members.filter(m => m.user.bot).size, true)
   .addField(":white_circle: Onlines:", online.size, true)
   .addField("Cargos:", message.guild.roles.size, true);
   message.channel.send(serverembed);

}
exports.help = {
  name: "serverinfo",
  aliases: [
      'sv'
  ]
  }