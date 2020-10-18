const Command = require("../../Structures/Command");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "porn",
      aliases: ["pornography"],
      description: "P....O.....R......N",
      category: "Nsfw",
      usage: "",
      developerOnly: false,
      guildOnly: false,
      nsfwOnly: true,
      args: false,
    });
  }

  async run(message) {
    const subreddits = ["porn"];

    const link = await this.client.utils.getSubredditImage(subreddits);

    const embed = new MessageEmbed().setImage(link);

    message.channel.send(embed);
  }
};
