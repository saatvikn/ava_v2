const Command = require("../../Structures/Command");
const { inspect } = require("util");
const { Type } = require("@extreme_hero/deeptype");
const sourcebin = require("sourcebin");

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      name: "eval",
      aliases: ["evaluate", "ev"],
      description: "evaluate the provided code!",
      category: "Developer",
      usage: "<code input>",
      developerOnly: true,
      guildOnly: true,
      nsfwOnly: false,
      args: true,
    });
  }

  async run(message, ...args) {
    // eslint-disable-next-line no-unused-vars
    const msg = message;

    let code = args.join(" ");
    code = code.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");

    let evaled;
    try {
      const start = process.hrtime();
      evaled = eval(code);
      if (eval instanceof Promise) {
        evaled = await evaled;
      }

      const stop = process.hrtime(start);

      const response = [
        `**Output**: \`\`\`js\n${this.clean(
          inspect(evaled, { depth: 0 })
        )}\n\`\`\``,
        `**Type:** \`\`\`ts\n${new Type(evaled).is}\n\`\`\``,
        `**Time Taken:** \`\`\`${(stop[0] * 1e9 + stop[1]) / 1e6}ms \`\`\``,
      ];
      const res = response.join("\n");
      if (res.length < 2000) {
        await message.channel.send(res);
      } else {
        let output = await sourcebin.create(
          [
            {
              name: "output",
              content: res,
              languageId: "js",
            },
          ],
          {
            title: "Evaluation Output",
            description: "Outcome of eval command.",
          }
        );
        output = await sourcebin.shorten(output.url);

        await message.channel.send(output);
      }
    } catch (err) {
      return message.channel.send(
        `**Error**: \`\`\`xl\n${this.clean(err)}\n\`\`\``
      );
    }
  }

  clean(text) {
    if (typeof text === "string") {
      text = text
        .replace(/`/g, `\`${String.fromCharCode(8203)}`)
        .replace(/@/g, `@${String.fromCharCode(8203)}`)
        .replace(new RegExp(this.client.token, "gi"), "****");
    }
    return text;
  }
};
