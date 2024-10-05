import { Client, IntentsBitField } from 'discord.js';

import Env from './env';
import { parseEmoji } from './utils/emojis.util';

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.login(Env.DISCORD_APP_TOKEN);

client.on('ready', () => {
  console.log('amethyst is ready');
});

// emoji factory
client.on('messageCreate', async (message) => {
  try {
    if (!message.guild) return;
    if (!Env.ALLOWED_EMOJI_CHANNEL_IDS.includes(message.channel.id)) return;
    if (!Env.ALLOWED_USER_IDS.includes(message.author.id)) return;

    const emoji = await parseEmoji(message.content);
    if (!emoji) return;

    let successfullyAddedEmoji = false;

    if (emoji) {
      const newEmoji = await message.guild.emojis.create({
        name: emoji.name,
        attachment: emoji.uri,
      });

      const reply = newEmoji.animated
        ? `成功加了表情包！:blush: \`:${newEmoji.name}:\` <a:${newEmoji.name}:${newEmoji.id}>`
        : `成功加了表情包！:blush: \`:${newEmoji.name}:\` <:${newEmoji.name}:${newEmoji.id}>`;

      message.reply(reply);

      successfullyAddedEmoji = true;
    }

    if (!successfullyAddedEmoji) {
      throw Error('不懂为什么，无法加表情包 :thinking:');
    }
  } catch (err) {
    message.reply(
      `不好意思，这里出了问题 :sweat:\n` +
        `求求你帮我嘛，我看不明白呢 :face_holding_back_tears:\n` +
        `\`\`\`\n${String(err)}\`\`\``,
    );
  }
});
