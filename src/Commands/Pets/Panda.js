const Command = require("../../Structures/Command");
const { MessageEmbed } = require("discord.js");
const p = require("phin");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "panda",
      aliases: ["pandas"],
      description: "pictures for pandas",
      category: "Pets",
      usage: "",
      developerOnly: false,
      guildOnly: false,
      nsfwOnly: false,
      args: false,
    });
  }

  async run(message) {
    const getResponse = async function () {
      let resp;
      const response = await p({
        url: `https://some-random-api.ml/img/panda`,
        method: "get",
        parse: "json",
      });

      resp = response.body;

      return resp;
    };

    // assigning the data to a variable
    let Data = await getResponse();

    // Making a embed
    const embed = new MessageEmbed().setColor(`#00008b`).setImage(Data.link);

    // Sending the embed
    message.channel.send(embed);
  }
};
