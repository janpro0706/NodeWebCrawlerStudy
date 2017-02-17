const electron = require('electron');
const { app, BrowserWindow, ipcMain: ipc } = electron;

const URL = 'http://naver.com';

let win = null;

app.on('ready', () => {
  win = new BrowserWindow({
    width: 800, height: 600
  });

  win.loadURL(URL);

  win.webContents.executeJavaScript(`
      const ipc = require('electron').ipcRenderer;

      ipc.on('reqDoc', (event) => {
        event.sender.send('resDoc', document.documentElement.innerHTML);
      });
  `);

  win.webContents.on('did-finish-load', (event) => {
    event.sender.send('reqDoc');
  });

  ipc.on('resDoc', (event, html) => {
    console.log(html);
    win.close();
  });

  win.on('closed', () => {
    win = null;
  });
});
