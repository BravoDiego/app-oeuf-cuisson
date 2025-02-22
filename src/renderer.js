const setButton = document.getElementById('btn')
const titleInput = document.getElementById('title')

if (setButton && titleInput) {
  setButton.addEventListener('click', () => {
    const title = titleInput.value;
    window.electronAPI.setTitle(title);
  });
}

document.getElementById("exit-btn").addEventListener('click', () => {
  window.electronAPI.exitApp();
});

document.getElementById("minimize-btn").addEventListener('click', () => {
  window.electronAPI.minimizeApp();
});