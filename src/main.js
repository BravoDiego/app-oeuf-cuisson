const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

let timerValue = 0;

function createWindow () {
  const mainWindow = new BrowserWindow({
        width: 380,
        height: 455,
        resizable: false,
        autoHideMenuBar: true,
        // icon: path.join(__dirname,'..', '..', 'src' 'assets', 'icon.png'),
        webPreferences: {
          nodeIntegration: true,
          preload: path.join(__dirname, '..', '..', 'src', 'preload.js')
        }
  })

  ipcMain.handle('get-timer', () => timerValue);

  ipcMain.on('exit-app', () => {
    app.quit()
  })

  ipcMain.on('minimize-app', (event) => {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.minimize()
  })

  ipcMain.on('save-timer', (event, time) => {
    timerValue = parseInt(time, 10);
  });

  mainWindow.loadFile('src/index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})