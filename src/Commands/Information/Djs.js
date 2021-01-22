const Command = require("../../Structures/Command");
const fetch = require("node-fetch");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "djs",
      aliases: ["discordjs", "discord.js"],
      description: "displays information from the discord.js documentation!",
      category: "Information",
      usage: "<searchQuery>",
      developerOnly: false,
      guildOnly: false,
      nsfwOnly: false,
      args: true,
      botPerms: ["ADD_REACTIONS", "MANAGE_MESSAGES"],
    });
  }

  async run(message, ...args) {
    const query = args;

    const url = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
      query
    )}`;

    const docFetch = await fetch(url);
    const embed = await docFetch.json();

    if (!embed || embed.error) {
      return message.reply(
        `"${query}" couldn't be located within the discord.js documentation (<https://discord.js.org/>).`
      );
    }

    if (!message.guild) {
      return message.channel.send({ embed });
    }

    const msg = await message.channel.send({ embed });
    msg.react("🗑");

    let react;
    try {
      react = await msg.awaitReactions(
        (reaction, user) =>
          reaction.emoji.name === "🗑" && user.id === message.author.id,
        { max: 1, time: 10000, errors: ["time"] }
      );
    } catch (error) {
      msg.reactions.removeAll();
    }

    if (react && react.first()) {
      message.delete();
      msg.delete();
    }

    return message;
  }
};
