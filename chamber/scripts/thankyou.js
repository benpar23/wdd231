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

const currentUrl = window.location.href;

const everything = currentUrl.split('?');

let formData = everything[1].split('&');

function show(item) {

    formData.forEach((element) => {
        if (element.startsWith(item)) {
            result = element.split('=')[1].replace("%40", "@").replace("+", " ");
        }
    })

    return (result);
}

const timestampDate = show("timestamp");

const dateString = decodeURIComponent(timestampDate).replace("+PM", " PM").replace("+AM", " AM");

const date = new Date(dateString);

const formattedDate = date.toLocaleString();

const showInfo = document.querySelector('#results');
showInfo.innerHTML = `
<h3>Here are the details you submitted:</h3>
<p><span>First Name:</span> ${show("first")}</p>
<p><span>Last Name:</span> ${show("last")}</p>
<p><span>Your Phone:</span> ${show("phone")}</p>
<p><span>Your Email:</span> <a href=mailto:${show("email")}>${show("email")}</a></p>
<p><span>Business/Organization Name:</span> ${show("business")}</p>
<p><span>Date Submitted:</span> ${formattedDate}</p>
`;