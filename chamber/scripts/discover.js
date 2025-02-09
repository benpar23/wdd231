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

		button.innerHTML = "Learn More";
		button.setAttribute("id", "learn");

		image.setAttribute("src", location.image);
		image.setAttribute("alt", `Picture of ${location.name}`);
		image.setAttribute("loading", "lazy");
		image.setAttribute("width", "280");
		image.setAttribute("height", "200");

		address.setAttribute("id", "address");

		figure.appendChild(image);

		card.appendChild(name);
		card.appendChild(figure);
		card.appendChild(description);
		card.appendChild(address);
		card.appendChild(button);

		cards.appendChild(card);
	})
}


getLocationData();

const msToDays = 86400000;
const dateToday = Date.now();

function showVisitorMessage() {

	const lastVisit = localStorage.getItem("lastVisited");

	const lastVisitDate = Date.parse(lastVisit);
	console.log(lastVisitDate);

	const dialog = document.querySelector("#popup");

	if (lastVisit === null) {
		const message = document.createElement("p");
		message.innerHTML = "Welcome! Let us know if you have any questions.";
		dialog.appendChild(message);
	}
	else if (dateToday - lastVisitDate < msToDays) {
		const message = document.createElement("p");
		message.innerHTML = "Back so soon! Awesome!";
		dialog.appendChild(message);
	}
	else {
		if ((dateToday - lastVisitDate) / msToDays > 1 && (dateToday - lastVisitDate) / msToDays < 2) {

			const days = Math.floor((dateToday - lastVisitDate) / msToDays);
			const message = document.createElement("p");
			message.innerHTML = `You last visited ${days} day ago.`;
			dialog.appendChild(message);
		}
		else {
			const days = Math.floor((dateToday - lastVisitDate) / msToDays);
			const message = document.createElement("p");
			message.innerHTML = `You last visited ${days} days ago.`;
			dialog.appendChild(message);
		}
	}

	const button = document.querySelector(".close-button");

	button.addEventListener("click", () => {

		dialog.close();
	})

	dialog.showModal();

	localStorage.removeItem("lastVisited");
	localStorage.setItem("lastVisited", `${today}`);

}

window.onload = function () {
	setTimeout(showVisitorMessage, 1000);
};




