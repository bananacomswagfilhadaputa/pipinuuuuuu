const Discord = require('discord.js');
module.exports.run = (client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(":no_good: **|** Sem permissão.");
  message.delete();
  if(!args[0]){
    const comousar = new Discord.RichEmbed()
    .setAuthor("Atlantic", client.user.avatarURL)
    .setColor("#4a2aed")
    .setFooter("© Atlantic")
    .addField("Como usar:", "`!changelog <mensagem>`")
    message.channel.send({embed: comousar});
    return;
}
  var args = message.content.split(" ").slice(1).join(" ");
  if(!args) return message.reply('Digite !changelog para saber mais.')
    const embed1 = new Discord.RichEmbed()
    .setAuthor('Changelog', "https://cdn.discordapp.com/attachments/467178630666256398/467184279475060736/8104LoadingEmote.gif")
    .setDescription("**»** " + args)
    .setColor('#0b8825')
    .setTimestamp()
    .setFooter(`Changelog postada por: ${message.author.username}`, message.author.avatarURL);
    message.channel.send({embed: embed1});
}

exports.help = {
    name: "changelog"
}