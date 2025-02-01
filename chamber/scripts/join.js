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

document.getElementById('timestamp').value = new Date().toISOString();

document.querySelectorAll(".open-button").forEach(button => {
	button.addEventListener('click', () => {
		const modalVersion = button.getAttribute("id");

		const modalString = `.${modalVersion}`;

		const modal = document.querySelector(modalString);

		modal.showModal();

	})
})

document.querySelectorAll(".close-button").forEach(button => {
	button.addEventListener('click', () => {
		
	})
})