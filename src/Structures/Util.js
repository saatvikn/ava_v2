const path = require("path");
const { promisify } = require("util");
const glob = promisify(require("glob"));
const fetch = require("node-fetch");
const Command = require("./Command.js");
const Event = require("./Event.js");

module.exports = class Util {
  constructor(client) {
    this.client = client;
  }

  isClass(input) {
    return (
      typeof input === "function" &&
      typeof input.prototype === "object" &&
      input.toString().substring(0, 5) === "class"
    );
  }

  get directory() {
    return `${path.dirname(require.main.filename)}${path.sep}`;
  }

  trimArray(arr, maxLen = 10) {
    if (arr.length > maxLen) {
      const len = arr.length - maxLen;
      arr = arr.slice(0, maxLen);
      arr.push(`${len} more...`);
    }
    return arr;
  }

  formatBytes(bytes) {
    if (bytes === 0) return "0 Bytes";
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`;
  }

  removeDuplicates(arr) {
    return [...new Set(arr)];
  }

  capitalise(string) {
    return string
      .split(" ")
      .map((str) => str.slice(0, 1).toUpperCase() + str.slice(1))
      .join(" ");
  }

  checkDeveloper(target) {
    return this.client.developers.includes(target);
  }

  comparePerms(member, target) {
    return member.roles.highest.position < target.roles.highest.position;
  }

  formatPerms(perm) {
    return perm
      .toLowerCase()
      .replace(/(^|"|_)(\S)/g, (s) => s.toUpperCase())
      .replace(/_/g, " ")
      .replace(/Guild/g, "Server")
      .replace(/Use Vad/g, "Use Voice Acitvity");
  }

  formatArray(array, type = "conjunction") {
    return new Intl.ListFormat("en-GB", { style: "short", type: type }).format(
      array
    );
  }

  async getSubredditImage(subreddits) {
    const data = await fetch(
      `https://imgur.com/r/${
        subreddits[Math.floor(Math.random() * subreddits.length)]
      }/hot.json`
    )
      .then((response) => response.json())
      .then((body) => body.data);

    const selected = data[Math.floor(Math.random() * data.length)];

    const image = `https://imgur.com/${selected.hash}${selected.ext.replace(
      /\?.*/,
      ""
    )}`;

    const imageLink = await image;

    return imageLink;
  }

  async loadCommands() {
    return glob(`${this.directory}commands/**/*.js`).then((commands) => {
      for (const commandFile of commands) {
        delete require.cache[commandFile];
        const { name } = path.parse(commandFile);
        const File = require(commandFile);
        if (!this.isClass(File))
          throw new TypeError(`Command ${name} doesn't export a class.`);
        const command = new File(this.client, name.toLowerCase());
        if (!(command instanceof Command))
          throw new TypeError(`Command ${name} doesn't belong in Commands.`);
        this.client.commands.set(command.name, command);
        if (command.aliases.length) {
          for (const alias of command.aliases) {
            this.client.aliases.set(alias, command.name);
          }
        }
      }
    });
  }

  async loadEvents() {
    return glob(`${this.directory}events/**/*.js`).then((events) => {
      for (const eventFile of events) {
        delete require.cache[eventFile];
        const { name } = path.parse(eventFile);
        const File = require(eventFile);
        if (!this.isClass(File))
          throw new TypeError(`Event ${name} doesn't export a class!`);
        const event = new File(this.client, name);
        if (!(event instanceof Event))
          throw new TypeError(`Event ${name} doesn't belong in Events`);
        this.client.events.set(event.name, event);
        event.emitter[event.type](name, (...args) => event.run(...args));
      }
    });
  }

  getMember(message, toFind = "") {
    toFind = toFind.toLowerCase();

    let target = message.guild.members.cache.get(toFind);

    if (!target && message.mentions.members)
      target = message.mentions.members.first();

    if (!target && toFind) {
      target = message.guild.members.find((member) => {
        return (
          member.displayName.toLowerCase().includes(toFind) ||
          member.user.tag.toLowerCase().includes(toFind)
        );
      });
    }

    if (!target) target = message.member;

    return target;
  }

  formatDate(date) {
    return new Intl.DateTimeFormat("en-US").format(date);
  }

  async promptMessage(message, author, time, validReactions) {
    // We put in the time as seconds, with this it's being transfered to MS
    time *= 1000;

    // For every emoji in the function parameters, react in the good order.
    for (const reaction of validReactions) await message.react(reaction);

    // Only allow reactions from the author,
    // and the emoji must be in the array we provided.
    const filter = (reaction, user) =>
      validReactions.includes(reaction.emoji.name) && user.id === author.id;

    // And of course, await the reactions
    return message
      .awaitReactions(filter, { max: 1, time: time })
      .then((collected) => collected.first() && collected.first().emoji.name);
  }
};
