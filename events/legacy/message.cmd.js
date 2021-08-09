const fs = require('fs');
module.exports = async (client, message) => {
	// if (true) return;
	if (message.author.bot || message.channel.type === 'dm') return;


/*	const rawdata = fs.readFileSync('./caches/cache.json', (err) => {
		if (err) {
			console.log (err);
			return message.channel.send(`${client.emotes.error} Error Interno Del Bot, Vuelve a intentarlo mas Tarde`);
		}
	});
	const cachef = JSON.parse(rawdata);

	function srchcache(cache, id) {
		for (let i = 0; i < cache.length; i++) {
			// console.log(`readcache || ${i} -> fileindex , ${cache[i].serverid} -> server id `)
			if (cache[i].serverid === id) {
				return cache[i];
			}
		}
	}

	const resultcache = srchcache(cachef.serverprefixes, message.guild.id);
*/
	let prefix = client.config.discord.prefix;

//	if(typeof resultcache != 'undefined')prefix = resultcache.prefix;

	if (message.content.indexOf(prefix) !== 0) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();


	const cmd = client.commands.get(command) || client.commands.find(c => c.aliases && c.aliases.includes(command));

	if (cmd) {

		cmd.execute(client, message, args, prefix);
		console.log(prefix, command, args, message.guild.name);

	}
};