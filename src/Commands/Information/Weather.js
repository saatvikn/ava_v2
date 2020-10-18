const Command = require("../../Structures/Command");
const weather = require("weather-js");
const { MessageEmbed } = require("discord.js");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "weather",
      description: "check the weather forecast.",
      category: "Information",
      usage: "<location>",
      developerOnly: false,
      guildOnly: false,
      nsfwOnly: false,
      args: true,
    });
  }

  async run(message, ...args) {
    weather.find({ search: args.join(" "), degreeType: "C" }, function (
      error,
      result
    ) {
      // 'C' can be changed to 'F' for farneheit results

      if (error) return message.channel.send(error);

      if (result === undefined || result.length === 0)
        return message.channel.send("does the place even exist?");

      const current = result[0].current;
      const location = result[0].location;

      const weatherinfo = new MessageEmbed()
        .setDescription(`🌍⚡  ${current.skytext}  ☔🌞`)
        .setAuthor(`Weather forecast for *${current.observationpoint}*`)
        .setThumbnail(current.imageUrl)
        .setColor("RANDOM")
        .addField("Timezone", `UTC${location.timezone}`, true)
        .addField("Temperature", `${current.temperature}°C`, true)
        .addField("Wind", current.winddisplay, true)
        .addField("Feels like", `${current.feelslike}°C`, true)
        .addField("Humidity", `${current.humidity}%`, true);

      message.channel.send(weatherinfo);
    });
  }
};
