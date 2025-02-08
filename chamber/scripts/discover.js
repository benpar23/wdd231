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
		const figure = document.createElement("figure");
        const image = document.createElement("img");
		const address = document.createElement("address");
		const description = document.createElement("p");
		const button = document.createElement("button");

        name.innerHTML = `${location.name}`;

		address.innerHTML = `${location.address}`;

		description.innerHTML = `${location.description}`;

		button.setAttribute("id", "learn");

        image.setAttribute("src", location.image);
        image.setAttribute("alt", `Picture of ${location.name}`);
        image.setAttribute("loading", "lazy");
        image.setAttribute("width", "300");
        image.setAttribute("height", "200");

        address.setAttribute("id", "address");

		figure.appendChild(image);
        
        card.appendChild(name);
        card.appendChild(figure);
		card.appendChild(description);
		card.appendChild(address);

        cards.appendChild(card);
	})
}


getLocationData();