function displayDay() {
  let day = new Date();
  day = day.toString().split(" ");
  document.querySelector("#day").innerHTML = day[0];
}

function displayDate() {
  let date = new Date();
  date = date.toString().split(" ");
  document.querySelector("#date").innerHTML = date[1] + " " + date[2];
}

function getTimeOfDay() {
  const now = new Date();
  const hour = now.getHours();

  if (hour >= 6 && hour < 18) {
    return "morning";
  } else {
    return "night";
  }
}

window.onload = function () {
  displayDay();
  displayDate();
};

const apiKey = "db35b86054733cd931943a53ba3d1d88";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

// For Images
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  // For displaying Invalid city name
  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();

    // console.log(data);

    // Updating the data according to the API
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " kmph";

    const timeOfDay = getTimeOfDay(); // Get the time of day

    if (data.weather[0].main === "Clouds") {
      weatherIcon.src = `images/clouds_${timeOfDay}.png`;
    } else if (data.weather[0].main === "Clear") {
      weatherIcon.src = `images/clear_${timeOfDay}.png`;
    } else if (data.weather[0].main === "Rain") {
      weatherIcon.src = `images/rain_${timeOfDay}.png`;
    } else if (data.weather[0].main === "Drizzle") {
      weatherIcon.src = `images/drizzle_${timeOfDay}.png`;
    } else if (data.weather[0].main === "Mist") {
      weatherIcon.src = `images/mist_${timeOfDay}.png`;
    } else if (data.weather[0].main === "Snow") {
      weatherIcon.src = `images/rain_${timeOfDay}.png`;
    }
    document.querySelector(".weather").style.display = "block";
  }
  console.log(data);
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
