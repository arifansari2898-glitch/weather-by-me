let apiKey = "1e3e8f230b6064d27976e41163a82b77";

navigator.geolocation.getCurrentPosition(async function (position) {
  try {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
 
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    let response = await fetch(url);
    let data = await response.json();

    console.log("Current Weather:", data);

     
    document.getElementById("city-name").innerHTML = data.name;
    document.getElementById("metric").innerHTML = Math.floor(data.main.temp) + "°";
    document.querySelector("#weather-main").innerHTML = data.weather[0].description;
    document.getElementById("humidity").innerHTML = "Humidity: " + data.main.humidity + "%";
    document.getElementById("feels-like").innerHTML = "Feels like: " + Math.floor(data.main.feels_like) + "°";
    document.getElementById("temp-min-today").innerHTML = "Min: " + Math.floor(data.main.temp_min) + "°";
    document.getElementById("temp-max-today").innerHTML = "Max: " + Math.floor(data.main.temp_max) + "°";
    let weatherCondition = data.weather[0].main.toLowerCase();
    let weatherImg = document.querySelector(".weather-icon");
    let weatherImgs = document.querySelector(".weather-icons");

    if (weatherCondition === "rain") {
      weatherImg.src = "img/rain.png";
      weatherImgs.src = "img/rain.png";
    } else if (weatherCondition === "clear") {
      weatherImg.src = "img/sun.png";
      weatherImgs.src = "img/sun.png";
    } else if (weatherCondition === "snow") {
      weatherImg.src = "img/snow.png";
      weatherImgs.src = "img/snow.png";
    } else if (weatherCondition === "clouds" || weatherCondition === "smoke") {
      weatherImg.src = "img/cloud.png";
      weatherImgs.src = "img/cloud.png";
    } else if (weatherCondition === "mist" || weatherCondition === "fog") {
      weatherImg.src = "img/mist.png";
      weatherImgs.src = "img/mist.png";
    } else if (weatherCondition === "haze") {
      weatherImg.src = "img/haze.png";
      weatherImgs.src = "img/haze.png";
    } else if (weatherCondition === "thunderstorm") {
      weatherImg.src = "img/thunderstorm.png";
      weatherImgs.src = "img/thunderstorm.png";
    }
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(forecastUrl)
      .then(response => response.json())
      .then(data => {
        console.log("5-Day Forecast:", data);
        displayForecast(data);
      })
      .catch(error => {
        console.error("Error fetching forecast:", error);
      });

    function displayForecast(data) {
      const dailyForecasts = {};
      let forecast = document.getElementById("future-forecast-box");
      let forecastbox = "";

      data.list.forEach(item => {
        const date = item.dt_txt.split(" ")[0];
        let dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        let day = new Date(date).getDay();

        if (!dailyForecasts[date]) {
          dailyForecasts[date] = {
            day_today: dayName[day],
            temperature: Math.floor(item.main.temp) + "°",
            description: item.weather[0].description,
            weatherImg: item.weather[0].main.toLowerCase(),
          };
        }
      });

      for (const date in dailyForecasts) {
        let imgSrc = "";

        switch (dailyForecasts[date].weatherImg) {
          case "rain":
            imgSrc = "img/rain.png";
            break;
          case "clear":
            imgSrc = "img/sun.png";
            break;
          case "snow":
            imgSrc = "img/snow.png";
            break;
          case "clouds":
          case "smoke":
            imgSrc = "img/cloud.png";
            break;
          case "mist":
          case "fog":
            imgSrc = "img/mist.png";
            break;
          case "haze":
            imgSrc = "img/haze.png";
            break;
          case "thunderstorm":
            imgSrc = "img/thunderstorm.png";
            break;
          default:
            imgSrc = "img/sun.png";
        }

        forecastbox += `
          <div class="weather-forecast-box">
            <div class="day-weather"><span>${dailyForecasts[date].day_today}</span></div>
            <div class="weather-icon-forecast"><img src="${imgSrc}" /></div>
            <div class="temp-weather"><span>${dailyForecasts[date].temperature}</span></div>
            <div class="weather-main-forecast">${dailyForecasts[date].description}</div>
          </div>`;
      }

      forecast.innerHTML = forecastbox;
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}, 
() => {
  alert("Please turn on your location and refresh the page");
});