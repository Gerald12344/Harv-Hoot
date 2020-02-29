const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
        bot.user.setStatus('available')
        bot.user.setPresence({
            game: {
                name: 'Harv-hoot',
                type: "PLAYING",
                url: "http://harvhoot.com"
            }
        });
});
const threshold = 0.7
client.on('message', msg => {
    
});
client.login('NjQyNDgyMjE4NTUxMjE0MDgx.XcXkOg.4qRXnUCjSzZp4ucw1eA7ZE1AOac')
