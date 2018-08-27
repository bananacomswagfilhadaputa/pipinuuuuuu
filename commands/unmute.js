const Discord = require("discord.js");

module.exports.run = async (client, message, args) =>{

    message.delete().catch(O_o=>{});
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(`você não tem permissão!`).then(msg => msg.delete(6000));
    const comousar = new Discord.RichEmbed()
    .setAuthor("Atlantic", client.user.avatarURL)
    .setDescription(`Ao executar, ira desmutar o membro mencionado.`)
    .setColor("#4a2aed")
    .setFooter("© Atlantic - Paosz#5829")
    .addField("Como usar:", "`!unmute @usuário`")
    let member = message.mentions.members.first();
    if(!member)
        return message.channel.send(message.author, comousar).then(msg => msg.delete(10000));


  
    let muterole = message.guild.roles.find("name", "✖ Mutado");
    if(!muterole){
        try {
            muterole = await message.guild.createRole({
                name: "✖ Mutado",
                color: "#000000",
                permissions: []
            });
            message.guild.channels.forEach(async (channel, id) =>{
                await channel.overwritePermissions(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTION: false,
                    CONNECT: false
                });
            });
        } catch (a) {
            console.error(a.stack);
        }
    }
    
    member.removeRole(muterole)

    const desmutemsg = new Discord.RichEmbed()
        .setTitle(`${member.user.tag} | Desmutado`)
        .setDescription(`Você foi desmutado no servidor **${message.guild.name}**!`)
        .setColor("#4a2aed")
        .setThumbnail(member.user.avatarURL)
        .setTimestamp()
        .setFooter("Atlantic - Moderação")
     
      
    const desmutado = new Discord.RichEmbed()
        .setTitle(`${member.user.tag} | Desmutado`)
        .setDescription(`**${member.user.tag}** foi desmutado no servidor!`)
        .setColor("#4a2aed")
        .setThumbnail(message.author.avatarURL)
        .addField("👮 Autor:", message.author)
        .setTimestamp()
        .setFooter("Atlantic - Moderação")
        
    if(message.guild.channels.find("name", "punidos")){
        let guild = message.guild.channels.find("name", "punidos");   
        guild.send(desmutado).catch(O_o=>{});
        member.send(desmutemsg).catch(O_o=>{});
        message.channel.send(`:white_check_mark: | ${message.author} usuário despunido com sucesso!`)
    }else if(message.guild.channels.find("name", "🚫punidos")){
        let guild = message.guild.channels.find("name", "🚫punidos");
        guild.send(desmutado).catch(O_o=>{});
        member.send(desmutemsg).catch(O_o=>{});
        message.channel.send(`:white_check_mark: | ${message.author} usuário despunido com sucesso!`)
    } else if(message.guild.channels.find("name", "punições")){
        let guild = message.guild.channels.find("name", "punições");
        guild.send(desmutado).catch(O_o=>{});
        member.send(desmutemsg).catch(O_o=>{});
        message.channel.send(`:white_check_mark: | ${message.author} usuário despunido com sucesso!`)
    }else if(message.guild.channels.find("name", "🚫punições")){
        let guild = message.guild.channels.find("name", "🚫punições");
        guild.send(desmutado).catch(O_o=>{});
        member.send(desmutemsg).catch(O_o=>{});
        message.channel.send(`:white_check_mark: | ${message.author} usuário despunido com sucesso!`)
    } else {
        message.channel.send(desmutado).catch(O_o=>{});
        member.send(desmutemsg).catch(O_o=>{});
    }
}