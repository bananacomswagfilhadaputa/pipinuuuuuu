const Discord = require('discord.js');

exports.run = async (client, message, args, prefix) => {
    
    const comousar = new Discord.RichEmbed()
        .setAuthor("Atlantic", client.user.avatarURL)
        .setTitle(`!cargoadd`)
        .setDescription(`Dê um cargo ao membro mencionado.`)
        .setColor("#22a7cc")
        .setFooter("Atlantic")

    let rolename = args.join(' ');
    if(!rolename) return message.channel.send(message.author, comousar).then(msg => msg.delete(10000));

    if(!message.guild.roles.find("name", rolename)) return message.channel.send(`Cargo adicionado com sucesso.`)

    let role = message.guild.roles.find("name", rolename);

    const embedid = new Discord.RichEmbed()
        .setDescription(`Cargo: ${role} - ID: ${role.id}\nCor (HEX): ${role.hexColor}`)
        .setColor(role.color)

    message.channel.send(message.author, embedid)

}

exports.help = {
    name: "roleid",
    aliases: [
        'cargoid'
    ]
}
