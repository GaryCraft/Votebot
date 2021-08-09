module.exports = {
	name: 'help',
	aliases: ['h'],
	category: 'Core',
	utilisation: '{prefix} help <command name or alias>',
	desc: 'Classic help command',

	async execute(client, message, args, prefix) {
		if (!args[0]) {
			const nuclei = message.client.commands.filter(x => x.category == 'Core').map((x) => '`' + x.name + '`').join(', ');
			const config = message.client.commands.filter(x => x.category == 'Config').map((x) => '`' + x.name + '`').join(', ');
			

			message.channel.send({
				embed: {
					color: 'RANDOM',
					title: 'Help Menu',
					fields: [
						{ name: 'Ayuda:', value: nuclei },
						{ name: 'Config Commands:', value: config },

					],
					timestamp: new Date(),
				},
			});
		}
		else {
			const command = message.client.commands.get(args.join(' ').toLowerCase()) || message.client.commands.find(x => x.aliases && x.aliases.includes(args.join(' ').toLowerCase()));

			if (!command) return message.channel.send(`Error - Command not found !`);

			message.channel.send({
				embed: {
					color: 'RANDOM',
					title: 'Specific Help Menu',
					fields: [
						{ name: 'Name', value: command.name, inline: true },
						{ name: 'Category', value: command.category, inline: true },
						{ name: 'Aliase(s)', value: command.aliases.length < 1 ? 'None' : command.aliases.join(', '), inline: true },
						{ name: 'Use', value: command.utilisation.replace('{prefix}', `**${prefix}**`), inline: true },
						{ name: 'Description', value: typeof command.desc == 'undefined' ? 'No description' : command.desc, inline: false },
					],
					timestamp: new Date(),
					//description: 'Busque información sobre el comando proporcionado. \n Argumentos obligatorios `[]`, argumentos opcionales `<>`.',
				},
			});
		}
	},
};