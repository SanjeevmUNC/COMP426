/**
 * Course: COMP 426
 * Assignment: a04
 * Author: Kayleigh Olecki
 *
 * This script uses jQuery to build an HTML page with content taken from the
 * data defined in data.js.
 */



/**
 * Given a hero object (see data.js), this function generates a "card" showing
 *     the hero's name, information, and colors.
 * @param hero  A hero object (see data.js)
 */
export const renderHeroCard = function(hero) {
    return `<div class= "card" style="background-color:${hero.backgroundColor}; color: ${hero.color}">
        <h1 class = "title has-text-weight-bold" style= "color: ${hero.color}">Hero Alias: <span>${hero.first} ${hero.last}</span></h1>
            <h2 class="subtitle has-text-weight-bold"style= "color: ${hero.color}">
                ${hero.name}: ${hero.subtitle}
                <p>First Seen: ${hero.firstSeen}</p>
            </h2>
            <img src= ${hero.img}>
            <p> ${hero.description}</p>
            <button> Edit </button>
    </div>`;
    // TODO: Generate HTML elements to represent the hero
    // TODO: Return these elements as a string, HTMLElement, or jQuery object
    // Example: return `<div>${hero.name}</div>`;
};



/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function(hero) {
    // TODO: Generate HTML elements to represent the hero edit form
    // TODO: Return these elements as a string, HTMLElement, or jQuery object
    return `<form><div class= "card" style="background-color:${hero.backgroundColor}; color: ${hero.color}">
    <h1 class = "title has-text-weight-bold" style= "color: ${hero.color}">Hero Alias: <span> First Name: <input class="input" type=hero."name" value=${hero.first} name=hero.first></input> 
    Last name: <input class="input" type="name" value=${hero.last} name=hero.last></input></span></h1>
        <h2 class="subtitle has-text-weight-bold"style= "color: ${hero.color}">
           Hero Name: <input class="input" type="name" value=${hero.name} name=hero.name></input>: ${hero.subtitle}
           First Seen: <input class="input" type="text"value="${hero.firstSeen}"></input>
        </h2>
        <img src= ${hero.img}>
        <p> <textarea class= "textarea">${hero.description}</textarea> </p>
        <button> Cancel </button> <button type="submit" > Submit </button>
</div></form>`;
    
};


/**
 * Given an array of hero objects, this function converts the data into HTML and
 *     loads it into the DOM.
 * @param heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function(heroes) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    // TODO: Generate the heroes using renderHeroCard()

    // TODO: Append the hero cards to the $root element
    for (let i = 0; i < heroes.length; i++) {
        $root.append(renderHeroCard(heroes[i]));
    }

    // Pick a hero from the list at random
    const randomHero = heroes[Math.floor(Math.random() * heroes.length)];

    // TODO: Generate the hero edit form using renderHeroEditForm()
    $root.append(renderHeroEditForm(randomHero));
    // TODO: Append the hero edit form to the $root element
};



/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function() {
    loadHeroesIntoDOM(heroicData);
});
