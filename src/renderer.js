const setButton = document.getElementById('btn')
const titleInput = document.getElementById('title')

if (setButton && titleInput) {
  setButton.addEventListener('click', () => {
    const title = titleInput.value;
    window.electronAPI.setTitle(title);
  });
}

window.electronAPI.getTimer().then(savedTime => {
  console.log(`Le temps enregistré est de ${savedTime} secondes.`);
});

document.getElementById("exit-btn").addEventListener('click', () => {
  window.electronAPI.exitApp();
});

document.getElementById("minimize-btn").addEventListener('click', () => {
  window.electronAPI.minimizeApp();
});

const timerBtn = document.querySelectorAll('.timer-btn');
if (timerBtn) {
  timerBtn.forEach(button => {
    button.addEventListener('click', () => {
        let time = button.getAttribute('data-time');
        window.electronAPI.saveTimer(time);
        window.location.href = 'eggTimer.html';
    });
  });
}

const choice = document.querySelector('#choice h2');
let timerCountDown = document.querySelector('#choice h3#timer-text');
if (choice && timerCountDown) {
  window.electronAPI.getTimer().then(savedTime => {
    choice.textContent = `Vous avez choisi un temps de ${savedTime} secondes.`;
    startTimer(savedTime);
  });
}

function startTimer(seconds) {
  timerCountDown.textContent = `${seconds} secondes restantes`;
  let snoozeBtn = document.querySelector('button#snooze');
  let backBtn = document.querySelector('button#back');
  
  let interval = setInterval(() => {
      seconds--;
      timerCountDown.textContent = `${seconds} secondes restantes`;
      
      if (seconds <= 0) {
          clearInterval(interval);
          timerCountDown.textContent = "Terminé ! 🥚";
          snoozeBtn.classList.toggle('hidden');
          backBtn.classList.toggle('hidden');

      }
  }, 1000);
}