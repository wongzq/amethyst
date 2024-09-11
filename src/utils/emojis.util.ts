export const parseEmoji = (content: string) => {
  // animated emoji content <a:pepedistraught:1238422605782847599>
  const animatedEmojiRegex = /<a:[A-Za-z0-9_]+:[0-9]+>/;
  // static emoji content <:pepedistraught:1238422605782847599>
  const staticEmojiRegex = /<:[A-Za-z0-9_]+:[0-9]+>/;

  const isAnimatedEmoji = animatedEmojiRegex.test(content);
  const isStaticEmoji = staticEmojiRegex.test(content);

  if (isAnimatedEmoji) {
    // remove leading '<a:' and trailing '>'
    const [emojiName, emojiId] = content
      .substring(3, content.length - 1)
      .split(":");

    return {
      id: emojiId,
      name: emojiName,
      animated: true,
    };
  } else if (isStaticEmoji) {
    // remove leading '<:' and trailing '>'
    const [emojiName, emojiId] = content
      .substring(2, content.length - 1)
      .split(":");

    return {
      id: emojiId,
      name: emojiName,
      animated: false,
    };
  } else {
    return null;
  }
};
