require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();

client.once("ready", () => {
  console.log("BEEP BOOP ! Ready! 🤖 ");
});

client.on("message", async (msg) => {
  // for edutips unlimited bot spam channel

  if (
    msg.channel.id === "704635164386525235" &&
    msg.guild.id === "613691957142880256"
  ) {
    if (msg.content.toLowerCase() === "ping") {
      await msg.channel.send("pong ! ");
      console.log("reply sent");
    }

    let regex = /^!meme/i;

    if (regex.exec(msg.content)) {
      await msg.channel.send("memes coming peeps....");
    }
  }
});

client.login(process.env.BOT_TOKEN);
