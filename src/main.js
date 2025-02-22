const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

let timerValue = 0;

function createWindow () {
  const mainWindow = new BrowserWindow({
        width: 600,
        height: 500,
        frame: false, // Supprime la barre classique
        resizable: false,
        webPreferences: {
          nodeIntegration: true,
          preload: path.join(__dirname, '..', '..', 'src', 'preload.js')
        }
  })

  ipcMain.on('set-title', (event, title) => {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.setTitle(title)
  })

  ipcMain.on('exit-app', () => {
    app.quit()
  })

  ipcMain.on('minimize-app', (event) => {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.minimize()
  })

  ipcMain.on('save-timer', (event, time) => {
    timerValue = time;
  });
  
  ipcMain.handle('get-timer', () => timerValue);

  mainWindow.loadFile('src/menu.html')
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