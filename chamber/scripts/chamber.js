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

const file = "/chamber/data/members.json";

const cards = document.querySelector('.cards');

async function getMemberData() {
    const response = await fetch(file);
    const data = await response.json();
    // console.table(data.members);
    displayMembers(data.members);
}

function displayMembers(members) {
	members.forEach((member) => {
        const card = document.createElement("section");
        const name = document.createElement("h2");
        const image = document.createElement("img");

        name.innerHTML = `${member.name}`;

        portrait.setAttribute("src", prophet.imageurl);
        portrait.setAttribute("alt", `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute("loading", "lazy");
        portrait.setAttribute("width", "200");
        
        card.appendChild(name);
        card.appendChild(portrait);

        cards.appendChild(card);
	})
}


getMemberData();