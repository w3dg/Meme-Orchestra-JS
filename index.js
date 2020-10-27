require("dotenv").config();
const fetch = require("node-fetch");
const { Client, MessageEmbed } = require("discord.js");
const client = new Client();

const ChannelID = process.env.CHANNEL_ID;
const ServerID = process.env.SERVER_ID;
const prefix = "!";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

client.once("ready", () => {
  console.log("BEEP BOOP ! Ready!");
});

client.on("message", async (msg) => {
  if (!msg.content.startsWith(prefix) || msg.author.bot) return;

  const args = msg.content.slice(prefix.length).trim().split(" ");
  const command = args.shift().toLowerCase();

  if (msg.channel.id === ChannelID && msg.guild.id === ServerID) {
    // Meme Handler
    if (command === `meme`) {
      await msg.react("🤣");
      const response = await fetch("https://www.reddit.com/r/memes/.json");
      const json = await response.json();
      const memeIndex = getRandomInt(1, json.data.dist);
      const memeUrl = json.data.children[memeIndex].data.url;
      const memeTitle = json.data.children[memeIndex].data.title;

      const MemeEmbed = new MessageEmbed()
        .setTitle("Meme")
        .setColor("#ff9966")
        .addField("Title", memeTitle, true)
        .setImage(memeUrl);

      await msg.channel.send(MemeEmbed);
    }

    // User Info Handler
    if (command === `user-info` || command === `userinfo`) {
      await msg.react("😎");
      const status = {
        online: "🟢 User is online!",
        idle: "🟡 User is idle, probably drinking a cup of tea",
        offline: "⚫ User is offline, probably sleeping ",
        dnd: "🔴 User doesn't want to be disturbed right now",
      };

      if (!args.length) {
        const userInfoEmbed = new MessageEmbed()
          .setColor("#ff9966")
          .setTitle("User Info")
          .setAuthor(msg.author.username)
          .setThumbnail(msg.author.avatarURL("PNG"))
          .addFields(
            {
              name: "👤 Username:",
              value: msg.author.username,
            },
            {
              name: "#️⃣ Tag:",
              value: msg.author.tag,
            },
            {
              name: "💳 ID:",
              value: msg.author.id,
            },
            {
              name: "🤖 Is a Bot? ",
              value: msg.author.bot ? "Yes" : "No",
            },
            {
              name: "🔰 Presence: ",
              value: status[msg.author.presence.status],
            },
            {
              name: "🎮 Is playing a game?",
              value: "Now Playing 👉" + msg.author.presence.activities,
            }
          );
        await msg.channel.send(userInfoEmbed);
      } else {
        const taggedUser = msg.mentions.users.first();
        const userInfoEmbed = new MessageEmbed()
          .setColor("#ff9966")
          .setTitle("User Info")
          .setAuthor(taggedUser.username)
          .setThumbnail(taggedUser.avatarURL("PNG"))
          .addFields(
            {
              name: "👤 Username:",
              value: taggedUser.username,
            },
            {
              name: "#️⃣ Tag:",
              value: taggedUser.tag,
            },
            {
              name: "💳 ID:",
              value: taggedUser.id,
            },
            {
              name: "🤖 Is a Bot? ",
              value: taggedUser.bot ? "Yes" : "No",
            },
            {
              name: "🔰 Presence: ",
              value: status[taggedUser.presence.status],
            },
            {
              name: "🎮 Is playing a game?",
              value:
                taggedUser.presence.activities.length !== 0
                  ? "Now Playing 👉" + taggedUser.presence.activities
                  : "Nope",
            }
          );
        await msg.channel.send(userInfoEmbed);
      }
    }

    // Help Handler
    if (command === "help") {
      const HelpEmbed = new MessageEmbed()
        .setColor("#ff9966")
        .setTitle("Help Message, Some of the commands you can use are")
        .addFields(
          {
            name: "!meme",
            value: "Get a random meme from reddit😂",
          },
          {
            name: "!userinfo or !user-info",
            value: "Get info about the message author.🤵",
          },
          {
            name: "!help or !halp",
            value: "Display this help message.📜",
          }
        );
      await msg.channel.send(HelpEmbed);
      await msg.react("🙋‍♂️");
    }

    // Welcome Handler
    if (command === "hello") {
      await msg.react("👋");
      await msg.channel.send(
        `Hi there! This is Meme-Generator-Bot. Primarily i can send you memes but if you want something more, type \`!help\``
      );
    }
  }
});

client.login(process.env.BOT_TOKEN);
