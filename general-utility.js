// Commands anyone can send
module.exports = {
	receiveMessage: (message, server) => {
		var fullCommand = msg.content.split(" ");
		switch(fullCommand[0].toLowerCase()) {
			case "#!settimezone":
				setTimezone(msg, fullCommand, server);
				break;
			default:
		}
	}
}

setTimezone = (msg, fullCommand, server) => {
	var userToSetRole = server.members.find(member => member.id === msg.author.id);
	if (!fullCommand[1].match(/^(GMT[+|-]((?:[0-9]|1[0-1])?|12))$/g) || userToSetRole == null)
		return
	var role = server.roles.find(guildRole => guildRole.name === fullCommand[1]);
	if (role) {
		// The role exists so assign it
		userToSetRole.addRole(role).then(msg.channel.send(`Role ${role.name} was assigned to ${userToSetRole.displayName}`));
	} else {
		// Role doesn't exist create it
		server.createRole({
			name: fullCommand[1]
		}).then(roleAssign => {
			userToSetRole.addRole(roleAssign);
			msg.channel.send(`Role ${roleAssign.name} was created and assigned to ${userToSetRole.displayName}`);
		});
	}
}