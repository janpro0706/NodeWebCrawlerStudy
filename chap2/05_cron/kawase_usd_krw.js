/*
  p84. 환율 정보 가져오는 프로그램. cron 등 스케줄링 사용
*/
import assert from 'assert';
import request from 'request';
import fs from 'fs';

const API = 'http://api.aoikujira.com/kawase/get.php?code=USD&format=json';

request(API, (err, res, body) => {
  assert.equal(null, err);
  assert.equal(200, res.statusCode);

  const r = JSON.parse(body);
  const krw = r['KRW'];

  const t = new Date();
  const fname = `USD_KRW_${t.getFullYear()}-${t.getMonth() + 1}-${t.getDay()}.txt`;
  const text = `1usd=${krw}krw`;
  console.log(text);
  fs.writeFile(fname, text);
});
