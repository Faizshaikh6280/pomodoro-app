const btnSetting = document.querySelector(".settings");
const gearImg = btnSetting.querySelector("img");
const btnStart = document.querySelector(".start");
const minute = document.querySelector(".minutes");
const inputMinute = minute.querySelector("input");
const second = document.querySelector(".seconds");
const inputSecond = second.querySelector("input");
const inputs = document.querySelectorAll("input");
const ring = document.querySelector(".ring");
const music = document.querySelector("#audio");
// To place input cursor at the end of the number.
const PosEnd = function (input) {
  const len = input.value.length;
  if (input.setSelectionRange) {
    input.setSelectionRange(len, len);
    input.focus();
  }
};

// Timer functionality
let timer;
let isSet = false;
let isStart = false;
let timeInSeconds = 0;
const startTimer = function () {
  timeInSeconds =
    Number.parseInt(+inputMinute.value * 60) +
    Number.parseInt(+inputSecond.value);
  if (!timeInSeconds) {
    btnStart.textContent = "start";
    return;
  }
  if (timeInSeconds > 0) ring.classList.remove("ending");
  // printing remaining time on DOM
  const tick = function () {
    const min = Math.trunc(timeInSeconds / 60);
    const sec = Math.trunc(timeInSeconds % 60);
    inputMinute.value = `${min}`.padStart(2, 0);
    inputSecond.value = `${sec}`.padStart(2, 0);

    if (timeInSeconds === 0) {
      // alert("TIME OVER");
      clearInterval(timer);
      setTimeout(() => {
        let msg = alert("TIME OVER");
        if (typeof msg === "undefined") ring.classList.remove("ending");
        btnStart.textContent = "Start";
      }, 10);

      ring.classList.add("ending");

      music.play();
      isStart = false;
    }
    timeInSeconds--;
  };
  tick();
  timer = setInterval(tick, 1000);
};

// Setting Time period.

btnSetting.addEventListener("click", function () {
  isSet = !isSet;
  if (isSet) {
    inputs.forEach((input) => {
      clearInterval(timer);
      input.removeAttribute("disabled");
      btnStart.textContent = "start";
      isStart = false;
      gearImg.src = "images/check.svg";
    });
    PosEnd(idText);
  } else {
    inputs.forEach((input) => {
      input.setAttribute("disabled", true);
      gearImg.src = "images/gear.svg";
    });
  }
});

// Starting the timer.

btnStart.addEventListener("click", function () {
  isStart = !isStart;
  console.log(isStart);
  if (isStart) {
    btnStart.textContent = "pause";
    startTimer();
    gearImg.src = "images/gear.svg";
    isSet = false;
    inputs.forEach((input) => {
      input.setAttribute("disabled", true);
    });
  } else {
    btnStart.textContent = "Start";
    clearInterval(timer);
  }
});
