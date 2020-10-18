const Command = require("../../Structures/Command");
const { MessageEmbed } = require("discord.js");
const p = require("phin");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "waifu",
      description: "get your waifu",
      category: "Weeb",
      usage: "",
      developerOnly: false,
      guildOnly: false,
      nsfwOnly: false,
      args: false,
    });
  }

  async run(message) {
    const endpoint = message.channel.nsfw ? "nsfw" : "sfw";

    // making a function for getting the response for the embed
    const getResponse = async function () {
      let resp;
      const response = await p({
        url: `https://waifu.pics/api/${endpoint}/waifu`,
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
      .setDescription(`Here is your waifu, ${message.author}!`)
      .setImage(Data.url);

    // Sending the embed
    message.channel.send(embed);
  }
};
