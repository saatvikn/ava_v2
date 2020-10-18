const { MessageEmbed } = require("discord.js");
const Command = require("../../Structures/Command");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "help",
      aliases: ["h"],
      description: "Displays all the commands in the bot",
      category: "General",
      usage: "[command]",
      developerOnly: false,
      guildOnly: true,
      nsfwOnly: false,
      args: false,
    });
  }

  async run(message, ...args) {
    const command = args;

    if (command.length && command[0] === "--all") {
      const embed102 = new MessageEmbed()
        .setAuthor(
          `${this.client.user.username} Help Menu!`,
          this.client.user.displayAvatarURL()
        )
        .setColor(process.env.EMBED_COLOR)
        .addField(
          "Prefix ❗❕",
          `Prefix for ${message.guild.name} is \`${this.client.prefix}\` and ${this.client.user}.`,
          false
        )
        .addField(
          "Webpage 💻",
          `You can view our webpage [here](https://github.com/Rayne231/ava/blob/master/README.md).`,
          false
        )
        .addField(
          "Command Info ℹ",
          `You can type \`${this.client.prefix}help [Command Name or Alias]\` to get information about a specific command!`,
          false
        )
        .addField(
          "Useful Links 🔗",
          `[Invite Link](https://discord.com/oauth2/authorize?client_id=740564906147053599&permissions=1647701190&scope=bot) | [Webpage](https://github.com/Rayne231/ava/blob/master/README.md) | [Support](https://github.com/Rayne231/ava/issues)`,
          false
        );
      message.author.send(embed102);

      const embed1 = new MessageEmbed()
        .setColor(process.env.EMBED_COLOR)
        .setAuthor("📃 Command List 📃");

      let categories;
      if (!this.client.developers.includes(message.author.id)) {
        categories = this.client.utils.removeDuplicates(
          this.client.commands
            .filter((cmd) => cmd.category !== "Developer")
            .map((cmd) => cmd.category)
        );
      } else {
        categories = this.client.utils.removeDuplicates(
          this.client.commands.map((cmd) => cmd.category)
        );
      }

      for (const category of categories) {
        embed1.addField(
          `**${this.client.utils.capitalise(category)}**`,
          this.client.commands
            .filter((cmd) => cmd.category === category)
            .map((cmd) => `\`${cmd.name}\``)
            .join(", ")
        );
      }
      message.reply(`📥 | I have sent a list of my command in your DM's!`);

      return message.author.send(embed1);
    } else if (command.length && command[0] !== "--all") {
      const embed2 = new MessageEmbed()
        .setAuthor(
          this.client.user.username,
          this.client.user.displayAvatarURL()
        )
        .setColor(process.env.EMBED_COLOR);
      const cmd =
        this.client.commands.get(command[0]) ||
        this.client.commands.get(this.client.aliases.get(command[0]));

      if (!cmd)
        return message.channel.send(
          `No information found for command \`${command}\`.`
        );

      embed2.setFooter(`Command Parameters: <> is required & [] is optional.`);

      if (cmd.name) {
        embed2.addField(`📛 Command name:`, `\`\`\`${cmd.name}\`\`\``, true);
      }

      if (cmd.description) {
        embed2.addField(
          `🍬 Description:`,
          `\`\`\`${cmd.description}\`\`\``,
          true
        );
      }

      if (cmd.aliases.length) {
        embed2.addField(
          `👽 Aliases:`,
          `\`\`\`${cmd.aliases.map((alias) => `${alias}`).join(", ")}\`\`\``,
          true
        );
      }

      if (cmd.args || !cmd.args) {
        embed2.addField(
          `🛬 Arguments Required:`,
          `\`\`\`${cmd.args ? "✅" : "❌"}\`\`\``,
          true
        );
      }

      if (cmd.usage) {
        embed2.addField(`⛱ Usage:`, `\`\`\`${cmd.usage}\`\`\``, true);
      }

      if (cmd.category) {
        embed2.addField(`🧮 Category`, `\`\`\`${cmd.category}\`\`\``, true);
      }

      if (cmd.developerOnly || !cmd.developerOnly) {
        embed2.addField(
          `👩‍💻 Bot Developer Only Command:`,
          `\`\`\`${cmd.developerOnly ? "✅" : "❌"}\`\`\``,
          true
        );
      }

      if (cmd.guildOnly || !cmd.guildOnly) {
        embed2.addField(
          `🏘 Guild Only Command:`,
          `\`\`\`${cmd.guildOnly ? "✅" : "❌"}\`\`\``,
          true
        );
      }

      if (cmd.nsfwOnly || !cmd.nsfwOnly) {
        embed2.addField(
          `🔞 NSFW Command:`,
          `\`\`\`${cmd.nsfwOnly ? "✅" : "❌"}\`\`\``,
          true
        );
      }

      return message.channel.send(embed2);
    } else {
      const embed3 = new MessageEmbed()
        .setColor(process.env.EMBED_COLOR)
        .setAuthor(`${message.guild.name} Help Menu`)
        .setThumbnail(this.client.user.displayAvatarURL())
        .setTimestamp()
        .addField(
          `Ava Commands List 📃`,
          `Type \`${this.client.prefix}help --all\` to get a list of my commands in your DM's.`,
          false
        )
        .addField(
          "Prefix ❕",
          `Your server prefix is \`${this.client.prefix}\` and ${this.client.user}.`,
          false
        )
        // .addField(
        //   "Categories 🎟",
        //   `Type \`${prefix}commands <category name>\` to get a list of commands for that category.\n\n**My Command Categories are-**\n${info}`,
        //   false
        // )
        .addField(
          "Command Info 🌎",
          `You can type \`${this.client.prefix}help [Command Name or Alias]\` to get information about a specific command!`,
          false
        )
        .addField(
          "Useful Links 🔗",
          `[Invite Link](https://discord.com/oauth2/authorize?client_id=740564906147053599&permissions=1647701190&scope=bot) | [Webpage](https://github.com/Rayne231/ava/blob/master/README.md) | [Support](https://github.com/Rayne231/ava/issues)`,
          false
        )
        .setFooter("Developed by Rayne");
      return message.channel.send(embed3);
    }
  }
};
