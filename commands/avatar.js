const Discord = require("discord.js");

module.exports.run = async (client, message, args) =>{
    

   let member = message.mentions.members.first();
   
   if(member) {
     
   const avatar = new Discord.RichEmbed()
      
      .setTitle("🖼 Avatar de " + `${member.user.username}`)
      .setDescription(`Clique [aqui](${member.user.avatarURL}) para fazer o download da imagem.`)
      .setImage(member.user.avatarURL)
      .setColor("#4a2aed")
      .setFooter("Atlantic")
   
      message.channel.send(avatar)
   
   } else {
      
   const avatar = new Discord.RichEmbed()
      .setTitle("🖼 Avatar de " + `${message.author.username}`)
      .setDescription(`Clique [aqui](${message.author.avatarURL}) para fazer o downlaod do seu avatar.`)
      .setImage(message.author.avatarURL)
      .setColor("#4a2aed")
      .setFooter("Atlantic")
   
      message.channel.send(avatar)
      
   }
}
