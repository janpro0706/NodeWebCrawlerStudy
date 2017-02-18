/*
  p62. 아카이브(?) 웹 서버의 모든 문서를 다운 받는 프로그램
*/
import assert from 'assert';
import request from 'request';
import client from 'cheerio-httpcli';
import urlType from 'url';
import fs from 'fs';
import path from 'path';

const LINK_LEVEL = 3;
const TARGET_URL = 'http://nodejs.jp/nodejs.org_ja/docs/v0.10/api/';
const list = {};

const downloadRec = (url, level) => {
  if (level > LINK_LEVEL) return;

  if (list[url]) return;
  list[url] = true;

  if (url.indexOf(TARGET_URL) < 0) return;

  client.fetch(url, (err, $, res) => {
    assert.equal(null, err);

    // find <a> tag for next crawling
    $('a').each(function(idx) {
      const href = $(this).attr('href');
      if (!href) return;

      const link = urlType.resolve(url, href);
      const uniqueLink = link.replace(/\#.+$/, '');

      downloadRec(uniqueLink, level + 1);
    });

    const savepath = url.split('/').slice(2).join('/');
    const savepathWithIndex = (savepath.substr(savepath.length - 1, 1) == '/' ? savepath + 'index.html' : savepath);
    checkSaveDir(savepathWithIndex);
    fs.writeFileSync(savepathWithIndex, $.html());
  });
};

const checkSaveDir = (savepath) => {
  console.log(savepath);
  const dir = path.dirname(savepath);
  console.log(dir);

  const innerDirs = dir.split('/');
  let curDir = '';

  for (let d of innerDirs) {
    curDir += d + '/';
    if (!fs.existsSync(curDir)) {
      fs.mkdirSync(curDir);
    }
  }
};

downloadRec(TARGET_URL, 0);
