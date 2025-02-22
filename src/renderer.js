const setButton = document.getElementById('btn')
const titleInput = document.getElementById('title')

setButton.addEventListener('click', () => {
  const title = titleInput.value
  window.electronAPI.setTitle(title)
})

const exitButton = document.getElementById('exit')
exitButton.addEventListener('click', () => {
  window.electronAPI.exitApp()
})

const minimizeButton = document.getElementById('minimize')
minimizeButton.addEventListener('click', () => {
  window.electronAPI.minimizeApp()
})