import { updateFooterDates, setupMenuToggle } from './global.js';

updateFooterDates();

setupMenuToggle();

const lastOrder = document.querySelector(".last");

function displayLastOrder() {

    const data = localStorage.getItem("lastOrder");

    if (data !== null){
        const details = document.createElement("p");
        details.innerHTML = data;
        lastOrder.appendChild(details);
    }
    else {
        const details = document.createElement("p");
        details.innerHTML = `No order found`;
        lastOrder.appendChild(details);
    }

}

displayLastOrder();



