require("dotenv").config();
const fetch = require("node-fetch");
const Discord = require("discord.js");
const client = new Discord.Client();

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

client.once("ready", () => {
  console.log("BEEP BOOP ! Ready!");
});

client.on("message", async (msg) => {
  // for bot spam channel only and danky memes
  if (
    (msg.channel.id === "559781407753240588" &&
      msg.guild.id === "442723788732497936") ||
    (msg.channel.id === "704635164386525235" &&
      msg.guild.id === "613691957142880256")
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
