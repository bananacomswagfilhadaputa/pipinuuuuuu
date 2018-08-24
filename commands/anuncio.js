const Discord = require('discord.js');
const bot = new Discord.Client({disableEveryone: false});

module.exports.run = (bot, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(message.author.toString() + "desculpe, apenas administradores podem usar esse comando");
    const msg = args.join(" ");
    message.delete().catch();

  bot.channels.get('478995804711813150').send({
    "embed": {
        "author": { 
            "name": "Atlantic - Logs",
            "icon_url": "https://cdn.discordapp.com/attachments/444946317018529804/466307134393548810/Chest.gif"
        },
        "description": `<@${message.author.id}> enviou um aviso no canal: <#${message.channel.id}> contendo a mensagem: \`\`\`${msg}\`\`\``,
        "color": 3553598,  
        "timestamp": new Date(),
        "footer": {
            "icon_url": 'https://cdn.discordapp.com/attachments/444946317018529804/466307134393548810/Chest.gif',
            "text": "Atlantic - Logs"
        },
    }
  })
  message.channel.send("@everyone")
  message.channel.send({
    "embed": {
        "author": { 
            "name": "Atlantic - Anúncios",
            "icon_url": "https://images-ext-1.discordapp.net/external/b_2_TI_xAnWjCi-Z4xFJLPl3zL0RZDGqgPaE8Xi3Uz0/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/478035553934245892/77286441cbc00ae41650e225777ba98c.png?width=559&height=559",
            "url": "https://discord.gg/H5zPMJ"
        },
        "description": msg,
        "color": 3553598,  
        "timestamp": new Date(),
        "footer": {
            "icon_url": 'https://images-ext-1.discordapp.net/external/b_2_TI_xAnWjCi-Z4xFJLPl3zL0RZDGqgPaE8Xi3Uz0/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/478035553934245892/77286441cbc00ae41650e225777ba98c.png?width=559&height=559',
            "text": "Atlantic - Anúncios"
        },
    }
})
}

module.exports.help = {
    name: "aviso"
}
