const Command = require("../../Structures/Command");
const { exec } = require("child_process");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "execute",
      aliases: ["exec"],
      description: "get result of a command run in the console",
      category: "Developer",
      usage: "<console command input>",
      developerOnly: true,
      guildOnly: true,
      nsfwOnly: false,
      args: true,
    });
  }

  async run(message, ...args) {
    exec(args.join(" "), (error, stdout) => {
      const response = stdout || error;
      message.channel.send(response, { split: true, code: true });
    });
  }
};
