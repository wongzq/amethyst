import { EMimeType, convertImageURLtoURI } from './image.util';

export const parseEmoji = async (content: string) => {
  console.log('content', content);

  // animated emoji content <a:pepedistraught:1238422605782847599>
  const animatedEmojiRegex = /^<a:[A-Za-z0-9_]+:[0-9]+>$/;
  // static emoji content <:pepedistraught:1238422605782847599>
  const staticEmojiRegex = /^<:[A-Za-z0-9_]+:[0-9]+>$/;
  // animated emoji content <a:pepedistraught:1238422605782847599
  const animatedEmojiNoServerRegex = /^<a:[A-Za-z0-9_]+:[0-9]+$/;
  // static emoji content <:pepedistraught:1238422605782847599
  const staticEmojiNoServerRegex = /^<:[A-Za-z0-9_]+:[0-9]+$/;

  const isAnimatedEmoji = animatedEmojiRegex.test(content);
  const isStaticEmoji = staticEmojiRegex.test(content);
  const isAnimatedEmojiNoServer = animatedEmojiNoServerRegex.test(content);
  const isStaticEmojiNoServer = staticEmojiNoServerRegex.test(content);

  let emojiName: string | null = null;
  let emojiURI: string | null = null;

  if (isAnimatedEmoji) {
    // remove leading '<a:' and trailing '>'
    const [_emojiName, _emojiId] = content
      .substring(3, content.length - 1)
      .split(':');

    emojiName = `uu_${_emojiName}`;

    const gifURL = `https://cdn.discordapp.com/emojis/${_emojiId}.gif`;
    emojiURI = await convertImageURLtoURI(gifURL, EMimeType.PNG);
  } else if (isStaticEmoji) {
    // remove leading '<:' and trailing '>'
    const [_emojiName, _emojiId] = content
      .substring(2, content.length - 1)
      .split(':');

    emojiName = `uu_${_emojiName}`;

    const pngURL = `https://cdn.discordapp.com/emojis/${_emojiId}.png`;
    emojiURI = await convertImageURLtoURI(pngURL, EMimeType.PNG);
  } else if (isAnimatedEmojiNoServer) {
    // remove leading '<a:'
    const [_emojiName, _emojiId] = content
      .substring(3, content.length)
      .split(':');

    emojiName = `uu_${_emojiName}`;

    const gifURL = `https://cdn.discordapp.com/emojis/${_emojiId}.gif`;
    emojiURI = await convertImageURLtoURI(gifURL, EMimeType.PNG);
  } else if (isStaticEmojiNoServer) {
    // remove leading '<:'
    const [_emojiName, _emojiId] = content
      .substring(2, content.length)
      .split(':');

    emojiName = `uu_${_emojiName}`;

    const pngURL = `https://cdn.discordapp.com/emojis/${_emojiId}.png`;
    emojiURI = await convertImageURLtoURI(pngURL, EMimeType.PNG);
  }

  if (emojiName && emojiURI) {
    return {
      name: emojiName,
      uri: emojiURI,
    };
  } else {
    return null;
  }
};
