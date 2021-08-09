module.exports = {
	name: 'help',
	aliases: ['h'],
	category: 'Core',
	utilisation: '{prefix} help <command name or alias>',
	desc: 'Classic help command',

	async execute(client, message, args, prefix) {
		message.channel.send('this command is not available yet')
	},
};