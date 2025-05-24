import { EMimeType, convertImageURLtoURI } from './image.util';

export const parseEmoji = async (content: string) => {
  // animated emoji content <a:pepedistraught:1238422605782847599>
  const animatedEmojiRegex = /<a:[A-Za-z0-9_]+:[0-9]+>/;
  // static emoji content <:pepedistraught:1238422605782847599>
  const staticEmojiRegex = /<:[A-Za-z0-9_]+:[0-9]+>/;
  // animated emoji link content https://cdn.discordapp.com/emojis/1285818661902221344.webp?size=96&animated=true
  const animatedEmojiLinkRegex =
    /^https:\/\/cdn\.discordapp\.com\/emojis\/[0-9]+\.webp\?size=[0-9]+&animated=true [A-Za-z0-9_]+$/;
  // static emoji link content https://cdn.discordapp.com/emojis/1235181441957105674.webp?size=96
  const staticEmojiLinkRegex =
    /^https:\/\/cdn\.discordapp\.com\/emojis\/[0-9]+\.webp\?size=[0-9]+ [A-Za-z0-9_]+$/;

  const isAnimatedEmoji = animatedEmojiRegex.test(content);
  const isStaticEmoji = staticEmojiRegex.test(content);
  const isAnimatedEmojiLink = animatedEmojiLinkRegex.test(content);
  const isStaticEmojiLink = staticEmojiLinkRegex.test(content);

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
  } else if (isAnimatedEmojiLink || isStaticEmojiLink) {
    const [_emojiURI, _emojiName] = content.split(' ');
    emojiName = _emojiName;
    emojiURI = _emojiURI;
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
