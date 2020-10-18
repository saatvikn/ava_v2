const Event = require("../../Structures/Event");

module.exports = class extends Event {
  async run(message) {
    if (message.author.bot) return;

    const prefixes = [`${this.client.prefix}`, `<@!${this.client.user.id}>`];

    let thePrefix = false;

    for (const thisPrefix of prefixes) {
      if (message.content.startsWith(thisPrefix)) thePrefix = thisPrefix;
    }

    if (!message.content.startsWith(thePrefix)) return;

    const [cmd, ...args] = message.content
      .slice(thePrefix.length)
      .trim()
      .split(/ +/g);

    const command =
      this.client.commands.get(cmd.toLowerCase()) ||
      this.client.commands.get(this.client.aliases.get(cmd.toLowerCase()));

    if (!command && message.content !== thePrefix) {
      return message
        .reply(
          `I don't recognize that, try using \`${this.client.prefix}help\` for help.`
        )
        .then(message.react("746273323096473621"));
    }

    try {
      if (command) {
        if (message.guild) {
          const userPermCheck = command.userPerms
            ? this.client.defaultPerms.add(command.userPerms)
            : this.client.defaultPerms;
          if (userPermCheck) {
            const missing = message.channel
              .permissionsFor(message.member)
              .missing(userPermCheck);
            if (missing.length) {
              return message
                .reply(
                  `You are missing ${this.client.utils.formatArray(
                    missing.map(this.client.utils.formatPerms)
                  )} permissions, you need them to use this command!`
                )
                .then(message.react("746273323096473621"));
            }
          }

          const botPermCheck = command.botPerms
            ? this.client.defaultPerms.add(command.botPerms)
            : this.client.defaultPerms;
          if (botPermCheck) {
            const missing = message.channel
              .permissionsFor(this.client.user)
              .missing(botPermCheck);
            if (missing.length) {
              return message
                .reply(
                  `I am missing ${this.client.utils.formatArray(
                    missing.map(this.client.utils.formatPerms)
                  )} permissions, I need them to run this command!`
                )
                .then(message.react("746273323096473621"));
            }
          }
        }

        if (
          command.developerOnly &&
          !this.client.utils.checkDeveloper(message.author.id)
        ) {
          return message
            .reply(`Sorry this command can only be used by the bot developers.`)
            .then(message.react("746273323096473621"));
        }

        if (command.guildOnly && !message.guild) {
          return message
            .reply(`Sorry, this command can be used in a Discord server only.`)
            .then(message.react("746273323096473621"));
        }

        if (command.nsfwOnly && message.channel.nsfw === false) {
          return message
            .reply(`Sorry this command can only be used in NSFW channels.`)
            .then(message.react("746273323096473621"));
        }

        if (command.args && !args.length) {
          let reply = `You didn't provide any arguments, ${message.author}!`;

          if (command.usage) {
            reply += `\nThe proper usage would be: \`\`\`${command.usage}\`\`\``;
          }

          return message.channel
            .send(reply)
            .then(message.react("746273323096473621"));
        }

        message.react("763753007111340073");
        command.run(message, ...args);
      }
    } catch (e) {
      console.error(e);
      message.channel.send(
        `**Unexpected or uncaught error ocurred 🌋!**\nPlease check if I have the required permissions to execute the command. If you are unable to find a solution the please report this error.\nSorry for the trouble.`
      );
    }
  }
};
