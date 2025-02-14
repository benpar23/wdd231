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
    displayMembers(data.members);
}

function displayMembers(members) {
	members.forEach((member) => {
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
            membership.innerHTML = "Membership Level: Gold"
        }
        else if (member.membershiplevel === 2) {
            membership.innerHTML = "Membership Level: Silver"
        }
        else {
            membership.innerHTML = "Membership Level: Member"
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
	})
}


getMemberData();

const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list")
const display = document.querySelector(".cards");

gridButton.addEventListener("click", () => {
	display.classList.add("cards");
	display.classList.remove("list");
});

listButton.addEventListener("click", () => {
    display.classList.add("list");
    display.classList.remove("cards");
})