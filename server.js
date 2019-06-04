// set up ======================================================================
const Discord = require('discord.js');
const Secret = require("./secret.js");
const ServerComm = require("./server-communication.js");
const BotUtility = require("./bot-utility.js");
const GeneralUtility = require("./general-utility.js");
const SelectRoleUtility = require("./select-role-utility.js");

// Discord stuff ===============================================================
const client = new Discord.Client();

client.on("debug", (m) => console.log("[debug]", m));
client.on("warn", (m) => console.log("[warn]", m));
client.on("error", (m) => console.log("[error]", m));

client.on('ready', () => {
	// Initialization on ready
});

client.on('message', msg => {
	var textChannel = msg.channel;
    var user = msg.author;
    var server = msg.guild;
    if (!user.bot) {
        if (textChannel instanceof Discord.TextChannel) {
	        if (textChannel.name == "server-commands") {
	        	// Game Commands
		        ServerComm.processCommand(msg, user);
		    } else if (textChannel.name == "bot") {
		    	if (!msg.content.startsWith("#!")) return;
		    	// Other Bot Commands
		    	BotUtility.receiveMessage(msg, server);
		    } else if (textChannel.name == "select-role") {
		    	SelectRoleUtility.receiveMessage(msg, server);
		    } else {
		    	if (!msg.content.startsWith("#!")) return;
		    	GeneralUtility.receiveMessage(msg, server);
		    }
		}
    }
});

client.on('guildMemberAdd', member => {

});

String.prototype.hexEncode = function() {
	var hex, i;

    var result = "";
    for (i=0; i<this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
        result += ("000"+hex).slice(-4);
    }

    return result
}

client.on('messageReactionAdd', (messageReaction, user) => {
	/*
	computer:d83ddcbb
	art:d83cdfa8
	music:d83cdfb5
	T:d83cddf9
	eye:d83ddc41
	icon:00690063006f006e

	*/
	// Set What you want to do
	if (messageReaction.message.id == '583366761198387201') {
		var hexEmoji = messageReaction.emoji.name.hexEncode();
		var server = messageReaction.message.guild;
		var userToSetRole = server.members.find(member => member.displayName === user.username);
		console.log(hexEmoji);
		var role = null;
		// This is the message that has the reactions for phone
		if (hexEmoji === "d83ddcbb") {
			// Computer - Programmer
			role = server.roles.find(guildRole => guildRole.name === "programmer");
		} else if (hexEmoji === "d83cdfa8") {
			// Art - Art
			role = server.roles.find(guildRole => guildRole.name === "artist");
		} else if (hexEmoji === "d83cdfb5") {
			// Music - Music
			role = server.roles.find(guildRole => guildRole.name === "sound-engineer");
		} else if (hexEmoji === "d83cddf9") {
			// T - Tester
			role = server.roles.find(guildRole => guildRole.name === "tester");
		} else if (hexEmoji === "d83ddc41") {
			// Eye - Nothing
			role = server.roles.find(guildRole => guildRole.name === "Not here to help :(");
			userToSetRole.removeRole(server.roles.find(guildRole => guildRole.name === "programmer")).then(console.log).catch(console.error);
			userToSetRole.removeRole(server.roles.find(guildRole => guildRole.name === "artist")).then(console.log).catch(console.error);
			userToSetRole.removeRole(server.roles.find(guildRole => guildRole.name === "sound-engineer")).then(console.log).catch(console.error);
			userToSetRole.removeRole(server.roles.find(guildRole => guildRole.name === "tester")).then(console.log).catch(console.error);
			userToSetRole.removeRole(server.roles.find(guildRole => guildRole.name === "writer")).then(console.log).catch(console.error);
		} else if (hexEmoji === "00690063006f006e") {
			// Icon - Writer
			role = server.roles.find(guildRole => guildRole.name === "writer");
		}
		if (role) {
			userToSetRole.removeRole(server.roles.find(guildRole => guildRole.name === "Not here to help :(")).then(console.log).catch(console.error);
			userToSetRole.addRole(role).then(console.log).catch(console.error);
		}
	}

	/*
	A:d83cdde6
	I:d83cddee
	O:d83cddf4
	*/
	// What phone you have
	if (messageReaction.message.id == '583685148281667586') {
		var hexEmoji = messageReaction.emoji.name.hexEncode();
		var server = messageReaction.message.guild;
		var userToSetRole = server.members.find(member => member.displayName === user.username);

		var role = null;
		// This is the message that has the reactions for phone
		if (hexEmoji === "d83cdde6") {
			// Computer - Programmer
			role = server.roles.find(guildRole => guildRole.name === "Android");
		} else if (hexEmoji === "d83cddee") {
			// Art - Art
			role = server.roles.find(guildRole => guildRole.name === "iOS");
		} else if (hexEmoji === "d83cddf4") {
			// Music - Music
			role = server.roles.find(guildRole => guildRole.name === "Other");
		}
		if (role)
			userToSetRole.addRole(role).then(console.log).catch(console.error);
	}
});

