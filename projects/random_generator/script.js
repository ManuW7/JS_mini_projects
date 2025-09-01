const generate_button = document.querySelector(".generate");
const output = document.querySelector(".number");

generate_button.addEventListener("click", function () {
  const left_border = +document.querySelector(".left_border").value;
  const right_border = +document.querySelector(".right_border").value;

  if (left_border > right_border) {
    const oldError = document.querySelector(".error");
    if (oldError) {
      oldError.remove();
    }

    const error_div = document.createElement("div");
    error_div.classList.add("error");
    error_div.textContent = "Ошибка, левая граница меньше правой";
    generate_button.before(error_div);
    output.textContent = "-";

    setTimeout(() => error_div.remove(), 2000);
    return;
  }

  const random_number =
    Math.floor(Math.random() * (right_border - left_border + 1)) + left_border;

  output.textContent = random_number;
});
