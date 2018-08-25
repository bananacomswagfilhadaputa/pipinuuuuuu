const gifSearch = require("gif-search");

exports.run = (client, message, args) => {

        gifSearch.random("dog").then(
            gifUrl => message.channel.sendMessage({
                "embed": {
                    "title": ":heart_eyes_cat: Olha que cachorro fofo :3",
                    "color": 55512,
                    "timestamp": new Date(),
                    "footer": {
                        "icon_url": message.author.displayAvatarURL,
                        "text": message.author.username
                    },
                    "image": {
                        "url": gifUrl
                    }
                }
            })
        );

}