const Command = require("../../Structures/Command");
const { MessageEmbed } = require("discord.js");

const subreddits = ["cat", "cats", "catpics", "kittens"];

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "cat",
      aliases: ["cats"],
      description: "cute cats here you go!",
      category: "Pets",
      usage: "",
      developerOnly: false,
      guildOnly: false,
      nsfwOnly: false,
      args: false,
    });
  }

  async run(message) {
    const link = await this.client.utils.getSubredditImage(subreddits);

    const embed = new MessageEmbed().setImage(link);

    message.channel.send(embed);
  }
};
