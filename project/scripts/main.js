import { updateFooterDates, setupMenuToggle } from './global.js';

updateFooterDates();

setupMenuToggle();

function showVisitorMessage() {

	const dialog = document.querySelector("#popup");

	const message = document.createElement("p");
	message.innerHTML = "Welcome to Brownies Squared! A quick note that all orders will be confirmed via phone call after being placed.";
	dialog.appendChild(message);


	const button = document.querySelector(".close-button");

	button.addEventListener("click", () => {

		dialog.close();
	})

	dialog.showModal();
}

window.onload = function () {
	setTimeout(showVisitorMessage, 2000);
};