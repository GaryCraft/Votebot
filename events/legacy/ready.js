module.exports = async (client) => {
    console.log('bot running');
    console.log(`Connected as ${client.user.username}. Ready on ${client.guilds.cache.size} servers, with ${client.users.cache.size} users`);

    client.user.setActivity(client.config.discord.activity,{ type: 'LISTENING' });

};