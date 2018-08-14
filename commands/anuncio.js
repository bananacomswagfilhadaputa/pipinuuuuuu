const Discord = require("discord.js");

module.exports.run = async (client, message, args) =>{

   message.delete().catch(O_o=>{});
   if (!message.member.hasPermission('MANAGE_GUILD'))
      return message.reply("você não tem permissão!").then(msg => msg.delete(10000));
   let atlantic = message.guild.roles.find("name", "AtlanticMC - BOT");
   const comousar = new Discord.RichEmbed()
      .setAuthor("AtlanticMC - Bot", client.user.avatarURL)
      .setColor("#4a2aed")
      .setFooter("Atlantic")
      .addField("Como usar:", "`!anuncio <mensagem>`")
      
   let mensg = args.join(" ");
   if(!mensg)
      return message.channel.send(message.author, comousar).then(msg => msg.delete(10000));
   if(!message.guild.roles.find("name", "AtlanticMC - BOT")) {
        const anuncio = new Discord.RichEmbed()
            .setColor('#4a2aed')
            .setTitle(`⚠️ Atlantic - Anúncio `)
            
            .setDescription(mensg)
            
            .setTimestamp()
            .setFooter(`Por: ${message.author.tag} - Anúncio`, message.author.avatarURL)

        message.channel.send("@everyone", anuncio)
        return;
    }
    if(kallyrole.color == "0"){
            const anuncio = new Discord.RichEmbed()
                .setColor('#4a2aed')
                .setTitle(`⚠️ Atlantic - Anúncio`)
                
                .setDescription(mensg)
                
                .setTimestamp()
                .setFooter(`Por: ${message.author.tag} - Anúncio `, message.author.avatarURL)

            message.channel.send("@everyone", anuncio)
        }else{
            const anuncio = new Discord.RichEmbed()
                .setColor(atlantic.color)
                .setTitle(`#4a2aed`)
                
                .setDescription(mensg)
                
                .setTimestamp()
                .setFooter(`Por: ${message.author.tag} - Anúncio`, message.author.avatarURL)

            message.channel.send("@everyone", anuncio)
            return;
        }   
}
