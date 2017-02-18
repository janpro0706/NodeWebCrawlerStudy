/*
  * 'getall.js'을 다시 작성. 재귀호출에서 큐 while문으로 대체. 해당문서의 css 파일도 다운
*/
import assert from 'assert';
import client from 'cheerio-httpcli';
import request from 'request';
import fs from 'fs';
import path from 'path';
import urlType from 'url';

const URL = 'http://nodejs.jp/nodejs.org_ja/docs/v0.10/api/';
// const URL = 'https://namu.wiki/';

const archive = (enterUrl, MAX_COUNT = 100) => {
  const queue = [enterUrl];
  const visitedUrl = {};
  let visitCount = 0;

  while (queue.length > 0 && visitCount < MAX_COUNT) {
    const url = queue.pop();

    console.log('url: ' + url);

    if (visitedUrl[url]) continue;
    visitedUrl[url] = true;
    if (url.indexOf(URL) < 0) continue;
    visitCount++;

    console.log('new url: ' + url + ' visitcount: ' + visitCount);

    const $ = client.fetchSync(url).$;

    // scrap for next crawling url
    $('a').each(function(idx) {
      const href = $(this).attr('href');
      if (!href) return;

      const link = urlType.resolve(URL, href).replace(/\#.+$/g, '');

      queue.push(link);
    });

    // download css
    $('link').each(function(idx) {
      const rel = $(this).attr('rel');
      if (rel !== 'stylesheet') return;

      const href = $(this).attr('href');
      const link = urlType.resolve(URL, href).replace(/\?.+$/g, '');

      const savePath = getSavePath(link);
      client.fetch(link, (err, $, res) => {
        fs.writeFileSync(savePath, $.html());
      });
    });

    const savePath = getSavePath(url);
    const savePathWithIndex = (savePath.substr(savePath.length - 1, 1) == '/' ? savePath + 'index.html' : savePath);
    fs.writeFileSync(savePathWithIndex, $.html());
  }
};

const getSavePath = (url) => {
  const savePath = url.split('/').slice(2).join('/');
  const dirs = path.dirname(savePath).split('/');
  let curDir = '';

  for (let dir of dirs) {
    curDir += dir + '/';

    if (!fs.existsSync(curDir)) {
      fs.mkdirSync(curDir);
    }
  }

  // console.log(savePath);
  return savePath;
};

archive(URL);
