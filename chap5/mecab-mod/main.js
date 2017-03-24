import Mecab from './mecab-mod';

const mecab = new Mecab();

const text = '아버지가 방에 들어가신다.';

const words = mecab.parse(text);

console.log(words);
