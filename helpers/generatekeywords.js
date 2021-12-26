const createKeywords = (word) => {
  const arr = [];
  let str = "";
  word.split("").forEach((char) => {
    str += char;
    str.toLowerCase();
    arr.push(str);
  });

  return arr;
};

const generateKeywords = (title) => {
  const keywords = [];
  const words = title.split(" ");
  let sampleStr = "";
  for (let j = 0; j < words.length; j++) {
    sampleStr = "";
    for (let index = j; index < words.length; index++) {
      if (index != j) {
        sampleStr += " ";
      }
      sampleStr += words[index];
      sampleStr.toLowerCase();
      keywords.push(...createKeywords(sampleStr));
    }
  }

  keywords = keywords.map((keyword) => keyword.toLowerCase());

  return [...new Set(keywords)];
};

export default generateKeywords;
