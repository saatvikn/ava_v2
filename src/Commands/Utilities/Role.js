const Command = require("../../Structures/Command");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "role",
      description: "a role utility command",
      category: "Utilities",
      usage: "",
      developerOnly: false,
      guildOnly: true,
      nsfwOnly: false,
      args: false,
    });
  }

  async run(message, ...args) {
    const prefix = this.client.prefix;
    try {
      if (args[0].length) {
        if (args[0].toLowerCase() === "add") {
          return addRole(message, args, prefix);
        } else if (args[0].toLowerCase() === "remove") {
          return removeRole(message, args, prefix);
        } else if (args[0].toLowerCase() === "create") {
          return createRole(message, args, prefix);
        } else if (args[0].toLowerCase() === "delete") {
          return deleteRole(message, args, prefix);
        } else {
          return noArgs(message, args, prefix);
        }
      } else {
        return noArgs(message, args, prefix);
      }
    } catch (err) {
      console.error(err);
      message.channel.send(`❌ An error occurred.`);
      return noArgs(message, args, prefix);
    }
  }
};

function addRole(message, args, prefix) {
  try {
    const roleName =
      message.guild.roles.cache.get(`${args[1]}`) ||
      message.guild.roles.cache.find((r) => r.name == args[1]) ||
      message.mentions.roles.first();

    const member =
      message.guild.members.cache.get(`${args[2]}`) ||
      message.mentions.members.first();

    member.roles.add(roleName);

    const embed = new MessageEmbed().setDescription(
      `Added role ${roleName} to ${member}.`
    );

    message.channel.send(embed);
  } catch (err) {
    message.channel.send(`❌ An error occurred.`);
    return noArgs(message, args, prefix);
  }
}

function removeRole(message, args, prefix) {
  try {
    const roleName =
      message.guild.roles.cache.get(`${args[1]}`) ||
      message.guild.roles.cache.find((r) => r.name == args[1]) ||
      message.mentions.roles.first();

    const member =
      message.guild.members.cache.get(`${args[2]}`) ||
      message.mentions.members.first();

    member.roles.remove(roleName);

    const embed = new MessageEmbed().setDescription(
      `Removed role ${roleName} for ${member}.`
    );

    message.channel.send(embed);
  } catch (err) {
    message.channel.send(`❌ An error occurred.`);
    return noArgs(message, args, prefix);
  }
}

async function createRole(message, args, prefix) {
  try {
    let rName = message.content.split(`${prefix}role create `).join("");
    let rColor;
    args.forEach((arg) => {
      if (arg.startsWith("#")) {
        rColor = arg;
      }
    });
    if (!rName) {
      return message.channel.send(`You did not specify a name for your role!`);
    }
    if (!rColor) {
      return message.channel.send(`You did not specify a color for your role!`);
    }
    if (rColor >= 16777215)
      return message.channel.send(
        `That hex color range was too big! Keep it between 0 and 16777215`
      );
    if (rColor <= 0)
      return message.channel.send(
        `That hex color range was too small! Keep it between 0 and 16777215`
      );
    rName = rName.replace(`${rColor}`, ``);

    const rNew = await message.guild.roles.create({
      data: {
        name: rName,
        color: rColor,
      },
    });
    const Embed = new MessageEmbed()
      .setTitle(`New role!`)
      .setDescription(
        `${message.author.username} has created the role "${rName}"\nIts Hex Color Code: ${rColor}\nIts ID: ${rNew.id}`
      )
      .setColor(rColor);
    message.channel.send(Embed);
  } catch (err) {
    message.channel.send(`❌ An error occurred.`);
    return noArgs(message, args, prefix);
  }
}

function deleteRole(message, args, prefix) {
  try {
    const roleDelete =
      message.guild.roles.cache.get(args[1]) ||
      message.guild.roles.cache.find((r) => r.name == args[1]) ||
      message.mentions.roles.first();
    if (!roleDelete)
      return message.channel.send(
        `You did not specify the role you wish to delete!`
      );

    roleDelete.delete();
    const Embed1 = new MessageEmbed()
      .setTitle(`Deleted role!`)
      .setColor(roleDelete.color)
      .setDescription(
        `${message.author.username} has deleted the role "${roleDelete.name}"\nIts ID: ${roleDelete.id}\nIts Hex Color Code: ${roleDelete.color}`
      );
    message.channel.send(Embed1);
  } catch (err) {
    message.channel.send(`❌ An error occurred.`);
    return noArgs(message, args, prefix);
  }
}

function noArgs(message, args, prefix) {
  const embed = new MessageEmbed()
    .setColor("RANDOM")
    .setTitle("Role Command Usage")
    .addField(
      "❯ Add A Role",
      `\`${prefix}role add <role mention, id or name> <user mention or id>\``,
      false
    )
    .addField(
      "❯ Remove A Role",
      `\`${prefix}role remove <role mention, id or name> <user mention or id>\``,
      false
    )
    .addField(
      `❯ Create A Role`,
      `\`${prefix}role create <name> <#hexcolour>\``,
      false
    )
    .addField(
      "❯ Delete A Role",
      `\`${prefix}role delete <role mention, id or name>\``,
      false
    );
  message.channel.send(embed);
}
