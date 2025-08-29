const counter_div = document.querySelector(".counter_div");

const number_div = document.querySelector(".number_div");
const plus_button = document.querySelector(".plus");
const minus_button = document.querySelector(".minus");

counter_div.addEventListener("click", function (event) {
  if (event.target == plus_button) {
    number_div.textContent = +number_div.textContent + 1;
  } else if (event.target == minus_button) {
    number_div.textContent = +number_div.textContent - 1;
  }

  if (number_div.textContent == "0") {
    number_div.classList.remove("positive");
    number_div.classList.remove("negative");
  } else if (+number_div.textContent < 0) {
    number_div.classList.add("negative");
  } else if (+number_div.textContent > 0) {
    number_div.classList.add("positive");
  }
});
