const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

      if(!message.member.hasPermission("ADMINISTRATOR")) return;
      const embed = new Discord.RichEmbed() 
    .setAuthor('Votação', "https://cdn.discordapp.com/attachments/467178630666256398/471106934259318784/success.gif")
    .setDescription("" + args.join(" "))
    .setColor('RANDOM')
    .setTimestamp()
    .setFooter(`Por: ${message.author.username}`, message.author.avatarURL); 
        message.delete().catch();
        message.channel.send({
        embed
    }).then(msg => {
        msg.react("👍").then(r => msg.react("👎"))
    });


}
//