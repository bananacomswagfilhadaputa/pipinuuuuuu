const Discord = require("discord.js");

module.exports.run = async (client, message, args) =>{

    message.delete().catch(O_o=>{});
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply("você não tem permissão! :x:").then(msg => msg.delete(6000));
    const comousar = new Discord.RichEmbed()
    .setAuthor("Atlantic", client.user.avatarURL)
    .setDescription(`Ao executar, ira mutar o membro mencionado.`)
    .setColor("4a2aed")
    .setFooter("© Atlantic- Paosz#5829")
    .addField("Como usar:", "`!mute @usuário <motivo>`")
    let member = message.mentions.members.first();
    if(!member)
        return message.channel.send(message.author, comousar).then(msg => msg.delete(10000));


    let motivo = args.slice(1).join(' ');
    if(!motivo) motivo = "Motivo não informado.";
  
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
    
    member.addRole(muterole)

    const mutemsg = new Discord.RichEmbed()
        .setTitle(`${member.user.tag} 🌀 Mutado`)
        .setDescription(`Você foi mutado no servidor **${message.guild.name}**!`)
        .setColor("#4a2aed")
        .setThumbnail(member.user.avatarURL)
        .addField("📋 Motivo:", motivo)
        .setTimestamp()
        .setFooter("Atlantic - Moderação")
     
      
    const mutado = new Discord.RichEmbed()
        .setTitle(`${member.user.tag} 🌀 Mutado`)
        .setDescription(`**${member.user.tag}** foi mutado no servidor!`)
        .setColor("#4a2aed")
        .setThumbnail(message.author.avatarURL)
        .addField("👮 Autor:", message.author)
        .addField("📋 Motivo:", motivo)
        .setTimestamp()
        .setFooter("Atlantic - Moderação")
        
    if(message.guild.channels.find("name", "punidos")){
        let guild = message.guild.channels.find("name", "punidos");   
        guild.send(mutado).catch(O_o=>{});
        member.send(mutemsg).catch(O_o=>{});
        message.channel.send(`:white_check_mark: | ${message.author} usuário punido com sucesso!`)
    }else if(message.guild.channels.find("name", "🚫punidos")){
        let guild = message.guild.channels.find("name", "🚫punidos");
        guild.send(mutado).catch(O_o=>{});
        member.send(mutemsg).catch(O_o=>{});
        message.channel.send(`:white_check_mark: | ${message.author} usuário punido com sucesso!`)
    } else if(message.guild.channels.find("name", "punições")){
        let guild = message.guild.channels.find("name", "punições");
        guild.send(mutado).catch(O_o=>{});
        member.send(mutemsg).catch(O_o=>{});
        message.channel.send(`:white_check_mark: | ${message.author} usuário punido com sucesso!`)
    }else if(message.guild.channels.find("name", "🚫punições")){
        let guild = message.guild.channels.find("name", "🚫punições");
        guild.send(mutado).catch(O_o=>{});
        member.send(mutemsg).catch(O_o=>{});
        message.channel.send(`:white_check_mark: | ${message.author} usuário punido com sucesso!`)
    } else {
        message.channel.send(mutado).catch(O_o=>{});
        member.send(mutemsg).catch(O_o=>{});
    }
}
