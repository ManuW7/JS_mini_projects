const trafficLightState = {
  currentLightIndex: 0, // Индекс текущего активного света
  isAutoMode: false, // Флаг авторежима
  intervalId: null, // ID интервала для авторежима
  lights: ["red", "yellow", "green", "yellow"], // Последовательность переключения
};

// Находим все элементы
const lights = document.querySelectorAll(".light");
const nextButton = document.querySelector(".next");
const autoButton = document.querySelector(".auto");

// Функция переключения света
function switchLight(lightIndex) {
  // 1. Выключаем ВСЕ огни
  lights.forEach((light) => {
    light.classList.remove("lightOn");
    light.classList.add("lightOff");
  });

  // 2. Включаем нужный огонь
  const activeLight = document.querySelector(
    `.${trafficLightState.lights[lightIndex]}`
  );
  activeLight.classList.remove("lightOff");
  activeLight.classList.add("lightOn");

  // 3. Обновляем состояние
  trafficLightState.currentLightIndex = lightIndex;
}

// Функция следующего света
function nextLight() {
  let nextIndex = trafficLightState.currentLightIndex + 1;

  // Зацикливаем последовательность: после последнего элемента → первый
  if (nextIndex >= trafficLightState.lights.length) {
    nextIndex = 0;
  }

  switchLight(nextIndex);
}

// Функция переключения авторежима
function toggleAutoMode() {
  if (trafficLightState.isAutoMode) {
    // Выключаем авторежим
    clearInterval(trafficLightState.intervalId);
    trafficLightState.isAutoMode = false;
    trafficLightState.intervalId = null;
    autoButton.textContent = "AUTO";
  } else {
    // Включаем авторежим
    trafficLightState.isAutoMode = true;
    autoButton.textContent = "STOP";
    trafficLightState.intervalId = setInterval(nextLight, 2000); // 2 секунды
  }
}

// Обработчики событий
nextButton.addEventListener("click", nextLight);
autoButton.addEventListener("click", toggleAutoMode);

// Инициализация - включаем красный свет при загрузке
switchLight(0); // red - первый элемент в массиве
