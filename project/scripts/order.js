import { updateFooterDates, setupMenuToggle } from './global.js';

updateFooterDates();

setupMenuToggle();

const today = new Date();

document.getElementById('timestamp').value = today.toLocaleString();

const lastOrder = document.querySelector(".history");

function displayOrderHistory() {

    const data = JSON.parse(localStorage.getItem("orderHistory")) || [];

    if (data.length !== 0){
        
        data.forEach((item) => {
        const details = document.createElement("p");
        details.innerHTML = 
        `<strong>Order Details:</strong> ${item.orderDetails}<br>
        <strong>Date:</strong> ${item.timestamp}<br><br>`
        lastOrder.appendChild(details);
    })}
    else {
        const details = document.createElement("p");
        details.innerHTML = `No orders found`;
        lastOrder.appendChild(details);
    }

}

displayOrderHistory();



