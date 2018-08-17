const ping = require('mc-hermes');
const Discord = require('discord.js');

exports.run = (client, msg, args) => {
    const emb = new Discord.RichEmbed();
    const query = args.join(" ");
    if(query.startsWith("server")) {
        ip = query.replace('server', '').trim();
        if(!ip) {
            msg.channel.startTyping();
            emb.setColor('#F03A17');
            emb.addField('Esse IP não é válido.', 'Aqui vai um IP de exemplo: `mc.motocrack.net`');
            emb.setFooter(msg.author.tag, msg.author.avatarURL);
            msg.channel.stopTyping();
            msg.channel.send({embed:emb});
        }
        var url = 'https://mcapi.de/api/image/favicon/'+ip
        ping.pc({ server: ip }).then(async function(data) {
            await msg.channel.startTyping();
            await emb.setColor('#44FC37');
            await emb.setAuthor(':thinking:| Informações '+ip, url);
            await emb.addField(':hammer_pick: | Versão', data.version.name);
            await emb.addField(':video_game:| Players jogando', data.players.online+" no total de  "+data.players.max);
            await emb.setThumbnail(url);
            await emb.setFooter(msg.author.tag, msg.author.avatarURL);
            await msg.channel.stopTyping();
            await msg.channel.send({embed:emb});
        }).catch(async function(err) {
            await msg.channel.startTyping();
            await emb.addField('Um erro aconteceu...', err);
            await emb.setColor('#F03A17');
            await emb.setFooter(msg.author.tag, msg.author.avatarURL);
            await msg.channel.stopTyping();
            await msg.channel.send({embed:emb});
        });
      
    
} else if(!args[0]) {
    msg.channel.startTyping();
    emb.setColor('#44FC37');
    emb.setAuthor('Comandos de minecraft', 'https://media.discordapp.net/attachments/264445053596991498/366656518524895232/unknown.png', 'https://minecraft.net');
    emb.setThumbnail('https://media.discordapp.net/attachments/264445053596991498/366656518524895232/unknown.png');
    emb.addField('`t!minecraft server`', "Serve para buscar informações sobre servidores.\nUse: t!minecraft server <ip>");
    emb.setFooter(msg.author.tag, msg.author.avatarURL);
    msg.channel.stopTyping();
    msg.channel.send({embed:emb});
}



}
