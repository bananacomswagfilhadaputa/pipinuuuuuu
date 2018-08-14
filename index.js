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

  client.on("ready", () => {
    console.log("Ativado.");
     let gameloop = require('./comando_dono/loop.js'); // Ativaidae de status!!!!!!!!!!
      gameloop.run(client);
  })
 
});



client.on('message', message =>{
	if(message.content == '<@473905351784267777>'){
	  const ayy = client.emojis.find("name", "Kally");
	  message.channel.send(`Olá ${message.author}, eu sou o <@478035553934245892> eu sou o BOT oficial da rede AtlanticMC, para saber meus comandos use \`!ajuda\``)
  	}
	if(message.content == '<@473905351784267777> loritta'){
	  message.reply(`...`)
  	}
	if(message.content == '<@473905351784267777> Loritta'){
	  message.reply(`...`)
  	}
	if(message.content == 'Trix melhor bot'){
	  message.reply(`eu sei :3! :relaxed: `)
	  message.react("❤")
  	}
	if(message.content == 'trix melhor bot'){
	  message.reply(`eu sei :3! :relaxed: `)
	  message.react("❤")
  }
  if(message.content == 'rereredsdssd'){
	  message.reply(`mc.motocrack.net `)
  }
  if(message.content == '3232sasda'){
	  message.reply(`é gay! `)
  }
  if(message.content == '32dsdf'){
	  message.reply(`apoio! `)
  }
if(message.content == 'atlanticerwedsdd'){
  message.reply(`Site: http://www.motocrack.net/ \nIP: mc.motocrack.net`)
}
  if(message.content == '<@407365291870257153> Paosz'){
	  message.reply(`O pao é fodaa`)
}
});

client.on('message', message =>{
	if(message.channel.id == "471380281123667969" ){
	   message.react("👍")
	   message.react("👎")
           message.react("👀")
  } 
})

client.on("message", message =>{
  var forbidenWords = [
      
      "Porra", 
      "Caralho",
      "discord.gg", 
      "Rola",
      "porra", 
      "caralho",
      "merda", 
      "zenix", 
      ".comerwe", 
      ".eeewdassa", 
      ".com.br", 
      "Bucetao",
      "bucetao",
      "MushMC",
      "mushmc",
      "mush",
      "Sky",
      "bucetinha",
      "preto",
      "filha da puta",
      'cuzao',
      "lothus",
      "discord.me",
      "buceta",
      "twerdfs",
      "instagram.com",
      "eerweddee"
  ];
              
  for (var i = 0; i < forbidenWords.length; i++) {
  if (message.content.includes(forbidenWords[i])) {
    message.delete();
    break;
  
}
}
});

client.on('guildMemberAdd', member => {
  let avatar = member.user.avatarURL

  let role = member.guild.roles.find('name', 'Membro');

  let embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setThumbnail(avatar)
      .addField('Bem vindo jogador.', `Seja bem vindo ``${member}`` ao Discord do Atlantic!\n Você foi o __${member.guild.memberCount}__ player a entrar em nosso servidor\n`)
      .setFooter(`Pao - Suporte`);
      client.channels.get('461946622675255296').send(embed);
      member.addRole(role)

})



client.login(process.env.BOT_TOKEN);
