/*
  p71. 'xml2js' 모듈을 이용하여 xml string을 json으로 변환
*/
import { parseString } from 'xml2js';

const xml = '<fruits shop="AAA">' +
  '<item price="140">Banana</item>' +
  '<item price="200">Apple</item>' +
  '</fruits>';

parseString(xml, (err, res) => {
  console.log(JSON.stringify(res));
});
