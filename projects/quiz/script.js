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
    <p class="question_text">...</p>
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

const questions = {
  IT: [
    {
      id: 1,
      question: "Что означает аббревиатура HTML?",
      options: [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Hyper Transfer Markup Language",
        "Home Tool Markup Language",
      ],
      correctAnswer: 0,
      difficulty: "easy",
    },
    {
      id: 2,
      question: "Какой язык программирования был создан Гвидо ван Россумом?",
      options: ["Java", "Python", "C++", "JavaScript"],
      correctAnswer: 1,
      difficulty: "easy",
    },
    {
      id: 3,
      question: "Что такое API?",
      options: [
        "Automatic Programming Interface",
        "Application Programming Interface",
        "Advanced Program Interaction",
        "Application Process Integration",
      ],
      correctAnswer: 1,
      difficulty: "medium",
    },
    {
      id: 4,
      question:
        "Какой протокол используется для безопасной передачи данных в интернете?",
      options: ["HTTP", "FTP", "HTTPS", "SMTP"],
      correctAnswer: 2,
      difficulty: "medium",
    },
    {
      id: 5,
      question: "Что такое рекурсия в программировании?",
      options: [
        "Процесс оптимизации кода",
        "Вызов функцией самой себя",
        "Тип данных для хранения текста",
        "Метод сортировки данных",
      ],
      correctAnswer: 1,
      difficulty: "hard",
    },
  ],
  Science: [
    {
      id: 1,
      question: "Сколько элементов в периодической таблице Менделеева?",
      options: ["92", "118", "108", "126"],
      correctAnswer: 1,
      difficulty: "easy",
    },
    {
      id: 2,
      question: "Какая планета известна как 'Красная планета'?",
      options: ["Венера", "Марс", "Юпитер", "Сатурн"],
      correctAnswer: 1,
      difficulty: "easy",
    },
    {
      id: 3,
      question: "Какой ученый открыл закон всемирного тяготения?",
      options: [
        "Альберт Эйнштейн",
        "Исаак Ньютон",
        "Галилео Галилей",
        "Никола Тесла",
      ],
      correctAnswer: 1,
      difficulty: "medium",
    },
    {
      id: 4,
      question: "Что измеряет барометр?",
      options: [
        "Температуру",
        "Атмосферное давление",
        "Влажность воздуха",
        "Скорость ветра",
      ],
      correctAnswer: 1,
      difficulty: "medium",
    },
    {
      id: 5,
      question: "Какой элемент имеет атомный номер 1?",
      options: ["Кислород", "Углерод", "Водород", "Гелий"],
      correctAnswer: 2,
      difficulty: "hard",
    },
  ],
  History: [
    {
      id: 1,
      question: "В каком году началась Вторая мировая война?",
      options: ["1939", "1941", "1937", "1945"],
      correctAnswer: 0,
      difficulty: "easy",
    },
    {
      id: 2,
      question: "Кто был первым президентом США?",
      options: [
        "Томас Джефферсон",
        "Джордж Вашингтон",
        "Авраам Линкольн",
        "Бенджамин Франклин",
      ],
      correctAnswer: 1,
      difficulty: "easy",
    },
    {
      id: 3,
      question: "В каком году человек впервые высадился на Луну?",
      options: ["1965", "1969", "1972", "1958"],
      correctAnswer: 1,
      difficulty: "medium",
    },
    {
      id: 4,
      question: "Кто написал 'Капитал'?",
      options: [
        "Фридрих Энгельс",
        "Владимир Ленин",
        "Карл Маркс",
        "Иосиф Сталин",
      ],
      correctAnswer: 2,
      difficulty: "medium",
    },
    {
      id: 5,
      question: "Когда была подписана Magna Carta?",
      options: ["1066", "1215", "1453", "1776"],
      correctAnswer: 1,
      difficulty: "hard",
    },
  ],
  All: [],
};

const app_interface = document.querySelector(".app");
let chosen_questions = [];
let current_question = 0;
let right_answers = 0;
let wrong_answers = 0;
let total_points = 0;
let theme = null;
let currentCorrectAnswer = null;
let timerId = null;
let useTimer = false;
const QUESTION_TIME = 5;

initStartPage();

