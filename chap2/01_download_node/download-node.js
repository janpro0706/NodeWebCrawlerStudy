/*
	p43. 'http' 모듈을 사용하여 웹 페이지 다운로드
*/

import http from 'http';
import fs from 'fs';

const url = "http://jpub.tistory.com/";
const savepath = "test.html";

const httpGetSync = (url) => {
	return new Promise((resolve, reject) => {
		http.get(url, (res) => {
			resolve(res);
		});
	});
};

const saveHtml = (res) => {
	res.pipe(fs.createWriteStream(savepath));
	res.on('end', () => {
		outfile.close();
		console.log('end');
	});
};

httpGetSync(url).then(saveHtml);

// http.get(url, saveHtml);
