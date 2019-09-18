const LoremIpsum = require("lorem-ipsum").LoremIpsum;
const _ = require('lodash');

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

const fns = {
  loremIpsum: (type, ...args) => {
    switch (type) {
      case 'words':
        return lorem.generateWords(args[0] || 1);
        break;
      case 'sentences':
        return lorem.generateSentences(args[0] || 1);
        break;

      default:
        throw new Error('loremIpsum cannot recognize type: ' + type)
    }
  },
  images: (type) => {
    const num = 1 + _.random(0, 10);
    if (num > 8) return '';
    return `<img src="img/${type}/${num}.jpeg" />`;
  },
  richParagraphs(type, num) {
    let out = fns.loremIpsum(type, num);
    return out.split(/[\s]+/g)
      .map(word => {
        const n = _.random(0, 12);

        if (n < 3) return '<b>' + word + '</b>';
        if (n === 3) return '<span class="block">' + word + '</span>';
        return word
      }).join(' ' );
  },
  ..._
};

module.exports = fns;
