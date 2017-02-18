/*
  3. flickr 사이트의 '고양이' 검색 결과 스크린 캡쳐. viewport와 userAgent 등 지정
*/
const casper = require('casper').create();

const TARGET_URL = 'https://flickr.com/search/?text=' + encodeURIComponent('고양이');

casper.start();

casper.viewport(1400, 800);
casper.userAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3013.0 Safari/537.36');

casper.open(TARGET_URL);

casper.then(function() {
  casper.capture('flickr-cat.png', {
    left: 0, top: 0, width: 1400, height: 800
  });
});

casper.run();
