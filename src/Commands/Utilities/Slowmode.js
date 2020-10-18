const Command = require("../../Structures/Command");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "slowmode",
      description: "Set the slowmode for the channel!",
      category: "Utilities",
      usage: "<newSlowMode> [reason]",
      developerOnly: false,
      guildOnly: true,
      nsfwOnly: false,
      args: true,
    });
  }

  async run(message, ...args) {
    if (!message.member.hasPermission("MANAGE_GUILD")) {
      return message.channel
        .send("You do not have permission to use this command!")
        .then((m) => m.delete({ timeout: 10000 }));
    }

    if (isNaN(args[0])) return message.channel.send(`That is not a number!`);

    const reason = message.content.slice(
      this.client.prefix.length + 9 + args[0].length + 1
    );
    if (!reason) {
      reason == "No reason provided!";
    }
    message.channel.setRateLimitPerUser(args[0], reason);

    const embed = new MessageEmbed()
      .setTitle("New Slowmode")
      .setTimestamp()
      .setDescription(
        `Set the slowmode of this channel too **${args[0]}** with the reason: **${reason}**`
      )
      .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
      .setColor("RANDOM");

    message.channel.send(embed);
  }
};
