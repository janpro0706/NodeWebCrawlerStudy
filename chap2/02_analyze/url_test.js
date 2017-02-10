/*
  p54. 'url' 모듈을 사용하여 상대 경로 resolve
*/
import urlType from 'url';

const base = 'http://kujirahand.com/url/test/index.html';

const u1 = urlType.resolve(base, 'a.html');
const u2 = urlType.resolve(base, '../b.html');
const u3 = urlType.resolve(base, '/c.html');

console.log(`u1 = ${u1}`);
console.log(`u2 = ${u2}`);
console.log(`u3 = ${u3}`);
