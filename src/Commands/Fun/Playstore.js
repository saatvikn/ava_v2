const Command = require("../../Structures/Command");
const { MessageEmbed } = require("discord.js");
const PlayStore = require("google-play-scraper");
const EmbedColor = ``;

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "playstore",
      aliases: ["ps"],
      description: "get information about an app on the google play store.",
      category: "Fun",
      usage: "<app name>",
      developerOnly: false,
      guildOnly: false,
      nsfwOnly: false,
      args: true,
    });
  }

  async run(message, ...args) {
    PlayStore.search({
      term: args.join(" "),
      num: 1,
    }).then((Data) => {
      let App;

      try {
        App = JSON.parse(JSON.stringify(Data[0]));
      } catch (error) {
        return message.channel.send(
          `No Application Found - ${message.author.username}!`
        );
      }

      const Embed = new MessageEmbed()
        .setColor(EmbedColor || "RANDOM")
        .setThumbnail(App.icon)
        .setURL(App.url)
        .setTitle(`${App.title}`)
        .setDescription(App.summary)
        .addField(`Price`, App.priceText, true)
        .addField(`Developer`, App.developer, true)
        .addField(`Score`, App.scoreText, true)
        .setFooter(`Requested By ${message.author.username}`)
        .setTimestamp();

      return message.channel.send(Embed);
    });
  }
};
