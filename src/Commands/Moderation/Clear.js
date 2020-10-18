const Command = require("../../Structures/Command");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "clear",
      aliases: ["purge"],
      description: "clear messages in the chat",
      category: "Moderation",
      usage: "<delete number>",
      developerOnly: false,
      guildOnly: true,
      nsfwOnly: false,
      args: true,
      botPerms: ["MANAGE_MESSAGES"],
      userPerms: ["MANAGE_MESSAGES"],
    });
  }

  async run(message, ...args) {
    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
      return message
        .reply("Sorry... I can't delete messages.")
        .then((m) => m.delete(5000));
    }

    const deleteCountBefore = parseInt(args[0], 10);

    const deleteCount = deleteCountBefore + 1;

    if (!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply(
        "Please provide a number between 1 and 99 for the number of messages to delete"
      );

    const fetched = await message.channel.messages.fetch({
      limit: deleteCount,
    });

    message.channel
      .bulkDelete(fetched)
      .catch((error) =>
        message.reply(`Couldn't delete messages because of: ${error}`)
      );

    message
      .reply(`I have deleted \`${deleteCountBefore}\` messages!`)
      .then((m) => m.delete({ timeout: 1000 }));
  }
};
