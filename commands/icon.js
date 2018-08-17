module.exports.run = async (bot, message, args) => {
	let msg = await message.channel.send("Pegando icon...");

	if(!message.guild.iconURL) return msg.edit("Esse servidor não possui icon.");

	await message.channel.send({files: [
		{
			attachment: message.guild.iconURL,
			name: "icon.png"
		}
	]});

	msg.delete();
}

module.exports.help = {
	name: "icon"
}