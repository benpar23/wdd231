const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const forecast = document.querySelector("#forecast");

const today = new Date();

const fullDate = Intl.DateTimeFormat("en-CA").format(today);

const url = "https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=metric&appid=7c3905c640644617e62d373d8e901094";

const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=49.75&lon=6.64&units=metric&appid=7c3905c640644617e62d373d8e901094";

async function apiFetch() {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log(data); // testing only
        displayResults(data); // uncomment when ready
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
  }
  
  apiFetch();

  async function forecastFetch() {
    try {
      const response = await fetch(forecastUrl);
      if (response.ok) {
        const data = await response.json();
        console.log(data); // testing only
        displayForecast(data); // uncomment when ready
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
  }
  
forecastFetch();


  function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;C`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('alt', desc);
    weatherIcon.setAttribute('src',iconsrc);
    captionDesc.textContent = `${desc}`;
  }

  function displayForecast(data) {
    const uniqueDates = []
    const filteredData = [];
    
    data.list.forEach(dataset => {

        const dateTime = dataset.dt_txt;
        const [dateOnly, timeOnly] = dateTime.split(" ");
        if (timeOnly === "12:00:00" && !uniqueDates.includes(dateOnly) && uniqueDates.length < 3 && dateOnly !== fullDate) {
            uniqueDates.push(dateOnly);
            filteredData.push(dataset);
        }
    })

    forecast.innerHTML = `${filteredData[0].main.temp}&deg;C`;

    console.log(filteredData);

}