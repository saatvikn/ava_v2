const Command = require("../../Structures/Command");
const { MessageEmbed } = require("discord.js");

const chooseArr = ["🗻", "📰", "✂"];

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "rps",
      description:
        "Rock Paper Scissors game. React to one of the emojis to play the game.",
      category: "Fun",
      usage: "",
      developerOnly: false,
      guildOnly: false,
      nsfwOnly: false,
      args: false,
    });
  }

  async run(message) {
    const embed = new MessageEmbed()
      .setColor("#ffffff")
      .setFooter(
        message.guild.me.displayName,
        this.client.user.displayAvatarURL()
      )
      .setDescription(
        "Add a reaction to one of these emojis to play the **Rock, Paper and Scissors** game with me!"
      )
      .setTimestamp();

    const m = await message.channel.send(embed);
    // Wait for a reaction to be added
    const reacted = await this.client.utils.promptMessage(
      m,
      message.author,
      30,
      chooseArr
    );

    // Get a random emoji from the array
    const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];

    // Check if it's a win/tie/loss
    const result = await getResult(reacted, botChoice);
    // Clear the reactions
    await m.reactions.removeAll();

    embed.setDescription("").addField(result, `${reacted} vs ${botChoice}`);

    m.edit(embed);

    function getResult(me, clientChosen) {
      if (
        (me === "🗻" && clientChosen === "✂") ||
        (me === "📰" && clientChosen === "🗻") ||
        (me === "✂" && clientChosen === "📰")
      ) {
        return "You won!";
      } else if (me === clientChosen) {
        return "It's a tie!";
      } else {
        return "You lost!";
      }
    }
  }
};
