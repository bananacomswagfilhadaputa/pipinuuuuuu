const Discord = require("discord.js");

module.exports.run = async (client, message, args) =>{

    message.delete().catch(O_o=>{});
    if(!message.member.hasPermission('BAN_MEMBERS')) return message.reply(`você não tem permissão!`).then(msg => msg.delete(6000));
    const comousar = new Discord.RichEmbed()
      .setAuthor("Atlantic - Punições", client.user.avatarURL)
      .setDescription(`Ao executar, ira banir o membro mencionado.`)
      .setColor("#4a2aed")
      .setFooter("© Atlantic - Paosz#5829")
      .addField("Como usar:", "`!ban @usuário <motivo>`")
     let member = message.mentions.members.first();
    if(!member)
        return message.channel.send(message.author, comousar).then(msg => msg.delete(10000));
     if(!member.bannable) 
        return message.reply(", :x: eu não posso banir esse usuário, pois o cargo dele é maior que o meu.");

    let motivo = args.slice(1).join(' ');
    if(!motivo) motivo = "Motivo não informado.";
  
    await member.ban(`👮 Autor do banimento: ${message.author.tag} 📋 Motivo: ` + motivo)
        .catch(error => message.reply(`Desculpa ${message.author}, eu não poderia banir por causa de: \```js\n${error}\````));
      
      
    const banmsg = new Discord.RichEmbed()
        .setTitle(`${member.user.tag} | 🌀 Banido`)
        .setDescription(`Você foi banido do servidor *${message.guild.name}*!`)
        .setColor("#4a2aed")
        .addField("📋 Motivo:", motivo)
        .setTimestamp()
        .setFooter("Atlantic - Moderação")
     
      
    const banido = new Discord.RichEmbed()
        .setTitle(`${member.user.tag} || 🌀| Banido`)
        .setDescription(`**${member.user.tag}** foi banido do servidor! `)
        .setColor("#4c0000")
        .setThumbnail(message.author.avatarURL)
        .addField("👮| Autor:", message.author)
        .addField("📋| Motivo:", motivo)
        .setTimestamp()
        .setFooter("Toxic - Moderação")

    if(message.guild.channels.find("name", "punidos")){
        let guild = message.guild.channels.find("name", "punidos");   
        guild.send(banido).catch(O_o=>{});
        member.send(banmsg).catch(O_o=>{});
        message.channel.send(`:white_check_mark: | ${message.author} usuário punido com sucesso!`)
    }else if(message.guild.channels.find("name", "🚫punidos")){
        let guild = message.guild.channels.find("name", "🚫punidos");
        guild.send(banido).catch(O_o=>{});
        member.send(banmsg).catch(O_o=>{});
        message.channel.send(`:white_check_mark: | ${message.author} usuário punido com sucesso!`)
    } else if(message.guild.channels.find("name", "punições")){
        let guild = message.guild.channels.find("name", "punições");
        guild.send(banido).catch(O_o=>{});
        member.send(banmsg).catch(O_o=>{});
        message.channel.send(`:white_check_mark: | ${message.author} usuário punido com sucesso!`)
    }else if(message.guild.channels.find("name", "🚫punições")){
        let guild = message.guild.channels.find("name", "🚫punições");
        guild.send(banido).catch(O_o=>{});
        member.send(banmsg).catch(O_o=>{});
        message.channel.send(`:white_check_mark: | ${message.author} usuário punido com sucesso!`)
    } else {
        message.channel.send(banido)
        member.send(banmsg).catch(O_o=>{});
    }
}