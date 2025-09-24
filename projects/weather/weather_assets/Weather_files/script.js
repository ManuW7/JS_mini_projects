console.log("Я тут");
const cityFinderForm = document.querySelector(".cityFinderForm");

cityFinderForm.addEventListener("submit", function (event) {
  event.preventDefault;
  console.log("Произошел Submit");
});
