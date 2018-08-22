var Discord = require('discord.js')

var cor = "#7401DF"

exports.run = (client,message,args,)=>{
    const moment = require('moment')
    moment.locale('pt-br')
    const msg = message;
    var time = Date.now();
    if (!message.guild.available) return;
    moment.locale('pt-br');


    let guild;

    if (args[0]) {
        guild = client.guilds.get(args[0]);
    } else {
        guild = message.guild;
    }

    let serverRegion = {
        'amsterdam': ':flag_nl: Amsterdã',
        'brazil': ':flag_br: Brasil',
        'eu-central': ':flag_eu: Europa Central',
        'eu-west': ':flag_eu: Europa Ocidental',
        'frankfurt': ':flag_de: Frankfurt',
        'hongkong': ':flag_hk: Hong Kong',
        'japan': ':flag_jp: Japão',
        'london': ':flag_gb: Londres',
        'russia': ':flag_ru: Russia',
        'singapore': ':flag_sg: Singapura',
        'sydney': ':flag_au: Sydney',
        'us-central': ':flag_us: EUA Central',
        'us-east': ':flag_us: EUA Oriental',
        'us-west': ':flag_us: EUA Ocidental',
        'us-south': ':flag_us: EUA Sul',
    }[guild.region];

    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    
     .setFooter(message.author.tag,message.author.avatarURL )
        .setTimestamp(new Date())
    .setColor("4a2aed")
    .setThumbnail(sicon)
    .setTitle(`${message.guild.name}`)
    .addField(`:hammer_pick: Informações sobre o discord`, "Veja as informações do servidor!")

    .addField(":upside_down: __Guild__ __ID__:", message.guild.id , true )
    .addField(":gem: __Dono__ :", message.guild.owner , true )
    .addField(":slight_smile: __Dono__ __ID__:", message.guild.owner.id  , true )
    .addField(":pencil: __Criado__:", message.guild.createdAt , true )
    .addField(":bell: __Região__:", `${serverRegion}` , true)
    .addField(":star: __Emojis__: ", message.guild.emojis.size , true)
    .addField(":radio: __Canais__", message.guild.channels.size, true)
    .addField(":fire: __Membros__:", message.guild.memberCount , true)
.addField(":white_circle:  __Onlines__:", `${guild.members.filter(o => o.presence.status === 'online').size}`, true)
.addField(":o: __Ocupados__:",`${guild.members.filter(dnd => dnd.presence.status === 'dnd').size}`, true)
.addField(":open_mouth: __Ausentes__:", `${guild.members.filter(i => i.presence.status === 'idle').size}`, true) 
.addField(":black_circle:  __Offlines__:", `${guild.members.filter(off => off.presence.status === 'offline').size} `, true)
    
      
    return message.channel.send(serverembed);
}
