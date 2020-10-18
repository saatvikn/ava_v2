const Command = require("../../Structures/Command");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "love",
      aliases: ["affinity"],
      description: "Calculates the love affinity you have for another person.",
      category: "Social",
      usage: "[mention]",
      developerOnly: false,
      guildOnly: true,
      nsfwOnly: false,
      args: false,
    });
  }

  async run(message, ...args) {
    // Get a member from mention, id, or username
    let person = message.mentions.members.first();

    // If no person is found
    // It's going to default to the author
    // And we don't want to love ourself in this command
    // So we filter out our ID from the server members
    // And get a random person from that collection
    if (!person || message.author.id === person.id) {
      person = message.guild.members.cache
        .filter((m) => m.id !== message.author.id)
        .random();
    }

    // love is the percentage
    // loveIndex is a number from 0 to 10, based on that love variable
    const love = Math.random() * 100;
    const loveIndex = Math.floor(love / 10);
    const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);

    const embed = new MessageEmbed()
      .setColor("#ffb6c1")
      .setThumbnail(message.member.user.displayAvatarURL())
      .setDescription(
        `☁ **${person}** loves **${
          message.member
        }** this much:\n\n💟 ${Math.floor(love)}%\n\n${loveLevel}`
      );

    return message.channel.send(embed);
  }
};
