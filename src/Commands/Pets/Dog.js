const Command = require("../../Structures/Command");
const { MessageEmbed } = require("discord.js");

const subreddits = ["dog", "dogs", "dogpics", "puppies"];

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "dog",
      aliases: ["dogs", "puppy"],
      description: "bark bark... 🐶",
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
