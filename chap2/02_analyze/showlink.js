/*
  p51. 스크랩한 웹 페이지에 존재하는 링크 추출
*/
import assert from 'assert';
import client from 'cheerio-httpcli';

const url = 'http://jpub.tistory.com';
const param = {};

client.fetch(url, param, (err, $, res) => {
  assert.equal(null, err);

  $('a').each(function (idx) {
    const text = $(this).text();
    const href = $(this).attr('href');

    console.log(`${text} : ${href}`);
  });
});
