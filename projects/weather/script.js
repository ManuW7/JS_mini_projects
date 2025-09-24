const cityFinderForm = document.querySelector(".cityFinderForm");
const apiKey = process.env.API_KEY;

cityFinderForm.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log(apiKey);
});
