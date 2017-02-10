/*
  weather과 같음. 'cheerio-httpcli' 모듈을 사용하여 기상청 데이터 취득
*/
import assert from 'assert';
import client from 'cheerio-httpcli';

const RSS = 'http://web.kma.go.kr/weather/forecast/mid-term-rss3.jsp?stnID=109';

client.fetch(RSS, {}, (err, $, res) => {
  const city = $('location:nth-child(1) > city').text();

  $('location:nth-child(1) > data').each(function(idx) {
    const tmEf = $(this).find('tmEf').text();
    const wf = $(this).find('wf').text();
    const tmn = $(this).find('tmn').text();
    const tmx = $(this).find('tmx').text();

    console.log(`${city} ${tmEf} ${tmn} ~ ${tmx}`);
  });
});
