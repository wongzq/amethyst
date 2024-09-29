# Discord.js Bot

This is a discord.js bot that helps uploads static and animated emojis to your server in a very easy manner.

All you have to do is use your emoji in a specified channel.

![example screenshot](/README-images/example-screenshot.png)

The only data you need to supply is

```bash
DISCORD_APP_TOKEN=""

ALLOWED_EMOJI_CHANNEL_IDS=""

ALLOWED_USER_IDS=""
```

- `DISCORD_APP_TOKEN` - This is pretty self-explanatory, you can obtain this token from the `Discord Developer Portal > Applications > [Your App] > Bot > Token`

- `ALLOWED_EMOJI_CHANNEL_IDS` - This env var accepts comma separated values for multiple channel IDs, e.g. "12345, 67890, 123789" or "1234,5678,90123". The automatic upload logic will only run in the allowed channels.

- `ALLOWED_USER_IDS` - this env var accepts comma separated values for multiple user IDs, e.g. "12345, 67890, 123789" or "1234,5678,90123". Only allowed users' emojis will be considered.