function initStartPage() {
  app_interface.innerHTML = starting_page_html;

  const theme_choice_div = document.querySelector(".themes_container");
  const timer_checkbox = document.querySelector(".checkbox");

  theme_choice_div.addEventListener("click", function (event) {
    const clickedTheme = event.target.closest("button.theme");
    if (!clickedTheme) return;

    if (theme === clickedTheme) {
      clickedTheme.classList.remove("pressed");
      theme = null;
      return;
    }

    if (theme) theme.classList.remove("pressed");

    clickedTheme.classList.add("pressed");
    theme = clickedTheme;
  });

  document.querySelector(".start_quiz_btn").addEventListener("click", () => {
    if (!theme) {
      alert("Тема не выбрана. Пожалуйста, выберите тему");
      return;
    }

    useTimer = !!document.querySelector(".checkbox").checked;

    choseQuestions();
    current_question = 0;
    right_answers = 0;
    wrong_answers = 0;
    total_points = 0;

    nextQuestion();
  });
}

function choseQuestions() {
  chosen_questions = [];
  const name = theme.getAttribute("name");
  if (name === "All") {
    for (let t in questions) {
      if (t !== "All") chosen_questions.push(...questions[t]);
    }
  } else {
    chosen_questions.push(...questions[name]);
  }
}

function nextQuestion() {
  if (timerId) {
    clearTimeout(timerId);
    timerId = null;
  }

  if (current_question >= chosen_questions.length) {
    showResults();
    return;
  }

  app_interface.innerHTML = question_page_html;

  const question_header = document.querySelector(".question_header");
  const question_text = document.querySelector(".question_text");
  const answers = Array.from(document.querySelectorAll(".answer"));
  const timer_line = document.querySelector(".timer_line");

  const q = chosen_questions[current_question];
  question_header.textContent = "Вопрос номер " + (current_question + 1);
  question_text.textContent = q.question;

  answers.forEach((btn, idx) => {
    btn.textContent = q.options[idx];
    btn.dataset.index = idx;

    btn.classList.remove("pressed", "wrong");
  });

  currentCorrectAnswer = answers[q.correctAnswer];

  if (useTimer && timer_line) {
    timer_line.style.transition = "none";
    timer_line.style.width = "100%";
    void timer_line.offsetWidth;
    timer_line.style.transition = `width ${QUESTION_TIME}s linear`;
    timer_line.style.width = "0%";

    timerId = setTimeout(() => {
      wrong_answers++;
      current_question++;
      nextQuestion();
    }, QUESTION_TIME * 1000);
  } else if (timer_line) {
    timer_line.style.transition = "none";
    timer_line.style.width = "100%";
  }
}

function showResults() {
  if (timerId) {
    clearTimeout(timerId);
    timerId = null;
  }

  app_interface.innerHTML = final_page_html;
  document.querySelector(".total_points").textContent =
    "Набрано очков: " + total_points;
  document.querySelector(".right_answers").textContent =
    "Правильных ответов: " + right_answers;
  document.querySelector(".wrong_answers").textContent =
    "Неправильных ответов: " + wrong_answers;

  document
    .querySelector(".to_the_main_button")
    .addEventListener("click", () => {
      theme = null;
      chosen_questions = [];
      current_question = 0;
      right_answers = 0;
      wrong_answers = 0;
      total_points = 0;
      initStartPage();
    });
}

document.addEventListener("click", function (event) {
  const clicked = event.target.closest(".answer");
  if (!clicked) return;

  const container = document.querySelector(".answer_variants_container");
  if (!container || !container.contains(clicked)) return;

  if (!currentCorrectAnswer) return;

  if (timerId) {
    clearTimeout(timerId);
    timerId = null;
  }

  const timer_line = document.querySelector(".timer_line");
  if (timer_line) {
    const computedStyle = window.getComputedStyle(timer_line);
    const currentWidth = computedStyle.width;
    timer_line.style.transition = "none";
    timer_line.style.width = currentWidth;
  }

  if (clicked === currentCorrectAnswer) {
    right_answers++;
    total_points++;
    clicked.classList.add("correct");
  } else {
    wrong_answers++;
    total_points--;
    clicked.classList.add("wrong");
    currentCorrectAnswer.classList.add("correct");
  }

  setTimeout(() => {
    current_question++;
    nextQuestion();
  }, 1000);
});
