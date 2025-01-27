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
        console.log(data);
        displayResults(data);
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

    filteredData.forEach(filtered => {

      const card = document.createElement("div");
      const iconfig = document.createElement("figure");
      const iconCaption = document.createElement("figcaption");
      const icon = document.createElement("img");
      const temperature = document.createElement("p");
      const iconsrc = `https://openweathermap.org/img/w/${filtered.weather[0].icon}.png`;

      temperature.innerHTML = `${filtered.main.temp}&deg;C`;
      let desc = filtered.weather[0].description;
      icon.setAttribute('alt', desc);
      icon.setAttribute('src',iconsrc);
      iconCaption.textContent = `${desc}`;

      iconfig.appendChild(icon);
      iconfig.appendChild(iconCaption);

      card.appendChild(iconfig);
      card.appendChild(temperature);

      forecast.appendChild(card);
    })


    console.log(filteredData);

}