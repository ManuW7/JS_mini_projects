const cityFinderForm = document.querySelector(".cityFinderForm");
const cityFinderInput = document.querySelector(".city_finder");
const API_KEY = "7f537ad51dace14a1817ba015efd9e6a";

cityFinderForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const coords = await getCityCoords(cityFinderInput.value);
  const result_weather = await getWeatherByCoords(coords);
  console.log(result_weather);
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

async function main() {
  try {
    const result1 = await getCityCoords("Лондон");
    console.log("Coords:", result1);

    const final_result1 = await getWeatherByCoords(result1);
    console.log("Weather:", final_result1);
  } catch (err) {
    console.error("Ошибка:", err.message);
  }
}

main();