client.on('messageReactionRemove', (messageReaction, user) => {
	/*
	computer:d83ddcbb
	art:d83cdfa8
	music:d83cdfb5
	T:d83cddf9
	eye:d83ddc41
	icon:00690063006f006e

	*/
	if (messageReaction.message.id == '583366761198387201') {
		var hexEmoji = messageReaction.emoji.name.hexEncode()
		var server = messageReaction.message.guild;
		var userToSetRole = server.members.find(member => member.displayName === user.username);
		var role = null;
		// This is the message that has the reactions for phone
		if (hexEmoji === "d83ddcbb") {
			// Computer - Programmer
			role = server.roles.find(guildRole => guildRole.name === "programmer");
		} else if (hexEmoji === "d83cdfa8") {
			// Art - Art
			role = server.roles.find(guildRole => guildRole.name === "artist");
		} else if (hexEmoji === "d83cdfb5") {
			// Music - Music
			role = server.roles.find(guildRole => guildRole.name === "sound-engineer");
		} else if (hexEmoji === "d83cddf9") {
			// T - Tester
			role = server.roles.find(guildRole => guildRole.name === "tester");
		} else if (hexEmoji === "d83ddc41") {
			// Eye - Nothing
			role = server.roles.find(guildRole => guildRole.name === "Not here to help :(");
		} else if (hexEmoji === "00690063006f006e") {
			// Icon - Writer
			role = server.roles.find(guildRole => guildRole.name === "writer");
		}
		if (role)
			userToSetRole.removeRole(role).then(console.log).catch(console.error);
	}

	/*
	A:d83cdde6
	I:d83cddee
	O:d83cddf4
	*/
	// What phone you have
	if (messageReaction.message.id == '583685148281667586') {
		var hexEmoji = messageReaction.emoji.name.hexEncode()
		var server = messageReaction.message.guild;
		var userToSetRole = server.members.find(member => member.displayName === user.username);
		var role = null;
		// This is the message that has the reactions for phone
		if (hexEmoji === "d83cdde6") {
			// Computer - Programmer
			role = server.roles.find(guildRole => guildRole.name === "Android");
		} else if (hexEmoji === "d83cddee") {
			// Art - Art
			role = server.roles.find(guildRole => guildRole.name === "iOS");
		} else if (hexEmoji === "d83cddf4") {
			// Music - Music
			role = server.roles.find(guildRole => guildRole.name === "Other");
		}
		if (role)
			userToSetRole.removeRole(role).then(console.log).catch(console.error);
	}
});

client.on('raw', packet => {
    // We don't want this to run on unrelated packets
    if (!['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) return;
    // Grab the channel to check the message from
    const channel = client.channels.get(packet.d.channel_id);
    // There's no need to emit if the message is cached, because the event will fire anyway for that
    if (channel.messages.has(packet.d.message_id)) return;
    // Since we have confirmed the message is not cached, let's fetch it
    channel.fetchMessage(packet.d.message_id).then(message => {
        // Emojis can have identifiers of name:id format, so we have to account for that case as well
        const emoji = packet.d.emoji.id ? `${packet.d.emoji.name}:${packet.d.emoji.id}` : packet.d.emoji.name;
        // This gives us the reaction we need to emit the event properly, in top of the message object
        const reaction = message.reactions.get(emoji);
        // Adds the currently reacting user to the reaction's users collection.
        if (reaction) reaction.users.set(packet.d.user_id, client.users.get(packet.d.user_id));
        // Check which type of event it is before emitting
        if (packet.t === 'MESSAGE_REACTION_ADD') {
            client.emit('messageReactionAdd', reaction, client.users.get(packet.d.user_id));
        }
        if (packet.t === 'MESSAGE_REACTION_REMOVE') {
            client.emit('messageReactionRemove', reaction, client.users.get(packet.d.user_id));
        }
    });
});

client.login(Secret.auth).catch(console.error);