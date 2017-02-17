const casper = require('casper').create();

const TARGET_URL = 'http://jpub.tistory.com';

casper.start();

casper.open(TARGET_URL);

casper.then(function() {
  casper.capture('capture.png');
});

casper.run();
