require("dotenv").config();
const fetch = require("node-fetch");
const Discord = require("discord.js");
const client = new Discord.Client();

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
  if (
    (msg.channel.id === SclChannel && msg.guild.id === SclGuild) ||
    (msg.channel.id === EdutipsChannel && msg.guild.id === EdutipsGuild) ||
    (msg.channel.id === TechnicalChannel && msg.guild.id === TechnicalGuild)
  ) {
    let regex = /^!meme/i;

    if (regex.exec(msg.content)) {
      const response = await fetch("https://www.reddit.com/r/memes/.json");
      const json = await response.json();
      const memeIndex = getRandomInt(1, json.data.dist);
      const memeUrl = json.data.children[memeIndex].data.url;
      const memeTitle = json.data.children[memeIndex].data.title;
      await msg.channel.send(memeTitle);
      await msg.channel.send(memeUrl);
    }
  }
});

client.login(process.env.BOT_TOKEN);
