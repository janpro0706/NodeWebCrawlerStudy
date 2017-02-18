/*
  2. 특정문서의 스크린 캡쳐
*/
const casper = require('casper').create();

const TARGET_URL = 'http://jpub.tistory.com';

casper.start();

casper.open(TARGET_URL);

casper.then(function() {
  casper.capture('capture.png');
});

casper.run();
