const starting_page_html = `<main>
        <h1>Brain Quiz</h1>
        <p class="annotation">Test your knowlege!</p>
        <div class="themes_container">
          <button class="theme">
            <div class="theme_icon">🌍</div>
            <h3 class="theme_title">Все категории</h3>
          </button>
          <button class="theme">
            <div class="theme_icon">💻</div>
            <h3 class="theme_title">IT и технологии</h3>
          </button>
          <button class="theme">
            <div class="theme_icon">🔬</div>
            <h3 class="theme_title">Наука</h3>
          </button>
          <button class="theme">
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

document.querySelector(".app").innerHTML = starting_page_html;
