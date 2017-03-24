import Mecab from './mecab-mod';
import Keyword from './models/Keyword';

const mecab = new Mecab();

let dictionary;
const getResponse = async (msg) => {
  const words = mecab.parse(msg);

  const response = [];

  for (let w of words) {
    const availDict = await Keyword.find({ key: w[0] });
    const dict = availDict.filter(r => r.pattern == '*' || msg.indexOf(r.pattern) > 0);

    response.push(dict.map(d => d.msg).join(' '));
  }

  return response;
};

export default class ChatBot {
  constructor(dict) {
    dictionary = dict;
  }

  static async talk(msg, cb) {
    const response = await getResponse(msg);
    return response.join('\n');
  }
};
