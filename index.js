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
