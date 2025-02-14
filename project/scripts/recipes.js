import { updateFooterDates, setupMenuToggle } from './global.js';

updateFooterDates();

setupMenuToggle();

const url = "data/recipes.json"

async function getRecipeData() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        buildRecipeCards(data.recipes);
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

getRecipeData();

const cards = document.querySelector(".cards");

function buildRecipeCards(recipes) {

    recipes.forEach((recipe) => {
        
        const card = document.createElement("section");
        const title = document.createElement("h2");
        const figure = document.createElement("figure");
        const caption = document.createElement("figcaption");
        const image = document.createElement("img");
		const cookTime = document.createElement("p");
        const servings = document.createElement("p");
        const url = document.createElement("a");

        title.innerHTML = `${recipe.title}`;
        cookTime.innerHTML = `${recipe.time}`;
        servings.innerHTML = `${recipe.servings}`;
        caption.innerHTML = `${recipe.credit}`;

        image.setAttribute("src", recipe.image);
        image.setAttribute("alt", recipe.credit);
        image.setAttribute("loading", "lazy");
        image.setAttribute("width", "200");

        url.setAttribute("href", recipe.url);

        figure.appendChild(image);
        figure.appendChild(caption);

        card.appendChild(title);
        card.appendChild(figure);
        card.appendChild(cookTime);
        card.appendChild(servings);
        card.appendChild(url);

        cards.appendChild(card);

    })

}