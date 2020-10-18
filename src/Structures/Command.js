const { Permissions } = require("discord.js");

module.exports = class Command {
  constructor(client, name, options = {}) {
    this.client = client;
    this.name = options.name || name;
    this.aliases = options.aliases || [];
    this.description = options.description || "No description provided.";
    this.category = options.category || "Miscellaneous";
    this.usage = `${this.client.prefix}${this.name} ${
      options.usage || ""
    }`.trim();
    this.developerOnly = options.developerOnly || false;
    this.guildOnly = options.guildOnly || false;
    this.nsfwOnly = options.nsfwOnly || false;
    this.args = options.args || false;
    this.userPerms = new Permissions(options.userPerms).freeze();
    this.botPerms = new Permissions(options.botPerms).freeze();
  }

  // eslint-disable-next-line no-unused-vars
  async run(message, args) {
    throw new Error(`Command ${this.name} doesn't provide a run method!`);
  }
};
