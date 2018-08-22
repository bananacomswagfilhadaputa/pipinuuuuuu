const Discord = require("discord.js");

module.exports.run = async (client, message, args) =>{

    if(message.channel.id != "461944635808284683") return message.reply(`você não pode executar comandos aqui, vá em <#461944635808284683>`).then(msg => msg.delete(5000))
   message.delete().catch(O_o=>{})
    const ip = new Discord.RichEmbed()
       .setColor("4a2aed")
       .setAuthor("Atlantic")
       
       .setDescription("Aqui você ira encontrar todos os nossos forms.")
       .addField("Formulário para ``Trial``:","https://pastebin.com/SqQJ7k6v")
       
       .setTimestamp()
       .setFooter(`Atlantic - Formulários`)
    
    message.channel.send(message.author , ip)

}