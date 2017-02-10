/*
  p49. getpage.js와 같지만 'cheerio-httpcli' 의존 모듈인 'cheerio' + 'request'를 사용하여 구현
*/
import assert from 'assert';
import request from 'request';
import cheerio from 'cheerio';

request('http://jpub.tistory.com/', (err, res) => {
  assert.equal(null, err);

  const $ = cheerio.load(res.body);
  const body = $.html();

  console.log(body);
});
