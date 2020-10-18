const Command = require("../../Structures/Command");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "coinflip",
      aliases: ["toss"],
      description: "flip a coin virtually!",
      category: "Fun",
      usage: "",
      developerOnly: false,
      guildOnly: false,
      nsfwOnly: false,
      args: false,
    });
  }

  async run(message) {
    const coinflipChoices = ["Heads", "Tails"];

    const coinflipOutout =
      coinflipChoices[Math.floor(Math.random() * coinflipChoices.length)];

    const embed = new MessageEmbed()
      .setColor("YELLOW")
      .setAuthor("💲 Coin flip! 💲")
      .setDescription(`You flipped **${coinflipOutout}**`);
    message.channel.send(embed);
  }
};
