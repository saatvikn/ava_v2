const Command = require("../../Structures/Command");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

let getMonthName = function (int) {
  switch (int) {
    case 1:
      return "January";
    case 2:
      return "February";
    case 3:
      return "March";
    case 4:
      return "April";
    case 5:
      return "May";
    case 6:
      return "June";
    case 7:
      return "July";
    case 8:
      return "August";
    case 9:
      return "September";
    case 10:
      return "October";
    case 11:
      return "November";
    case 12:
      return "December";
  }
};

let secondsConverter = function (int) {
  let remaining = int;

  let days = Math.floor(remaining / 86400);
  if (days < 10) {
    days = "0" + days;
  }
  remaining = remaining % 86400;

  let hours = Math.floor(remaining / 3600);
  if (hours < 10) {
    hours = "0" + hours;
  }
  remaining = remaining % 3600;

  let minutes = Math.floor(remaining / 60);
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  remaining = Math.floor(remaining % 60);

  if (remaining < 10) {
    remaining = "0" + remaining;
  }

  return days + ":" + hours + ":" + minutes + ":" + remaining;
};

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "anime",
      description: "get info about an anime show!",
      category: "Weeb",
      usage: "<show name>",
      developerOnly: false,
      guildOnly: false,
      nsfwOnly: false,
      args: true,
    });
  }

  async run(message, ...args) {
    return anime(message, args);
  }
};

let query = `
    query ($search: String) {
        Media (search: $search, type: ANIME) {
            id
            title {
            romaji
            english
            native
            }
            description
            coverImage {
                large
            }
            averageScore
            genres
            season
            startDate {
                year
                month
            }
            episodes
            nextAiringEpisode {
                timeUntilAiring
            }
        }
    }
`;

function anime(message, args) {
  let title = args.join(" ");

  let variables = {
    search: title,
  };

  let url = "https://graphql.anilist.co",
    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    };

  fetch(url, options).then(handleResponse).then(handleData).catch(handleError);

  function handleResponse(response) {
    return response.json().then((json) => {
      return response.ok
        ? json
        : Promise.reject(json).then(
            message.channel.send("I can't find that anime!")
          );
    });
  }

  function handleData(data) {
    data = data.data.Media;

    let nextEpisode = data.nextAiringEpisode;

    let embedData = {
      title: data.title.romaji,
      url: "https://anilist.co/anime/" + data.id + "/",
      description: data.description
        ? data.description
            .replace("<br>", "\n")
            .replace(/<br>|<\/br>/g, "")
            .replace(/<i>|<\/i>/g, "*")
            .replace(/<b>|<\/b>/g, "**")
        : "N/A",
      thumbnail: {
        url: data.coverImage.large,
      },
      fields: [
        {
          name: "**Score**",
          value: data.averageScore + "\n" + "-------------------------",
        },
        {
          name: "**Genres**",
          value:
            data.genres.toString().replace(/,/g, ", ") +
            "\n" +
            "-------------------------",
        },
        {
          name: "**Release Date**",
          value:
            getMonthName(data.startDate.month) +
            " " +
            data.startDate.year +
            "\n" +
            "-------------------------",
        },
        {
          name: "**Episodes**",
          value: data.episodes + "\n" + "-------------------------",
        },
        {
          name: "**Time Until Next Episode**",
          value: nextEpisode
            ? secondsConverter(nextEpisode.timeUntilAiring)
            : "N/A",
        },
      ],
    };

    let embed = new MessageEmbed(embedData);

    message.channel.send("", embed);
  }

  function handleError(error) {
    error = error.errors ? error.errors[0] : error;
    if (error.status != 404) {
      console.log(error);
    }
  }
}
