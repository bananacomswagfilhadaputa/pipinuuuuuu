const Discord = require('discord.js');
module.exports.run = async (client, message, args) => {
    message.delete().catch(O_o=>{});
    const msg1 = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL)
    .setDescription(`${message.author.username} selecione alguma categoria para ver o comando.
🎥 **»** Relacionados ao YouTube
🔨 **»** Relacionados à Equipe
💸 **»** Relacionados ao VIP
🎲 **»** Geral`)
    message.member.send(msg1).then(msg=> {
        msg.react("🔨").then(r => {
            msg.react("🎥")
            msg.react("💸")
            msg.react("🎲");

            const equipe = (reaction, user) => reaction.emoji.name === '🔨' && user.id === message.author.id;
            const yt = (reaction, user) => reaction.emoji.name === '🎥' && user.id === message.author.id;
            const vip = (reaction, user) => reaction.emoji.name === '💸' && user.id === message.author.id;
            const geral = (reaction, user) => reaction.emoji.name === "🎲" && user.id === message.author.id;

            const eqp = msg.createReactionCollector(equipe, { time: 60000 });
            const ytb = msg.createReactionCollector(yt, { time: 60000 });
            const vp = msg.createReactionCollector(vip, { time: 60000 });
            const grl = msg.createReactionCollector(geral, { time: 60000});


            eqp.on('collect', r=> {
                const embed = new Discord.RichEmbed()
                .setAuthor("🔨 Equipe")
                .setDescription(`*Algumas informações*
\n**P:** Onde faço o formulário?
**R:** [Clique aqui](https://pastebin.com/SqQJ7k6v) e preencha o formulário de __Trial__.
**P:** Onde/Quando recebo a resposta?
**R:** Se for aceito, será respondido em menos de 72 horas por mensagem privada no Discord.`)
                message.member.send({embed: embed}).then(a=>a.delete(15000));
            })
            ytb.on('collect', r=>{
                const ytb = new Discord.RichEmbed()
                .setAuthor("🎥 YouTube")
                .setDescription(`*Algumas informações*
\n**P:** Quais são os requisitos para a tag **YT**?\n
**R:** VIP __Delta__:

Frequência de vídeos: De 1 á 2 vídeos por semana (frequência de vídeos no servidor, aumentará chances de promover a TAG)
Mínimo de views: 700 views
Mínimo de likes: 75 likes
Tempo de ausência: Se passar mais de 2 semanas sem gravar 1 vídeo no server, terá sua tag retirada!\n
__Youtuber__

Frequência de vídeos: De 1 á 2 vídeos por semana (frequência de vídeos no servidor, aumentará chances de promover sua TAG)
Mínimo de views: 1,5 K de views
Mínimo de likes: 150 likes
Tempo de ausência: Se passar mais de 2 semanas sem gravar 1 vídeo no server, terá sua tag retirada!\n
Youtuber __Plus__

Frequência de vídeos: De 1 á 2 vídeos por semana (frequência de vídeos no servidor, aumentará chances de promover sua TAG)
Mínimo de views: 4 K de views
Mínimo de likes: 300 likes
Conhecimento mínimo: Saber sobre hacks e fazer um pequeno formulário!
Tempo de ausência: Se passar mais de 2 semanas sem gravar 1 vídeo no server, terá sua tag retirada! (Sem justificativa no chat de ausência da equipe, será demotado)\n
Para soliciar tua tag, contate o <@327949757593026562>!`)
                message.author.send({ embed: ytb }).then(a=>a.delete(15000));
            })
            vp.on('collect', r=>{
                const vp = new Discord.RichEmbed()
                .setAuthor("💸 VIP")
                .setDescription(`*Algumas informações*
\n**P:** Onde posso comprar os VIP's?
**R:** Em breve.
**P:** Quais são os preços dos VIP's?
**R:**Em breve.`)
                message.author.send({ embed: vp }).then(a=>a.delete(15000));
            })
            grl.on('collect', r=>{
                const glr = new Discord.RichEmbed()
                .setAuthor("🎲 Geral")
                .setDescription(`*Algumas informações*
\nUse __!ajuda__ para saber os comandos do servidor.
Use __!ban [@]__ para banir um usuário.
Use __kick [@]__ para kickar um usuário.
Use __!warn [@]__ para dar um aviso em um usuário.
Use __!warns [@]__ para ver os warns de um usuário.
Use __!cachorro__ para ver um gif fofo de cachorro.
Use __!anuncio__ para realizar um anúncio.
Use __!aplicar__ para ver o(s) formulários do servidor.
Use __!arte__ para escrever uma mensagem em ascii.
Use __!ask__ para fazer uma pergunta ao bot.
Use __!avatar [@]__ para ver a foto de um usuário.
Use __!changelog__ para postar uma changelog.
Use __!chat__ para desligar/ligar o chat.
Use __!clima [Cidade]__ para ver o clima de uma cidade.
Use __!hentai__ para ver uma loli nua xDD.
Use __!ipinfo [ip]__ para ver as informações de um servidor (minecraft).
Use __!legit [@]__ para ver se o player
Use __!limpar [2 á 100]__ para limpar o chat.
Use __!piada__ para rir um pouquinho com as piadas mais bostas.
Use __!say [msg] fale como se fosse o bot.
Use __!serverinfo__ para ver as informações do servidor.
Use __!sugestão [sugestão]__ para   enviar uma sugestão.
Use __!vote [msg]__ para iniciar uma votação.`)
                message.author.send({ embed: glr }).then(a=>a.delete(15000));
            })

        })
    })
}

module.exports.help = {
    name: "ajuda"
}