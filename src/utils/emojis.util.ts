import { EMimeType, convertImageURLtoURI } from './image.util';

export const parseEmoji = async (content: string) => {
  // animated emoji content <a:pepedistraught:1238422605782847599>
  const animatedEmojiRegex = /<a:[A-Za-z0-9_]+:[0-9]+>/;
  // static emoji content <:pepedistraught:1238422605782847599>
  const staticEmojiRegex = /<:[A-Za-z0-9_]+:[0-9]+>/;

  const isAnimatedEmoji = animatedEmojiRegex.test(content);
  const isStaticEmoji = staticEmojiRegex.test(content);

  let emojiName: string | null = null;
  let emojiURI: string | null = null;

  if (isAnimatedEmoji) {
    // remove leading '<a:' and trailing '>'
    const [_emojiName, _emojiId] = content
      .substring(3, content.length - 1)
      .split(':');

    emojiName = _emojiName;

    const gifURL = `https://cdn.discordapp.com/emojis/${_emojiId}.gif`;
    emojiURI = await convertImageURLtoURI(gifURL, EMimeType.PNG);
  } else if (isStaticEmoji) {
    // remove leading '<:' and trailing '>'
    const [_emojiName, _emojiId] = content
      .substring(2, content.length - 1)
      .split(':');

    emojiName = _emojiName;

    const pngURL = `https://cdn.discordapp.com/emojis/${_emojiId}.png`;
    emojiURI = await convertImageURLtoURI(pngURL, EMimeType.PNG);
  }

  if (emojiName && emojiURI) {
    return {
      name: `uu_${emojiName}`,
      uri: emojiURI,
    };
  } else {
    return null;
  }
};
