const Command = require("../../Structures/Command");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "boobs",
      aliases: ["tits", "tities"],
      description: "big ones",
      category: "Nsfw",
      usage: "",
      developerOnly: false,
      guildOnly: false,
      nsfwOnly: true,
      args: false,
    });
  }

  async run(message) {
    const subreddits = ["boobs"];

    const link = await this.client.utils.getSubredditImage(subreddits);

    const embed = new MessageEmbed().setImage(link);

    message.channel.send(embed);
  }
};
