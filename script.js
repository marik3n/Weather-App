//Change the Date and Time automatically

let now = new Date();
let currentDate = document.querySelector(".today");
let date = now.getDate();
let hours = now.getHours();
let year = now.getFullYear();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
} else {
  `${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

function change() {
  let today = `${day} ${date} ${month} ${year}, ${hours}:${minutes}`;
  currentDate.innerHTML = today;
}

change(); //call to display today's date and time

//get user's input and change city name

function eventHandler(event) {
  //event handler function
  event.preventDefault(); //cancels the action of the event
  //get the city name
  let city = document.querySelector("#text").value;
  //get the city's temperature via Weather API
  let apiKey = "9272c92f79da3654683f34308aa4a7c4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeatherDetails);
}

//variables defined inside a function can only be used inside the function

function showWeatherDetails(response) {
  celsiusResponse = response.data.main.temp;
  document.querySelector("#temp").innerHTML = Math.round(celsiusResponse);
  //display city name
  document.querySelector("#city").innerHTML = response.data.name;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
}

//change Celsius to F

function changeToFahrenheit(event) {
  event.preventDefault();
  let newTempFahrenheit = document.querySelector("#temp");
  newTempFahrenheit.innerHTML = Math.round(celsiusResponse * (9 / 5) + 32);
}

let celsiusResponse = null;

function changeToCelsius(event) {
  event.preventDefault();
  let newTempCelsius = document.querySelector("#temp");
  newTempCelsius.innerHTML = Math.round(celsiusResponse);
}

let fahrenheit = document.querySelector("#fahrenheit");
let celsius = document.querySelector("#celsius");

fahrenheit.addEventListener("click", changeToFahrenheit);
celsius.addEventListener("click", changeToCelsius);

//add event listener to the input text box and start the handler function
let form = document.querySelector("#enter-city");
form.addEventListener("submit", eventHandler);
