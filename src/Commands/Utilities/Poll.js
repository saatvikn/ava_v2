const Command = require("../../Structures/Command");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "poll",
      description: "Create a simple yes or no poll",
      category: "Utilities",
      usage: "<channel mention> <poll question>",
      developerOnly: false,
      guildOnly: true,
      nsfwOnly: false,
      args: true,
    });
  }

  async run(message, ...args) {
    const channel = message.mentions.channels.first();

    if (!channel) {
      return message.channel.send(`You did not mention your channel!`);
    }
    const question = message.content
      .split(`${this.client.prefix}poll ${channel} `)
      .join("");

    if (!question)
      return message.channel.send(`You did not specify your question!`);

    const Embed = new MessageEmbed()
      .setTitle(`New poll! 🙋‍♀️`)
      .setDescription(`${question}`)
      .setFooter(`Created by- ${message.author.tag}`)
      .setColor(`RANDOM`);

    const msg = await message.guild.channels.cache.get(channel.id).send(Embed);
    await msg.react("👍");
    await msg.react("👎");

    message.reply(`Poll sent to ${channel}!`);
  }
};
