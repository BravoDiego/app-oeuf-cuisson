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


const eggCookTimes = {
  180: "soft",
  360: "medium",
  540: "hard",
  720: "extra-hard"
};

const choice = document.querySelector('#choice h2');
let timerCountDown = document.querySelector('#choice h3#timer-text');
let image = document.querySelector('#image-cooked');
let alarmSound = new Audio('./assets/alarm.ogg');
let cuisson = "";
if (choice && timerCountDown && image) {
  window.electronAPI.getTimer().then(savedTime => {
    cuisson = eggCookTimes[savedTime]
    choice.textContent = `You chose ${cuisson} eggs.`;
    image.classList.add(cuisson);
    startTimer(savedTime);
  });
}

function formatTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  let secs = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function startTimer(seconds) {
  timerCountDown.textContent = formatTime(seconds);
  let snoozeBtn = document.querySelector('button#snooze');
  let backBtn = document.querySelector('button#back');

  let interval = setInterval(() => {
      seconds--;
      timerCountDown.textContent = formatTime(seconds);
      
      if (seconds <= 0) {
          clearInterval(interval);
          timerCountDown.textContent = "";
          timerCountDown.classList.toggle('hidden');
          snoozeBtn.classList.toggle('hidden');
          backBtn.classList.toggle('hidden');
          alarmSound.loop = true;
          alarmSound.play();
      }
  }, 1000);

  snoozeBtn.addEventListener('click', () => {
    alarmSound.pause();
    alarmSound.currentTime = 0; // Remet au début
});
}