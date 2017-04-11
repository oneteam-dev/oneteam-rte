const createEmojiListWithOutHighPriorityList = (highPriorityKeys, emojiList) => {
  const list = {};
  const highPriorityList = {};
  for (const key in emojiList) {
    if (highPriorityKeys.includes(key)) {
      highPriorityList[key] = emojiList[key];
      continue;
    }
    list[key] = emojiList[key];
  }
  return { ...highPriorityList, ...list };
};

export default createEmojiListWithOutHighPriorityList;
