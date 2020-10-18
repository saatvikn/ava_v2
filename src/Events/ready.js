const Event = require("../Structures/Event");
const chalk = require("chalk");

module.exports = class extends Event {
  constructor(...args) {
    super(...args, {
      once: true,
    });
  }

  run() {
    console.log(
      chalk.blue(
        [
          `
    ╦════════════════════════╦
    ║                        ║
    ║Connected to Da Baddest!║
    ║        ${this.client.user.tag}        ║
    ║                        ║
    ╩════════════════════════╩
    `,
          `Loaded ${this.client.commands.size} commands!`,
          `Loaded ${this.client.events.size} events!`,
        ].join("\n")
      )
    );

    const activities = [
      `${this.client.guilds.cache.size} servers!`,
      `${this.client.channels.cache.size} channels!`,
      `${this.client.guilds.cache.reduce(
        (a, b) => a + b.memberCount,
        0
      )} users!`,
    ];

    let i = 0;
    setInterval(
      () =>
        this.client.user.setPresence({
          status: "dnd",
          activity: {
            name: `@${this.client.user.username} help 🎀 | ${
              activities[i++ % activities.length]
            }`,
            type: "WATCHING",
            url: "https://github.com/Rayne231/ava",
          },
        }),
      15000
    );

    console.log(`Number of Servers- ${this.client.guilds.cache.size}`);
    console.log("Servers:");
    this.client.guilds.cache.forEach((guild) => {
      console.table(chalk.green(" - " + guild.name));
    });
  }
};
