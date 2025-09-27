const cityFinderForm = document.querySelector(".cityFinderForm");
const cityFinderInput = document.querySelector(".city_finder");
const API_KEY = "7f537ad51dace14a1817ba015efd9e6a";
const search_results_section = document.querySelector(".search_results");
const weather_in_title = document.querySelector(".weather_in");

cityFinderForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  search_results_section.innerHTML = "";
  weather_in_title.classList.add("hidden");

  const coords = await getCityCoords(cityFinderInput.value);
  const result_weather = await getWeatherByCoords(coords);
  console.log(result_weather);

  if (result_weather) {
    weather_in_title.textContent = "Погода в: " + cityFinderInput.value;
    weather_in_title.classList.remove("hidden");
    search_results_section.innerHTML = `
  <div class="grid_div">
    <div class="temperature_div">
      <h3 class="temperature_header">Температура</h3>
      <p class="actual_temperature">${Math.round(
        result_weather.main.temp
      )}°C</p>
      <div class="side_information_div">
        <p class="temperature_side_information temp_max">Max: ${Math.round(
          result_weather.main.temp_max
        )}°C</p>
        <p class="temperature_side_information temp_min">Min: ${Math.round(
          result_weather.main.temp_min
        )}°C</p>
        <p class="temperature_side_information temp_feels_like">Feels like: ${Math.round(
          result_weather.main.feels_like
        )}°C</p>
      </div>
    </div>

    <div class="wind_div">
      <h3 class="wind_header">Ветер</h3>
      <p class="wind_speed">${result_weather.wind.speed} м/с</p>
      <p class="wind_direction">${getWindDirection(result_weather.wind.deg)}</p>
    </div>

    <div class="clouds_div">
      <h3 class="clouds_header">Облачность</h3>
      <div class="clouds_content_div">
        <div class="clouds_description">
          <p class="clouds_description_text">${capitalizeFirstLetter(
            result_weather.weather[0].description
          )}</p>
        </div>
        <img src="https://openweathermap.org/img/wn/${
          result_weather.weather[0].icon
        }@2x.png" class="clouds_icon" />
      </div>
    </div>

    <div class="humidity_div">
      <h3 class="humidity_header">Влажность</h3>
      <p class="humidity_value">${result_weather.main.humidity}%</p>
    </div>
  </div>
`;
  }
});

async function getCityCoords(cityName) {
  // URL для доступа к АПИ Open Weather, которая даст координаты города по его названию
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;
  // Записываем результат fetch в переменную
  const res = await fetch(url);

  // Получаем text из обьекта Response
  const text = await res.text();

  // Если запрос не прошел нормальным образом
  if (!res.ok) {
    // Выбрасываем исключение
    throw new Error(
      `Ошибка сети или API (геокодинг): ${res.status} ${res.statusText} — ${text}`
    );
  }

  // Заводим переменную для полученных данных
  let data;

  // Пробуем распарсить текст
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("Неправильный ответ от геокодинга (не JSON).");
  }

  // Если получили не массив или массив пустой, возвращаем null - значит не нашли искомый город
  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  // Иначе возвращаем значения в полях lon и lat
  return [data[0].lon, data[0].lat];
}

// Функция для получения погоды по координатам
async function getWeatherByCoords(coords) {
  // Если координты - null - значит город не нашли -
  if (!coords) {
    alert("Введен неверный город для поиска погоды");
    return null;
  }

  // Распаковываем координаты в переменные
  const [lon, lat] = coords;

  // Вставляем эти координаты в адрес запроса к APi
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ru`;

  // Обращаемся к API, получаем текст Response
  const res = await fetch(url);
  const text = await res.text();

  // Еслизапрос проищшел с ошибкой, обрабатываем ее и выводи в консоль
  if (!res.ok) {
    let body;
    try {
      body = JSON.parse(text);
    } catch {
      body = text;
    }

    if (res.status === 401) {
      throw new Error("401 Unauthorized — проверьте API key");
    } else if (res.status === 404) {
      throw new Error("Погодные данные не найдены (404)");
    } else {
      throw new Error(
        `Ошибка API: ${res.status} ${res.statusText} — ${JSON.stringify(body)}`
      );
    }
  }

  // Если без ошибки, возвращаем полученные данные
  return JSON.parse(text);
}

function getWindDirection(deg) {
  if (deg >= 337.5 || deg < 22.5) return "Север";
  else if (deg >= 22.5 && deg < 67.5) return "Северо-восточный";
  else if (deg >= 67.5 && deg < 112.5) return "Восточный";
  else if (deg >= 112.5 && deg < 157.5) return "Юго-восточный";
  else if (deg >= 157.5 && deg < 202.5) return "Южный";
  else if (deg >= 202.5 && deg < 247.5) return "Юго-западный";
  else if (deg >= 247.5 && deg < 292.5) return "Западный";
  else return "Северо-западный";
}

function capitalizeFirstLetter(str) {
  if (!str) return ""; // на случай пустой строки
  return str.charAt(0).toUpperCase() + str.slice(1);
}
