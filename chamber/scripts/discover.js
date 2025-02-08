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

const url = "https://benpar23.github.io/wdd231/chamber/data/locations.json";

const cards = document.querySelector('.cards');

async function getLocationData() {
    const response = await fetch(url);
    const data = await response.json();
    displayLocations(data.locations);
}

function displayLocations(locations) {
	locations.forEach((location) => {
        const card = document.createElement("section");
        const name = document.createElement("h2");
        const image = document.createElement("img");
		const address = document.createElement("p");

        name.innerHTML = `${location.name}`;

		address.innerHTML = `${location.address}`;
        

        image.setAttribute("src", location.image);
        image.setAttribute("alt", `Picture of ${location.name}`);
        image.setAttribute("loading", "lazy");
        image.setAttribute("width", "200");
        image.setAttribute("height", "200");

        address.setAttribute("id", "address");
        
        card.appendChild(name);
        card.appendChild(image);
		card.appendChild(address);

        cards.appendChild(card);
	})
}


getLocationData();