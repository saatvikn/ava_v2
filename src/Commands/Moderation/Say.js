const Command = require("../../Structures/Command");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "say",
      aliases: ["tell"],
      description: "say your input via the bot",
      category: "Moderation",
      usage: "<input>",
      developerOnly: false,
      guildOnly: true,
      nsfwOnly: false,
      args: true,
      botPerms: ["MANAGE_MESSAGES"],
      userPerms: ["MANAGE_MESSAGES"],
    });
  }

  async run(message, ...args) {
    const sayMessage = args.join(" ");
    message.delete().catch((O_o) => {});

    const embed = new MessageEmbed()
      .setColor(process.env.EMBED_COLOR)
      .setDescription(sayMessage);

    const msg = await message.channel.send(embed);

    const rChannel = message.guild.channels.cache.get("724538662603194378");

    if (rChannel || rChannel !== undefined) {
      const embed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setColor("RANDOM")
        .setDescription(
          `Used the \`say\` command.\n**- Channel**: ${message.channel}\n**- Message**: ${sayMessage}\n**- Jump Link**: [click me](${msg.url})`
        );
      rChannel.send(embed);
    }
  }
};
