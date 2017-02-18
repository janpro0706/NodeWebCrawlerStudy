/*
	1. 'electron'을 사용하여 일반 웹 사이트 문서 및 electron html 문서 load
*/
const electron = require('electron');
const { app, BrowserWindow } = electron;

// const URL = 'https://ko.wikipedia.org/';
const URL = `file://${__dirname}/index.html`;

let win = null;

// ready for main process
app.on('ready', () => {
	win = new BrowserWindow({
		width: 800,
		height: 600
	});

	win.loadURL(URL);

	win.on('closed', () => {
		win = null;
	})
});
