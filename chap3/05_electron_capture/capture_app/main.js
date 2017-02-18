/*
  'electron'을 사용하여 스크린 캡쳐
*/
const fs = require('fs');
const electron = require('electron');
const { app, BrowserWindow } = electron;

const URL = 'http://naver.com';

let win = null;

const saveImgAsPNG = (img) => {
  const png = img.toPNG();

  fs.writeFileSync('./capture.png', png);

  win.close();
};

const capturePage = () => {
  // wait for JS rendering
  setTimeout(() => {
    win.capturePage(saveImgAsPNG);
  }, 3000);
};

app.on('ready', () => {
  win = new BrowserWindow({
    width: 800, height: 600
  });

  win.loadURL(URL);
  win.webContents.on('did-finish-load', capturePage);

  win.on('closed', () => {
    win = null;
  });
});
