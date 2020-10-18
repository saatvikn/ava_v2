const Command = require("../../Structures/Command");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "support",
      description: "get support with the issues with the bot!",
      category: "General",
      usage: "",
      developerOnly: false,
      guildOnly: false,
      nsfwOnly: false,
      args: false,
    });
  }

  async run(message) {
    const embedA = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Support")
      .setDescription(
        "Need Help? Drop your issues in my GitHub repository using this [link](https://github.com/Rayne231/ava/issues)."
      );

    message.channel.send(embedA);
  }
};
