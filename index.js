const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const fs = require('fs');
 
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});
client.on("message", message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(config.prefix)) return;
 
  let command = message.content.split(" ")[0];
  command = command.slice(config.prefix.length);
 
  let args = message.content.split(" ").slice(1);
  // The list of if/else is replaced with those simple 2 lines:
 
  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, message, args);
  } catch (err) {
    console.error(err);
  }
 
});

client.on('guildMemberAdd', member => {
  let avatar = member.user.avatarURL

  let role = member.guild.roles.find('name', 'Membro');

  let embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setThumbnail(avatar)
      .addField('Bem vindo ao discord.', `Bem vindo(a) ${member} ao discord oficial do Atlantic!\n Você foi o __${member.guild.memberCount}__ player a entrar em nosso servidor\n \nPara interagir com os player vá em: #💭chat\nPara ver os nossos anúncios vá em: #📣avisos\n \nAcesse já o servidor: mc-atlantic.tk`)
      .setFooter(`Atlantic`);
      client.channels.get('461946622675255296').send(embed);
      member.addRole(role)
})

client.on('message', message => {
  if(message.content.toLowerCase() === '!criador')
  message.channel.send('Meu criador é o <@407365291870257153>');

});

client.on("message", message => {

  if(message.content.startsWith("!criar")) {
      message.author.send("Sua sala foi criada, use !adicionar <nick> para adicionar alguém nela").then(msg => msg.delete(8000));
      message.channel.send(message.author + ", sua sala foi criada, você tem 15 segundos para entrar nela, se não ela sera removida.").then(msg => msg.delete(8000));
      message.delete();

      message.guild.createRole({"name":message.author.username}).then(a =>{
          message.guild.members.get(message.author.id).addRole(a)
          message.guild.createChannel(message.author.username,'voice').then(b =>{
          var da = message.guild.roles.find("name","@everyone")
          b.overwritePermissions(da,{
          CONNECT: false,
          VIEW_CHANNEL: true
          
          })
          b.overwritePermissions(a,{
              VIEW_CHANNEL: true,
              CONNECT:true
          })
          message.member.setVoiceChannel(b)
      var o = setInterval(() =>{
      if (b.members.size == 0){
      b.delete()
      a.delete()
      clearInterval(o)
}

},1000 * 30)

          })
          
      
  })

  client.on("message", message => {
      if (message.content.startsWith("!adicionar")) {
          let member = message.mentions.members.first();
          if (message.mentions.users.size < 1) return message.channel.send("você deve mencionar alguém!").then(msg => msg.delete(8000));
          message.author.send("O ``" + member.displayName + "`` foi adicionado em sua sala!").then(msg => msg.delete(8000));
          message.channel.send(member + " Voce foi adicionado da sala do ``" + message.author + "`` basta você entrar!").then(msg => msg.delete(8000));
          var cargo = message.guild.roles.find('name',message.author.username)
          if (cargo == null) return;

          message.guild.members.get(message.mentions.users.first().id).addRole(cargo)
      
  }
})
  }
})

client.on('message', message =>{
  if(message.content.includes("https://discord.gg/")){
      message.delete()
    message.channel.send(`${message.author}, não divulgue links de outros servidores!`)
  }
})
client.on('message', message =>{
  if(message.content.includes("https://discord.me/")){
      message.delete()
    message.channel.send(`${message.author}, não divulgue links de outros servidores!`)
  }
})




client.login(process.env.BOT_TOKEN);
