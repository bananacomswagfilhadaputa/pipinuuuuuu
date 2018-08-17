exports.run = function (bot, msg, args) {
    if (args.length < 1) {
        throw 'Você deve escrever algo, burro';
    }
    msg.edit(args.join(' ').split('').reverse().join(''));
};
