const currentyear = document.querySelector("#currentyear");

const lastModified = document.querySelector("#lastModified");

const today = new Date();

currentyear.innerHTML = today.getFullYear();

lastModified.innerHTML = `Last Modification: ${document.lastModified}`;

const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});

const url = "https://benpar23.github.io/wdd231/chamber/data/members.json";

const cards = document.querySelector('.cards');

async function getMemberData() {
    const response = await fetch(url);
    const data = await response.json();
    // console.table(data.members);
    displayMembers(data.members);
}

function displayMembers(members) {
  
    const eligibleMembers = members.filter(member => member.membershiplevel >= 2);
    

    const selectedMembers = [];
    

    const targetCount = 3;

    while (selectedMembers.length < targetCount && eligibleMembers.length > 0) {
        const randomIndex = Math.floor(Math.random() * eligibleMembers.length);

        selectedMembers.push(eligibleMembers[randomIndex]);

        eligibleMembers.splice(randomIndex, 1);
    }


    selectedMembers.forEach(member => {
        const card = document.createElement("section");
        const name = document.createElement("h2");
        const image = document.createElement("img");
        const address = document.createElement("p");
        const number = document.createElement("p");
        const website = document.createElement("a");
        const membership = document.createElement("p");

        name.innerHTML = `${member.name}`;
        address.innerHTML = `${member.address}`;
        number.innerHTML = `${member.phonenumber}`;
        website.innerHTML = `${member.websiteurl}`;

        if (member.membershiplevel === 3) {
            membership.innerHTML = "Membership Level: Gold";
        } else if (member.membershiplevel === 2) {
            membership.innerHTML = "Membership Level: Silver";
        }

        image.setAttribute("src", member.image);
        image.setAttribute("alt", `Picture of ${member.name}'s logo`);
        image.setAttribute("loading", "lazy");
        image.setAttribute("width", "200");
        image.setAttribute("height", "200");

        address.setAttribute("id", "address");
        number.setAttribute("id", "number");
        website.setAttribute("id", "website");
        website.setAttribute("href", member.websiteurl);
        membership.setAttribute("id", "membership");

        card.appendChild(name);
        card.appendChild(image);
        card.appendChild(address);
        card.appendChild(number);
        card.appendChild(website);
        card.appendChild(membership);

        cards.appendChild(card);
    });
}


getMemberData();

const forecast = document.querySelector(".future");

const currentTemp = document.querySelector("#current-temp");

const fullDate = Intl.DateTimeFormat("en-CA").format(today);

const weatherurl = "https://api.openweathermap.org/data/2.5/weather?lat=43.7001&lon=-79.4163&units=metric&appid=7c3905c640644617e62d373d8e901094";

const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=43.7001&lon=-79.4163&units=metric&appid=7c3905c640644617e62d373d8e901094";

async function apiFetch() {
    try {
      const response = await fetch(weatherurl);
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

    const current = document.createElement("p");

    current.innerHTML = `${data.main.temp}&deg;C`;

    const weatherIcon = document.createElement("img");
    const weatherFigure = document.createElement("figure");
    const captionDesc = document.createElement("figcaption");

    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('alt', desc);
    weatherIcon.setAttribute('src',iconsrc);
    captionDesc.textContent = `${desc}`;

    weatherFigure.appendChild(weatherIcon);
    weatherFigure.appendChild(captionDesc);

    currentTemp.appendChild(weatherFigure);
    currentTemp.appendChild(current);
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
      const date = document.createElement("p");
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