const Command = require("../../Structures/Command");
const { MessageEmbed } = require("discord.js");
const p = require("phin");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "w-hug",
      aliases: ["whug"],
      description: "hug a user",
      category: "Weeb",
      usage: "<user mention>",
      developerOnly: false,
      guildOnly: false,
      nsfwOnly: false,
      args: true,
    });
  }

  async run(message) {
    const name = message.mentions.members.first();

    if (!name) {
      return message
        .reply(
          "Maybe it's useful to actually mention the user you are hugging!"
        )
        .then((m) => m.delete({ timeout: 5000 }));
    }

    // making a function for getting the response for the embed
    const getResponse = async function () {
      let resp;
      const response = await p({
        url: `https://some-random-api.ml/animu/hug`,
        method: "get",
        parse: "json",
      });

      resp = response.body;

      return resp;
    };

    // assigning the data to a variable
    let Data = await getResponse();

    // Making a embed
    const embed = new MessageEmbed()
      .setColor(`#00008b`)
      .setDescription(`Hugging ${name}!`)
      .setImage(Data.link);

    // Sending the embed
    message.channel.send(embed);
  }
};
