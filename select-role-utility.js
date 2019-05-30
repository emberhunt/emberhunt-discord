module.exports = {
	receiveMessage: (message, server) => {
		var fullCommand = message.content.split(" ");
		switch(fullCommand[0].toLowerCase()) {
			case "#!settimezone":
				//setTimezone(msg, fullCommand, server);
				break;
			default:
				setTimezoneSimple(message, server);
		}
	}
}

setTimezoneSimple = (msg, server) => {
	var userToSetRole = server.members.find(member => member.id === msg.author.id);
	if (!msg.content.match(/^([+|-]((?:[0-9]|1[0-1])?|12))$/g) || userToSetRole == null)
		return
	var role = server.roles.find(guildRole => guildRole.name === "GMT" + msg.content);// Check to see if a GMT role already exists for the user and delete it
	var currentRole = userToSetRole.roles.find(guildRole => guildRole.name.match(/^(GMT[+|-]((?:[0-9]|1[0-1])?|12))$/g));
	if (currentRole)
		userToSetRole.removeRole(currentRole).catch(console.error);
	if (role) {

		// The role exists so assign it
		userToSetRole.addRole(role).then(msg.delete().then(msg => console.log(`Deleted message from ${msg.author.username}`)).catch(console.error));
	} else {
		// Role doesn't exist create it
		server.createRole({
			name: "GMT" + msg.content
		}).then(roleAssign => {
			userToSetRole.addRole(roleAssign).then(msg.delete().then(msg => console.log(`Deleted message from ${msg.author.username}`)).catch(console.error));
		});
	}
}