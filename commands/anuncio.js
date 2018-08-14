const Discord = require("discord.js");

module.exports.run = async (client, message, args) =>{

   message.delete().catch(O_o=>{});
   if (!message.member.hasPermission('MANAGE_GUILD'))
      return message.reply("você não tem permissão!").then(msg => msg.delete(10000));
   let kallyrole = message.guild.roles.find("name", "Kally");
   const comousar = new Discord.RichEmbed()
      .setAuthor("Atlantic", client.user.avatarURL)
      .setColor("#4a2aed")
      .setFooter("© Atlantic")
      .addField("Como usar:", "`!anuncio <mensagem>`")
      
   let mensg = args.join(" ");
   if(!mensg)
      return message.channel.send(message.author, comousar).then(msg => msg.delete(10000));
   if(!message.guild.roles.find("name", "Kally")) {
        const anuncio = new Discord.RichEmbed()
            .setColor('#4a2aed')
            .setTitle(`⚠️ Atlantic - Anúncio`)
            
            .setDescription(mensg)
            
            .setTimestamp()
            .setFooter(`Por: ${message.author.tag} - Atlantic`, message.author.avatarURL)

        message.channel.send("@everyone", anuncio)
        return;
    }
    if(kallyrole.color == "0"){
            const anuncio = new Discord.RichEmbed()
                .setColor('#4a2aed')
                .setTitle(`⚠️ Atlantic - Anúncio`)
                
                .setDescription(mensg)
                
                .setTimestamp()
                .setFooter(`Por: ${message.author.tag} - Atlantic `, message.author.avatarURL)

            message.channel.send("@everyone", anuncio)
        }else{
            const anuncio = new Discord.RichEmbed()
                .setColor(kallyrole.color)
                .setTitle(`⚠️ Atlantic - Anúncio`)
                
                .setDescription(mensg)
                
                .setTimestamp()
                .setFooter(`Por: ${message.author.tag} - Atlantic`, message.author.avatarURL)

            message.channel.send("@everyone", anuncio)
            return;
        }   
}
