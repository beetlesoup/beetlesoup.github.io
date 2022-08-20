/* JavaScript lets you make lil rookie mistakes and tries to read
   your typo. This is bad because Good Times Create Soft Men.
   Let's turn on strict mode. */
'use strict';

/* Adding an event handler: we have a button that says "Dark".
   How are we going to make it turn the theme dark? */

/* First use a query selector to get the button reference and call it 'switcher' */
const switcher = document.querySelector('.btn');

/* Next add the event handler for the click event */
switcher.addEventListener('click', function() {
    document.body.classList.toggle('light-theme');
    document.body.classList.toggle('dark-theme');

    const className = document.body.className;
    if(className == "light-theme") {
        this.textContent = "🌜";
    } else {
        this.textContent = "☀️";
    }

    /* Add the following message to be shown in Developer View, ya big nerd: */
    console.log('current class name: ' + className);
});