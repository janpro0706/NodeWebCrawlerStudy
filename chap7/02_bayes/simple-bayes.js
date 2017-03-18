import bayes from 'bayes';
import Mecab from './mecab-mod';
import sampleData from './sample-text';

const mecab = new Mecab();

const t_jang = sampleData.jang;

const t_lee = sampleData.lee;

const classifier = bayes({
  tokenizer: mecab.parse
});

const categorize = text => {
  const r = classifier.categorize(text);
  console.log(`카테고리=[${r}] - ${text}`);
};

classifier.learn(t_jang, '장영실');
classifier.learn(t_lee, '이순신');

categorize('임진왜란의 장군으로 조선의 무신');
categorize('조선 최고의 과학자');
categorize('자격루를 만든 사람');
