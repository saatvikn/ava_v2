const Command = require("../../Structures/Command");
const figlet = require("util").promisify(require("figlet"));

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "banner",
      description: "converts given text into a figlet banner.",
      category: "Fun",
      args: true,
    });
  }

  async run(msg, ...banner) {
    return msg.channel.send(await figlet(banner), { code: true });
  }
};
