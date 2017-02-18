/*
  2. ipc모듈을 사용하여 메인 - 렌더러 프로세스 간 동기/비동기 통신
*/
const electron = require('electron');
const { app, BrowserWindow, ipcMain: ipc } = electron;

app.on('ready', () => {
  let win = new BrowserWindow({
    width: 800, height: 600
  });

  win.loadURL(`file://${__dirname}/index.html`);

  // async comm
  ipc.on('mul_async', (event, {a, b}) => {
    event.sender.send('mul_async_res', a * b);
  });

  // sync comm
  ipc.on('mul_sync', (event, {a, b}) => {
    event.returnValue = a * b;
  });

  win.on('closed', () => {
    win = null;
  });
});
