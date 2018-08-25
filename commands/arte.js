const Discord = require("discord.js");
const arte = require("ascii-art");
const bot = new Discord.Client({disableEveryone: false});

module.exports.run = async (bot, message, args) => {

    if(!args.join(' ')) return message.reply(`Você precisa colocar alguma mensagem.`).then(msg => msg.delete(5000));

    arte.font(args.join(' '), 'Doom', function(rendered) {
        rendered = rendered.trimRight().then(msg => msg.delete(5000));

        if (rendered.lenght > 2000) return message.reply("Esta mensagem é muito longa.").then(msg => msg.delete(3000));

        message.channel.send(rendered, {
            code: 'md'
        });
    });

}

module.exports.help = {
    name: "arte"
  }