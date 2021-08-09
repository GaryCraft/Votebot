const fs = require('fs');
const { Collection, Client, Intents } = require('discord.js');
require('dotenv').config()

const client = new Client({ disableMentions: 'everyone',
	intents: [
		Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_VOICE_STATES,
	] });



client.config = require('./config');

client.commands = new Collection();



fs.readdirSync('./commands').forEach(dirs => {
	const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

	for (const file of commands) {
		const command = require(`./commands/${dirs}/${file}`);
		console.log(`Loading command ${file}`);
		client.commands.set(command.name.toLowerCase(), command);
	}
});

fs.readdirSync('./events').forEach(dirs => {
	const events = fs.readdirSync(`./events/${dirs}`).filter(files => files.endsWith('.js'));

	for (const file of events) {
		const event = require(`./events/${dirs}/${file}`);
		console.log(`Loading event ${file}`);
		client.on(file.split('.')[0], event.bind(null, client));

	}
});


if(!client.customAPIs)client.customAPIs = new Object();

fs.readdirSync('./APIs/').forEach(dirs => {
	const apis = fs.readdirSync(`./APIs/${dirs}`).filter(files => files.endsWith('.js'));

	for (const file of apis) {
		client.customAPIs[`${file}`] = require(`./APIs/${dirs}/${file}`);
		console.log(`Loading API ${file}`);
		if(client.customAPIs[`${file}`].requireclient) {
			client.customAPIs[`${file}`].startAPI(client);
		}
	}
});



client.login(`${process.env['Discord_TOKEN']}`);