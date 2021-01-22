const { MessageEmbed, version: djsversion } = require("discord.js");
const { version } = require("../../../package.json");
const Command = require("../../Structures/Command");
const { utc } = require("moment");
const os = require("os");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ["bot"],
      description: "Displays information about the bot.",
      category: "Information",
    });
  }

  run(message) {
    const core = os.cpus()[0];

    const date = new Date(this.client.uptime);

    const clientUptime = `       Hours: ${
      date.getHours() - 1
    },\n       Minutes: ${date.getMinutes()},\n       Seconds: ${date.getSeconds()},`;

    const botcpu = `     Cores: ${os.cpus().length},\n     Model: ${
      core.model
    },\n    Speed: ${core.speed}MHz,`;

    const botmemory = `    Total: ${this.client.utils.formatBytes(
      process.memoryUsage().heapTotal
    )},\n    Used: ${this.client.utils.formatBytes(
      process.memoryUsage().heapUsed
    )},`;

    const embed = new MessageEmbed()
      .setThumbnail(this.client.user.displayAvatarURL())
      .setColor(message.guild.me.displayHexColor || "BLUE")
      .setTimestamp();

    message.channel
      .send(new MessageEmbed().setTitle("Loading..."))
      .then((msg) => {
        const latency = msg.createdTimestamp - message.createdTimestamp;

        embed.setDescription(`\`\`\`js\n[\n   {
    Client: ${this.client.user.tag} (${this.client.user.id}),
    Commands: ${this.client.commands.size},
    Servers: ${this.client.guilds.cache.size.toLocaleString()},
    Users: ${this.client.guilds.cache
      .reduce((a, b) => a + b.memberCount, 0)
      .toLocaleString()},
    Channels: ${this.client.channels.cache.size.toLocaleString()},
    Creation_Date: ${utc(this.client.user.createdTimestamp).format(
      "Do MMMM YYYY HH:mm:ss"
    )},\n
    Node.js_Version: ${process.version},
    Client_Version: v${version},
    Discord.js_Version: v${djsversion},
    Platform: ${process.platform},\n
    Uptime: {\n${clientUptime}\n     },\n
    CPU: {\n${botcpu}\n     },\n
    Memory: {\n${botmemory}\n    },\n
    API_Latency: ${Math.round(this.client.ws.ping)}ms,    
    Bot_Latency: ${latency},\n   },\n],  \`\`\``);

        msg.edit(embed);
      });
  }
};
