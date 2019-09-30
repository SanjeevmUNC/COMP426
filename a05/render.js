/**
 * Course: COMP 426
 * Assignment: a05
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
    // TODO: Copy your code from a04 to render the hero card
    return `<div id= "${hero.id}" class= "card" style="background-color:${hero.backgroundColor}; color: ${hero.color}">
        <h1 class = "title has-text-weight-bold" style= "color: ${hero.color}">Hero Alias: <span>${hero.first} ${hero.last}</span></h1>
            <h2 class="subtitle has-text-weight-bold"style= "color: ${hero.color}">
                ${hero.name}: ${hero.subtitle}
                <p>First Seen: ${hero.firstSeen}</p>
            </h2>
            <img src= ${hero.img}>
            <p> ${hero.description}</p>
            <button class="edit" value=${hero.id} onclick="handleEditButtonPress(event)"> Edit </button>
    </div>`;
};



/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function(hero) {
    return `<div class= "card" style="background-color:${hero.backgroundColor}; color: ${hero.color}">
    <form id="${hero.id}" class="formclass" onsubmit="handleEditFormSubmit(event)">
    <input id="first" class="input" type="text" value="${hero.first}"></input> 
    <input id="last" class="input" type="text" value="${hero.last}"></input>
    <input id="name" class="input" type="text" value="${hero.name}"></input>
    <input id="firstSeen" class="input" type="text" value="${hero.firstSeen}"></input>
    <textarea id="description">${hero.description}</textarea>
    <button type="reset" class="cancel" value="${hero.id}" onclick="handleCancelButtonPress(event)"> Cancel </button> 
    <button type="submit" class="save"> Submit </button>
</form></div>`;
};



/**
 * Handles the JavaScript event representing a user clicking on the "edit"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditButtonPress = function(event) {
    // TODO: Render the hero edit form for the clicked hero and replace the
    //       hero's card in the DOM with their edit form instead
    // return renderHeroEditForm();
    
    var tmpObj=document.createElement("div");
    tmpObj.innerHTML=renderHeroEditForm(heroicData.find(hero => hero.id == event.target.value));
    document.getElementById(event.target.value).replaceWith(tmpObj);
    return renderHeroEditForm(heroicData.find(hero => hero.id == event.target.value));
};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleCancelButtonPress = function(event) {
    // TODO: Render the hero card for the clicked hero and replace the
    //       hero's edit form in the DOM with their card instead
    var tmpObj=document.createElement("div");
    tmpObj.innerHTML=renderHeroCard(heroicData.find(hero => hero.id == event.target.value));
    document.getElementById(event.target.value).replaceWith(tmpObj);
};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditFormSubmit = function(event) {
    // TODO: Render the hero card using the updated field values from the
    //       submitted form and replace the hero's edit form in the DOM with
    //       their updated card instead
    event.preventDefault();
    const $root = $('#root');
    let currHero = heroicData.find(x=>x.id==event.target.id);
    currHero.name = $("input[id=name]").val();
    currHero.first = $("input[id=first]").val();
    currHero.last = $("input[id=last]").val();
    currHero.description = $("textarea[id=description]").val();
    var date = new Date($("input[id=firstSeen]").val());
    var currHeroCard = renderHeroCard(currHero);
    heroicData.forEach(hero => {
        if (hero.id == currHero.id) {
            hero.first = currHero.first;
            hero.last = currHero.last;
            hero.name = currHero.name;
            hero.description = currHero.description;
            hero.firstSeen = date;
        }
    });

    $('#'+ currHero.id).replaceWith(currHeroCard);



};



/**
 * Given an array of hero objects, this function converts the data into HTML,
 *     loads it into the DOM, and adds event handlers.
 * @param  heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function(heroes) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');
    for (let i = 0; i < heroes.length; i++) {
        $root.append(renderHeroCard(heroes[i]));
    }
    // TODO: Use jQuery to add handleEditButtonPress() as an event handler for
    //       clicking the edit butto
    $root.on("click", ".edit", handleEditButtonPress);
    // TODO: Use jQuery to add handleEditFormSubmit() as an event handler for
    //       submitting the form
    $root.on("click", ".cancel", handleCancelButtonPress);
    // TODO: Use jQuery to add handleCancelButtonPress() as an event handler for
    //       clicking the cancel button
    $root.on("submit",".formclass", handleEditFormSubmit);
};



/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function() {
    loadHeroesIntoDOM(heroicData);
});
