
exports.run = (client, message, args) => {
    let texto = args.slice(0).join(' ');

  if(texto.length > 10) return message.channel.send("Escreva somente 10 letras.")
  message.channel.send({
    "embed": {
        "title": ` `,
        "description": ` Minecraft`,
        "url": "",
        "color": 3553598,  
        "timestamp": new Date(),
        "footer": {
            "icon_url": message.author.displayAvatarURL,
            "text": message.author.username
        },
        "image": {
            "url": `https://www.minecraftskinstealer.com/achievement/a.php?i=38&h=${encodeURIComponent("Atlantic")}&t=${encodeURIComponent(texto)}`
        },
    }
})

