const buttons_div = document.querySelector(".buttons_div");
const timer_display = document.querySelector(".timer_display");
let intervalID = null;

function getToRightFormat(values_arr) {
  let seconds = values_arr[2] <= 9 ? "0" + values_arr[2] : values_arr[2];
  let minutes = values_arr[1] <= 9 ? "0" + values_arr[1] : values_arr[1];
  let hours = values_arr[0] <= 9 ? "0" + values_arr[0] : values_arr[0];

  // console.log(hours + ":" + minutes + ":" + seconds);

  return hours + ":" + minutes + ":" + seconds;
}

function addASecond(current_time) {
  const values = current_time.split(":").map((num) => +num);
  values[2]++;

  if (values[2] === 60) {
    values[1]++;
    values[2] = 0;
  }

  if (values[1] === 60) {
    values[0]++;
    values[1] = 0;
  }

  return getToRightFormat(values);
}

buttons_div.addEventListener("click", function (event) {
  const target_button = event.target;
  if (target_button.classList.contains("start_button")) {
    if (intervalID) {
      clearInterval(intervalID);
    }
    intervalID = setInterval(function () {
      let start_time = timer_display.textContent;
      timer_display.textContent = addASecond(start_time);
    }, 1000);
  } else if (target_button.classList.contains("stop_button")) {
    if (intervalID) {
      clearInterval(intervalID);
      intervalID = null;
    }
  } else if (target_button.classList.contains("reset_button")) {
    if (intervalID) {
      clearInterval(intervalID);
      intervalID = null;
    }
    timer_display.textContent = "00:00:00";
  }
});
