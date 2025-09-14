const starting_page_html = `<main>
        <h1>Brain Quiz</h1>
        <p class="annotation">Test your knowlege!</p>
        <div class="themes_container">
          <button class="theme" name='All'>
            <div class="theme_icon">🌍</div>
            <h3 class="theme_title">Все категории</h3>
          </button>
          <button class="theme" name='IT'>
            <div class="theme_icon">💻</div>
            <h3 class="theme_title">IT и технологии</h3>
          </button>
          <button class="theme" name='Science'>
            <div class="theme_icon">🔬</div>
            <h3 class="theme_title">Наука</h3>
          </button>
          <button class="theme" name='History'>
            <div class="theme_icon">📜</div>
            <h3 class="theme_title">История</h3>
          </button>
        </div>
        <div class="timer_container">
          <input type="checkbox" class="checkbox" id="checkbox" />
          <label class="timer_label" for="checkbox">
            <span class="timer_text">Timer</span>
            <span class="custom_slider"></span>
          </label>
        </div>
        <div class="button_div">
          <button class="start_quiz_btn">Start the quiz</button>
        </div>
      </main>`;

const question_page_html = `<main>
        <h1 class="question_header">Вопрос номер</h1>
        <div class="question_text_div">
          <p class="question_text">бла бла бла бла бла бла ничего нового</p>
        </div>
        <div class="answer_variants_container">
          <button class="answer A">Ответ A</button>
          <button class="answer B">Ответ B</button>
          <button class="answer C">Ответ C</button>
          <button class="answer D">Ответ D</button>
        </div>
        <div class="timer_line"></div>
      </main>`;

const final_page_html = `<main>
        <h1 class="final_page_header">Итог</h1>
        <div class="results_div">
          <p class="stat total_points">Набрано очков:</p>
          <p class="stat right_answers">Правильных ответов:</p>
          <p class="stat wrong_answers">Неправильных ответов:</p>
        </div>
        <p class="thanks">Спасибо за игру!</p>
        <div class="button_div">
          <button class="to_the_main_button">На главную</button>
        </div>
      </main>`;

const app_interface = document.querySelector(".app");

//Добавляем изначальный экран
app_interface.innerHTML = starting_page_html;

const theme_choice_div = document.querySelector(".themes_container");
const timer_checkbox = document.querySelector(".checkbox");

// Переменная для сохранения выбранной темы
let theme = null;

theme_choice_div.addEventListener("click", function (event) {
  const clickedTheme = event.target.closest("button.theme");
  if (!clickedTheme) return;

  // Если это уже выделенная тема - просто снимаем выделение
  if (theme === clickedTheme) {
    clickedTheme.classList.remove("pressed");
    theme = null;
    return;
  }

  // Снимаем выделение с предыдущей темы
  if (theme) {
    theme.classList.remove("pressed");
  }

  // Выделяем новую тему
  clickedTheme.classList.add("pressed");
  theme = clickedTheme;
});

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("start_quiz_btn")) {
    if (theme) {
      console.log(theme.getAttribute("name"));
      console.log(timer_checkbox.checked);
    } else {
      alert("Тема не выбрана. Пожалуйста, выберите тему");
    }
  }
});
