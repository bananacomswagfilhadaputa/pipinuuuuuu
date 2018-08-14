const Discord = require("discord.js");
const bot = new Discord.Client();
exports.run = (client, message, args) => {
     let reason = args.join(' ');
    if (reason.length < 1) return message.channel.send('Você deve fazer uma pergunta ao bot.');
    var ball = ['É certo.','Nenhuma dúvida sobre isso.','Nenhuma chance.','Talvez, o tempo dirá.','De jeito nenhum.','Concentre-se e tente novamente.', ' Como eu vejo, sim', 'Provavelmente', 'Melhor não te dizer agora', 'Minhas fontes dizem não', 'Sinais apontam que sim', 'Sim, definitivamente', 'è decididamente assim', 'Como eu vejo, sim', 'Minhas fontes dizem não', 'Minhas fontes dizem não', 'Muito duvidoso'];
    const embed = new Discord.RichEmbed()
    .setColor(0x00A2E8)
    .addField("Pergunta:", reason)
    .addField("Resposta:", ball[Math.floor(Math.random () * ball.length)])
    .setThumbnail("https://cdn.discordapp.com/attachments/446536866724839424/457330911172755464/thonkputo.png")
    message.channel.send({embed})
}
   
