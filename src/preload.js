const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  setTitle: (title) => ipcRenderer.send('set-title', title),
  exitApp : () => ipcRenderer.send('exit-app'),
  minimizeApp : () => ipcRenderer.send('minimize-app'),
})