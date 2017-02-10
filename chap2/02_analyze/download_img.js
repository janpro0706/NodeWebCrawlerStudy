/*
  p58. 웹페이지 스크랩 후 페이지 내에 있는 이미지 다운로드
*/
import assert from 'assert';
import request from 'request';
import client from 'cheerio-httpcli';
import fs from 'fs';
import urlType from 'url';
import path from 'path';

const imgDir = path.join(__dirname, 'img');
if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir);
}

const url = 'https://ko.wikipedia.org/wiki/' + encodeURIComponent('강아지');
const param = {};

client.fetch(url, param, (err, $, res) => {
  assert.equal(null, err);

  $('img').each(function(idx) {
    const src = $(this).attr('src');
    if (!src) return;

    let fname = urlType.parse(src).pathname;
    console.log(fname);
    fname = `${imgDir}/${fname.replace(/[^a-zA-Z0-9\.]+/g, '_')}`;

    const imgUrl = urlType.resolve(url, src);
    request(imgUrl).pipe(fs.createWriteStream(fname));
  });
});
