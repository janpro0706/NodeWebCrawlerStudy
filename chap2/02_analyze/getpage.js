/*
  p49. 'cheerio-httpcli' 모듈을 사용하여 웹 페이지 스크래핑
*/

import assert from 'assert';
import client from 'cheerio-httpcli';

const url = "http://jpub.tistory.com";
const param = {};

client.fetch(url, param, (err, $, res) => {
  assert.equal(null, err);

  const body = $.html();
  console.log(body);
});
