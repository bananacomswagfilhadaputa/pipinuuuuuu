const Discord = require("discord.js");
const fs = require("fs");
let warns = require("../util/warnings.json");


module.exports.run = async (client, message, args, prefix) =>{

    message.delete().catch(O_o=>{});
    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply(`você não tem permissão!`).then(msg => msg.delete(6000));
    const comousar = new Discord.RichEmbed()
    .setAuthor("Atlantic - Punições", client.user.avatarURL)
    .setDescription(`Ao executar, ira mandar um alerta ao membro mencionado.`)
    .setColor("#4a2aed")
    .setFooter("© Atlantic - Paosz#5829")
    .addField("Como usar:", "`!warn @usuário <motivo>`")
    let member = message.mentions.members.first();
    if(!member)
        return message.channel.send(message.author, comousar).then(msg => msg.delete(10000));

    let motivo = args.slice(1).join(' ');
    if(!motivo) motivo = "Motivo não informado.";
  
    if(!warns[`${member.user.id}-${message.guild.id}`]) warns[`${member.user.id}-${message.guild.id}`] = {
        warns: 0
    };
     
    warns[`${member.user.id}-${message.guild.id}`].warns++;

    
    fs.writeFile("./util/warnings.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err)
    });
      
    const avisomsg = new Discord.RichEmbed()
        .setTitle(`${member.user.tag} 🔔 Warn`)
        .setDescription(`Você foi avisado no servidor **${message.guild.name}\nAgora você tem ${warns[`${member.user.id}-${message.guild.id}`].warns} avisos!`)
        .setColor("#4a2aed")
        .setThumbnail(member.user.avatarURL)
        .addField("📋 Motivo:", motivo)
        .setTimestamp()
        .setFooter("Atlantic - Moderação")
     
      
    const aviso = new Discord.RichEmbed()
        .setTitle(`${member.user.tag} 🔔 Warn`)
        .setDescription(`__${member.user.tag}__ foi avisado!\nAgora você tem ${warns[`${member.user.id}-${message.guild.id}`].warns} avisos!`)
        .setColor("#4a2aed")
        .setThumbnail(message.author.avatarURL)
        .addField("👮 Autor:", message.author)
        .addField("📋  Motivo:", motivo)
        .setTimestamp()
        .setFooter("Atlantic - Moderação")


    if(warns[`${member.user.id}-${message.guild.id}`].warns == 2){
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
        warns[`${member.user.id}-${message.guild.id}`] = {
            warns: 0
        };

    }

    fs.writeFile("./util/warnings.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err)
    });

    if(message.guild.channels.find("name", "punidos")){
        let guild = message.guild.channels.find("name", "punidos");   
        guild.send(aviso).catch(O_o=>{});
        member.user.send(avisomsg).catch(O_o=>{});
        message.channel.send(`:white_check_mark: | ${message.author} usuário punido com sucesso!`)
    }else if(message.guild.channels.find("name", "🚫punidos")){
        let guild = message.guild.channels.find("name", "🚫punidos");
        guild.send(aviso).catch(O_o=>{});
        member.user.send(avisomsg).catch(O_o=>{});
        message.channel.send(`:white_check_mark: | ${message.author} usuário punido com sucesso!`)
    } else if(message.guild.channels.find("name", "punições")){
        let guild = message.guild.channels.find("name", "punições");
        guild.send(aviso).catch(O_o=>{});
        member.user.send(avisomsg).catch(O_o=>{});
        message.channel.send(`:white_check_mark: | ${message.author} usuário punido com sucesso!`)
    }else if(message.guild.channels.find("name", "🚫punições")){
        let guild = message.guild.channels.find("name", "🚫punições");
        guild.send(aviso).catch(O_o=>{});
        member.user.send(avisomsg).catch(O_o=>{});
        message.channel.send(`:white_check_mark: | ${message.author} usuário punido com sucesso!`)
    } else {
        message.channel.send(aviso).catch(O_o=>{});
        member.user.send(avisomsg).catch(O_o=>{});
    }
}

exports.help = {
    name: "warn",
    aliases: [
        'aviso'
    ]
}