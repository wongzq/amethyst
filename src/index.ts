import { Client, IntentsBitField } from "discord.js";
import { parseEmoji } from "./utils/emojis.util";
import { convertImageURLtoURI } from "./utils/image.util";
import Env from "./env";

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.login(Env.DISCORD_APP_TOKEN);

client.on("ready", () => console.log("amethyst is ready"));

client.on("messageCreate", async (message) => {
  try {
    const emoji = parseEmoji(message.content);

    if (!message.guild) return;
    if (!Env.ALLOWED_CHANNEL_IDS.includes(message.channel.id)) return;
    if (!Env.ALLOWED_USER_IDS.includes(message.author.id)) return;
    if (!emoji) return;

    let successfullyAddedEmoji = false;

    const imageURL = emoji.animated
      ? `https://cdn.discordapp.com/emojis/${emoji.id}.gif`
      : `https://cdn.discordapp.com/emojis/${emoji.id}.png`;

    const imageURI = await convertImageURLtoURI(imageURL);

    if (imageURI) {
      const newEmoji = await message.guild.emojis.create({
        name: `uu_${emoji.name}`,
        attachment: imageURI,
      });

      const reply = newEmoji.animated
        ? `成功加了表情包！:blush: \`:${newEmoji.name}:\` <a:${newEmoji.name}:${newEmoji.id}>`
        : `成功加了表情包！:blush: \`:${newEmoji.name}:\` <:${newEmoji.name}:${newEmoji.id}>`;

      message.reply(reply);
      console.log(reply);

      successfullyAddedEmoji = true;
    }

    if (!successfullyAddedEmoji) {
      throw Error("不懂为什么，无法加表情包 :thinking:");
    }
  } catch (err) {
    message.reply(
      `不好意思，这里出了问题 :sweat:\n` +
        `求求你帮我嘛，我看不明白呢 :face_holding_back_tears:\n` +
        `\`\`\`\n${String(err)}\`\`\``
    );
  }
});
