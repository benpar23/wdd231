import { updateFooterDates, setupMenuToggle } from './global.js';

updateFooterDates();

setupMenuToggle();

const currentUrl = window.location.href;

const everything = currentUrl.split('?');

let formData = everything[1].split('&');

console.log(formData);

function show(item) {

    let result = "";

    formData.forEach((element) => {
        if (element.startsWith(item)) {
            result = element.split('=')[1].replace("%40", "@").replace("+", " ");
        }
    })

    return (result);
}

// const timestampDate = show("timestamp");

// const dateString = decodeURIComponent(timestampDate).replace("+PM", " PM").replace("+AM", " AM");

// const date = new Date(dateString);

// const formattedDate = date.toLocaleString();

const showInfo = document.querySelector('#results');
showInfo.innerHTML = `
<h2>Here is your order confirmation:</h2>
<p><strong>First Name:</strong> ${show("first")}</br></br>
<strong>Last Name:</strong> ${show("last")}</br></br>
<strong>Your Phone:</strong> ${show("phone")}</br></br>
<strong>Your Email:</strong> <a href=mailto:${show("email")}>${show("email")}</a></br></br>
<strong>Order Details:</strong> ${show("brownies")}</p>
`;