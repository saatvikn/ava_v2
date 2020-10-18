const Command = require("../../Structures/Command");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "invite",
      description: "return the invite link to the bot!",
      category: "General",
      usage: "",
      developerOnly: false,
      guildOnly: false,
      nsfwOnly: false,
      args: false,
    });
  }

  async run(message) {
    const embed = new MessageEmbed()
      .setTimestamp()
      .setTitle("Ava Invite Link")
      .setDescription(
        "Invite the bot using this [link](https://discord.com/api/oauth2/authorize?client_id=740564906147053599&permissions=1647701190&scope=bot)."
      )
      .setFooter(
        message.guild.me.displayName,
        this.client.user.displayAvatarURL()
      );
    message.channel.send(embed);
  }
};
