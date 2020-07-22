require("dotenv").config();
const fetch = require("node-fetch");
const { Client, MessageEmbed } = require("discord.js");
const client = new Client();

// specific channel ids
const SclGuild = "442723788732497936";
const SclChannel = "559781407753240588";
const EdutipsChannel = "704635164386525235";
const EdutipsGuild = "613691957142880256";
const TechnicalGuild = "575045205275705354";
const TechnicalChannel = "577091481844580372";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

client.once("ready", () => {
  console.log("BEEP BOOP ! Ready!");
});

client.on("message", async (msg) => {
  if (!msg.content.startsWith("!") || msg.author.bot) return;

  if (
    (msg.channel.id === SclChannel && msg.guild.id === SclGuild) ||
    (msg.channel.id === EdutipsChannel && msg.guild.id === EdutipsGuild) ||
    (msg.channel.id === TechnicalChannel && msg.guild.id === TechnicalGuild)
  ) {
    // Meme Handler
    if (msg.content === `!meme`) {
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
    if (msg.content === `!user-info` || msg.content === `!userinfo`) {
      await msg.react("😎");
      const status = {
        online: "🟢 User is online!",
        idle: "🟡 User is idle, probably drinking a cup of tea",
        offline: "⚫ User is offline, probably sleeping ",
        dnd: "🔴 User doesn't want to be disturbed right now",
      };

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
    }

    // Help Handler
    if (msg.content === "!help" || msg.content === "!halp") {
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
    if (msg.content === "!hello") {
      await msg.react("👋");
      await msg.channel.send(
        `Hi there! This is Meme-Generator-Bot. Primarily i can send you memes but if you want something more, type \`!help\``
      );
    }
  }
});

client.login(process.env.BOT_TOKEN);
