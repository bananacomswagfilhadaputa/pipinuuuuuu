const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const fs = require('fs');
const superagent = require("superagent");
const bot = new Discord.Client({fetchAllMembers: true});
const client = new Discord.Client();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');

var hoje = new Date();
            var dd = hoje.getDate();
            var mm = hoje.getMonth()+1;
            var hh = hoje.getHours()-3;
            var min = hoje.getMinutes();
            var ss = hoje.getSeconds();
            var yyyy = hoje.getFullYear();
            if(dd<10){
                dd = '0'+dd;
            }
            if (mm<10) {
                mm = '0'+mm;
            }
            if (hh<10){
		if(hh<01){
		    hh = 3+hh;
		}
                hh = '0'+hh;
            }
            if (min<10){
                min = '0'+min;
            }
            var hoje = dd+ '/' +mm+ '/' +yyyy + ' às ' + hh + ':' + min;
	    var hojee = dd+ '/' +mm+ '/' +yyyy;

var prefix = "!";

client.on("ready", () => {
	
    client.channels.get('482685417934815244').send(':grinning:  | O bot foi reiniciado com sucesso!\n\nData: ' + hoje).then(msg => {
    	msg.delete(50000)
    })
	    
    const activities = ['no mc-atlantic.tk', 'no Atlantic', 'criado por Paosz#5829']
    let counter = 0
    setInterval(function() {
        client.user.setGame(activities[counter], "https://twitch.tv/paoszzz")
        counter+= 1
        counter %= activities.length
    }, 10000)
});


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

  let role = member.guild.roles.find('name', 'Não verificado');

  let embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setThumbnail(avatar)
      .addField('Bem vindo ao discord.', `Bem vindo(a) ${member} ao discord oficial do Atlantic!\n Você foi o __${member.guild.memberCount}__ player a entrar em nosso servidor\n \nPara interagir com os player vá em: #💭chat\nPara ver os nossos anúncios vá em: #📣avisos\n \nAcesse já o servidor: mc-atlantic.tk`)
      .setFooter(`Atlantic`);
      client.channels.get('461946622675255296').send(embed);
      member.addRole(role)
})

bot.on('warn', console.warn);

bot.on('error', console.error);

bot.on('ready', () => console.log('Função de música funcionando!'));

bot.on('disconnect', () => console.log('Eu apenas desconectei, mais já estou reconectando agora...'));

bot.on('reconnecting', () => console.log('Estou me reconectando agora!'));

bot.on('message', async msg => { // eslint-disable-line
	if (msg.author.bot) return undefined;
	if (!msg.content.startsWith(PREFIX)) return undefined;

	const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);

	let command = msg.content.toLowerCase().split(' ')[0];
	command = command.slice(PREFIX.length)

	if (command === `play`) {
		const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) return msg.channel.send('Me desculpe, mas você precisa estar em um canal de voz para tocar música!');
	//	const permissions = voiceChannel.permissionsFor(msg.Client.user);
	//	if (!permissions.has('CONNECT')) {
	//		return msg.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
	//	}
	//	if (!permissions.has('SPEAK')) {
	//		return msg.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
	//	}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			return msg.channel.send(`✅ Playlist: **${playlist.title}** foi adicionado à lista!`);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
					msg.channel.send(`__**RESULTADO DA PESQUISA**__\n${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}\n`+"`Forneça um valor para selecionar um dos resultados da pesquisa que vão de 1 a 10.`");
					// eslint-disable-next-line max-depth
					try {
						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 20000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return msg.channel.send('Você não respondeu a `Seleção de músicas` e o tempo acabou.');
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return msg.channel.send('Não consegui obter nenhum resultado de pesquisa.');
				}
			}
			return handleVideo(video, msg, voiceChannel);
		}
	} else if (command === 'skip') {
		if (!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.channel.send("Apenas pessoas com a permissão de `Gerenciar mensagens` tem acesso a esse comando.");
		if (!msg.member.voiceChannel) return msg.channel.send('Você não está em um canal de voz!');
		if (!serverQueue) return msg.channel.send('Não há nada tocando que eu possa pular para você.');
		serverQueue.connection.dispatcher.end('O comando Skip foi usado!');
		return undefined;
	} else if (command === 'stop') {
		if (!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.channel.send("Apenas pessoas com a permissão de `Gerenciar mensagens` tem acesso a esse comando.");
		if (!msg.member.voiceChannel) return msg.channel.send('Você não está em um canal de voz!');
		if (!serverQueue) return msg.channel.send('Não há nada que eu possa fazer para você.');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('O comando de parada foi usado!');
		return undefined;
	} else if (command === 'volume') {
		if (!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.channel.send("Apenas pessoas com a permissão de `Gerenciar mensagens` tem acesso a esse comando.");
		if (!msg.member.voiceChannel) return msg.channel.send('Você não está em um canal de voz!');
		if (!serverQueue) return msg.channel.send('Não há nada Tocando.');
		if (!args[1]) return msg.channel.send(`O volume atual é: **${serverQueue.volume}**`);
		serverQueue.volume = args[1];
		serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
		return msg.channel.send(`Eu ajustei o volume para: **${args[1]}**`);
	} else if (command === 'np') {
		if (!serverQueue) return msg.channel.send('Não há nada Tocando.');
		return msg.channel.send(`🎶 Tocando agora: **${serverQueue.songs[0].title}**`);
	} else if (command === 'queue') {
		if (!serverQueue) return msg.channel.send('Não há nada Tocando.');
		return msg.channel.send(`__**Lista de Músicas:**__\n${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}\n\n**Tocando agora:** ${serverQueue.songs[0].title}`);
	} else if (command === 'pause') {
		if (!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.channel.send("Apenas pessoas com a permissão de `Gerenciar mensagens` tem acesso a esse comando.");
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.send('⏸ Música pausada!');
		}
		return msg.channel.send('Não há nada Tocando.');
	} else if (command === 'resume') {
		if (!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.channel.send("Apenas pessoas com a permissão de `Gerenciar mensagens` tem acesso a esse comando.");
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return msg.channel.send('▶ Música não está mais pausada!');
		}
		return msg.channel.send('Não há nada Tocando.');
	}

	return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	console.log(video);
	const song = {
		id: video.id,
		title: video.title,
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`Eu não pude entrar no canal de voz: ${error}`);
			queue.delete(msg.guild.id);
			return msg.channel.send(`Eu não pude entrar no canal de voz: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		else return msg.channel.send(`✅ **${song.title}** foi adicionado à Lista!`);
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'O fluxo não está gerando com rapidez suficiente.') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	serverQueue.textChannel.send(`🎶 Tocando: **${song.title}**`);
}

