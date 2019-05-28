// set up ======================================================================
const Discord = require('discord.js');
const Secret = require("./secret.js");
const ServerComm = require("./server-communication.js");
const BotUtility = require("./bot-utility.js");
const GeneralUtility = require("./general-utility.js");

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
        if (!msg.content.startsWith("#!")) return;
        if (textChannel instanceof Discord.TextChannel) {
	        if (textChannel.name == "server-commands") {
	        	// Game Commands
		        var fullCommand = msg.content.toLowerCase().split(" ");
		        ServerComm.processCommand(msg, user, fullCommand);
		    } else if (textChannel.name == "bot") {
		    	// Other Bot Commands
		    	BotUtility.receiveMessage(msg, server);
		    } else {
		    	GeneralUtility.receiveMessage(msg, server);
		    }
		}
    }
});

client.on('guildMemberAdd', member => {

});

client.login(Secret.auth).catch(console.error);