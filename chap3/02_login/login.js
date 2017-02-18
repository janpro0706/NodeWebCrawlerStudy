/*
  로그인이 필요한 경우 mouseEvent 발생, form submit 등 브라우저 엔진의 기능을 사용
*/
const casper = require('casper').create({ logLevel: 'debug' });

casper.start();

casper.open('https://janpro.tistory.com/admin/center');

casper.then(function() {
  this.echo(casper.getTitle());

  casper.mouseEvent('click', '#authForm .link_daumlogin');
  casper.wait(1000);
});

casper.then(function() {
  this.echo(casper.getTitle());

  casper.fill('#loginForm', require('./user.config.js'), true);

  casper.wait(1000);
});

casper.then(function() {
  if (casper.exists('#blogInfo > ul:nth-child(1) > li:nth-child(2) > span.day')) {
    this.echo(casper.getHTML('#blogInfo > ul:nth-child(1) > li:nth-child(2) > span.day'));
  }
});

casper.run();
