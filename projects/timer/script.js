const regular_timer_buttons_div = document.querySelector(
  ".regular_timer_buttons_div"
);
const countdown_buttons_div = document.querySelector(
  ".countdown_timer_buttons_div"
);
const timer_display = document.querySelector(".timer_display");
let intervalID = null;
let countdown_intervalID = null;
let paragraph_to_change = null;
const audio = document.querySelector(".audio");
let ending_time_ID = null;
const countdown_timer_display = document.querySelector(
  ".countdown_timer_display"
);

function getToRightFormat(values_arr) {
  let seconds = values_arr[2] <= 9 ? "0" + values_arr[2] : values_arr[2];
  let minutes = values_arr[1] <= 9 ? "0" + values_arr[1] : values_arr[1];
  let hours = values_arr[0] <= 9 ? "0" + values_arr[0] : values_arr[0];

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

function validateTimeInput(time_input) {
  const values = time_input.split(":");

  if (values.length !== 3) return false;

  const [hours, minutes, seconds] = values.map(Number);

  return (
    !isNaN(hours) &&
    !isNaN(minutes) &&
    !isNaN(seconds) &&
    hours >= 0 &&
    minutes >= 0 &&
    minutes < 60 &&
    seconds >= 0 &&
    seconds < 60
  );
}

function reduceASecond(current_time) {
  const values = current_time.split(":").map((num) => +num);
  values[2]--;

  if (values[2] === -1) {
    values[2] = 59;
    values[1]--;
  }

  if (values[1] === -1) {
    values[1] = 59;
    values[0]--;
  }

  if (values[0] === -1) {
    return "00:00:00";
  }

  return getToRightFormat(values);
}

function timeIsUp() {
  audio.play();
  ending_time_ID = setInterval(() => {
    if (paragraph_to_change) {
      paragraph_to_change.classList.toggle("invisible");
    }
  }, 500);
}

regular_timer_buttons_div.addEventListener("click", function (event) {
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

countdown_buttons_div.addEventListener("click", function (event) {
  const target_button = event.target;
  const time_input = document.querySelector(".time_input");

  if (target_button.classList.contains("start_button")) {
    if (time_input) {
      if (!validateTimeInput(time_input.value)) {
        alert("Неправильно введено время");
        return;
      }

      let time_paragraph = document.createElement("p");
      time_paragraph.classList.add("time_paragraph");
      time_paragraph.textContent = time_input.value;
      paragraph_to_change = time_paragraph;
      time_input.replaceWith(time_paragraph);
    }

    if (countdown_intervalID) {
      clearInterval(countdown_intervalID);
    }

    countdown_intervalID = setInterval(function () {
      let current_time = paragraph_to_change.textContent;
      paragraph_to_change.textContent = reduceASecond(current_time);
      if (paragraph_to_change.textContent == "00:00:00") {
        timeIsUp();
        clearInterval(countdown_intervalID);
      }
    }, 1000);
  }

  if (countdown_intervalID && target_button.classList.contains("stop_button")) {
    clearInterval(countdown_intervalID);
    countdown_intervalID = null;
  }

  if (target_button.classList.contains("reset_button")) {
    if (countdown_intervalID) {
      clearInterval(countdown_intervalID);
      countdown_intervalID = null;
    }

    if (!time_input) {
      let new_input = document.createElement("input");
      new_input.setAttribute("type", "text");
      new_input.setAttribute("id", "time_input");
      new_input.classList.add("time_input");

      document.querySelector(".time_paragraph").replaceWith(new_input);
    }

    if (ending_time_ID) {
      clearInterval(ending_time_ID);
      ending_time_ID = null;
    }
  }
});
