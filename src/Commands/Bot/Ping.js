const Command = require("../../Structures/Command");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "ping",
      aliases: ["pong"],
      description: "This provides the ping of the bot",
      category: "Bot",
      usage: "",
      developerOnly: false,
      guildOnly: false,
      nsfwOnly: false,
      args: false,
    });
  }

  async run(message) {
    const msg = await message.channel.send("Pinging...");

    const latency = msg.createdTimestamp - message.createdTimestamp;
    const choices = [
      "Is this really my ping?",
      "Is this okay? I can't look!",
      "I hope it isn't bad!",
    ];
    const response = choices[Math.floor(Math.random() * choices.length)];

    msg.edit(
      `${response} - Bot Latency: \`${latency}ms\`, API Latency: \`${Math.round(
        this.client.ws.ping
      )}ms\``
    );
  }
};
