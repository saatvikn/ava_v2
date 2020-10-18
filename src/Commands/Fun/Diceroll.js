const Command = require("../../Structures/Command");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "diceroll",
      description: "roll a dice!",
      category: "Fun",
      usage: "",
      developerOnly: false,
      guildOnly: false,
      nsfwOnly: false,
      args: false,
    });
  }

  async run(message) {
    const dicerollChoices = ["1", "2", "3", "4", "5", "6"];

    const dicerollOutout =
      dicerollChoices[Math.floor(Math.random() * dicerollChoices.length)];

    const embed = new MessageEmbed()
      .setColor("WHITE")
      .setAuthor("🎲 Dice roll! 🎲")
      .setDescription(`You rolled **${dicerollOutout}**`);
    message.channel.send(embed);
  }
};
