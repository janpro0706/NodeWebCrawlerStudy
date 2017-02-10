/*
  p78. 기상청으로부터 rss 데이터 취득
*/
import assert from 'assert';
import { parseString } from 'xml2js';
import request from 'request';

const RSS = 'http://web.kma.go.kr/weather/forecast/mid-term-rss3.jsp?stnID=109';

request(RSS, (err, res, body) => {
  assert.equal(null, err);

  if (res.statusCode == 200) {
    analyzeRSS(body);
  }
});

const analyzeRSS = (xml) => {
  parseString(xml, (err, obj) => {
    assert.equal(null, err);

    console.dir(obj.rss.channel[0].item[0].description[0].body[0].location[0]);
    const { data: datas, city } = obj.rss.channel[0].item[0].description[0].body[0].location[0];

    for (let data of datas) {
      console.dir(data);
      console.log(`${city} ${data.tmEf} ${data.wf} ${data.tmn} ~ ${data.tmx}`);
    }
  });
};
