const trafficLightState = {
  currentLightIndex: 0,
  isAutoMode: false,
  intervalId: null,
  lights: ["red", "yellow", "green", "yellow"],
};

const lights = document.querySelectorAll(".light");
const nextButton = document.querySelector(".next");
const autoButton = document.querySelector(".auto");

function switchLight(lightIndex) {
  lights.forEach((light) => {
    light.classList.remove("lightOn");
    light.classList.add("lightOff");
  });

  const activeLight = document.querySelector(
    `.${trafficLightState.lights[lightIndex]}`
  );
  activeLight.classList.remove("lightOff");
  activeLight.classList.add("lightOn");

  trafficLightState.currentLightIndex = lightIndex;
}

function nextLight() {
  let nextIndex = trafficLightState.currentLightIndex + 1;

  if (nextIndex >= trafficLightState.lights.length) {
    nextIndex = 0;
  }

  switchLight(nextIndex);
}

function toggleAutoMode() {
  if (trafficLightState.isAutoMode) {
    clearInterval(trafficLightState.intervalId);
    trafficLightState.isAutoMode = false;
    trafficLightState.intervalId = null;
    autoButton.textContent = "AUTO";
  } else {
    trafficLightState.isAutoMode = true;
    autoButton.textContent = "STOP";
    trafficLightState.intervalId = setInterval(nextLight, 2000);
  }
}

nextButton.addEventListener("click", nextLight);
autoButton.addEventListener("click", toggleAutoMode);

switchLight(0);
