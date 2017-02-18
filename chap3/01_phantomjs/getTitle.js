/*
  1. 특정 문서의 <title> 요소 추출
*/
const casper = require('casper').create();

const TARGET_URL = 'http://jpub.tistory.com';

casper.start(TARGET_URL, function() {
  this.echo(casper.getTitle());
});

// above code equals below
// casper.start();
// casper.open(TARGET_URL);
// casper.then(function() {
//   this.echo(casper.getTitle());
// });

casper.run();
