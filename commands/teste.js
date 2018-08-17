exports.run = function (bot, msg, args) {
    if (args.length < 1) {
        throw 'Escreva algo bro';
    }
    msg.edit(args.join(' ').split('').reverse().join(''));
};

exports.info = {
    name: 'reverse',
    usage: 'reverse <text>',
    description: 'Reverses the text you input'
};
