//import functions for mobile nav menu
import navMobileToggleAnimation from './animations/navMobileToggleAnimation.js';

export default function navInit() {
    //FUTURE
    //I guess if i wanted to save some resources i could load in the proper nav menu based on a match media query of the screen size
    // and then add a resize event handler to change if need but... meh, we'll let CSS control visibility for now and just load both in
    navDesktopInit();
    navMobileInit();
}


function navDesktopInit() {
    var contactBtn = document.querySelector('.navContactBtn');

    //nav contact button stuff
    contactBtn.addEventListener('mouseenter', () => {
        contactBtn.style.transform = 'scale(1.1)';
        contactBtn.querySelector('button').style.backgroundColor = '#FF4242';
        contactBtn.querySelector('button').style.color = '#ffffff';
    });

    contactBtn.addEventListener('mouseleave', () => {
        contactBtn.style.transform = 'scale(1)';
        contactBtn.querySelector('button').style.backgroundColor = 'transparent';
        contactBtn.querySelector('button').style.color = '#FF4242';
    })


    //adding click handlers for the links here
    //what we do
    document.querySelector('.desktopWhatWeDo').addEventListener('click', () => {document.querySelector('#WhatWeDo').scrollIntoView({behavior: 'smooth'})})

    //our sites include
    document.querySelector('.desktopAboutOurSites').addEventListener('click', () => {document.querySelector('#AboutOurSites').scrollIntoView({behavior: 'smooth'})})

    //contact info
    document.querySelector('.desktopContactUs').addEventListener('click', () => {document.querySelector('#Contact').scrollIntoView({behavior: 'smooth'})})
};

//mobile nav bar initializing

function navMobileInit() {
    //first identify the button itself
    var btn = document.querySelector('.menuToggleBTN');

    //establish STATE variable for open/closed menu
    var isMenuOpen = false;

    //fine the animation (timeline object from GSAP)
    var navAni = navMobileToggleAnimation();

    //helper functions
    //toggle menu toggles the isMenuOpen variable
    const toggleMenu = () => {
        //run animation/reverse depending on if the menu is open or not
        //start animation to close menu first
        if(isMenuOpen) {
            navAni.timeScale(1.5);
            navAni.reverse();
        //open menu here
        } else if(!isMenuOpen) {
            navAni.timeScale(1);
            navAni.play();
        }

        //flip the open menu state variable
        isMenuOpen = !isMenuOpen
    };

    //click handlers for the button, also for the overlay to close it if needed
    btn.addEventListener('click', () => toggleMenu());
    document.querySelector('#navOverlay').addEventListener('click', () => toggleMenu());

    //adding click handlers for the links here
    //what we do
    document.querySelector('.mobileWhatWeDo').addEventListener('click', () => {document.querySelector('#WhatWeDo').scrollIntoView({behavior: 'smooth'}); toggleMenu();})

    //our sites include
    document.querySelector('.mobileAboutOurSites').addEventListener('click', () => {document.querySelector('#AboutOurSites').scrollIntoView({behavior: 'smooth'}); toggleMenu();})

    //contact info
    document.querySelector('.mobileContactUs').addEventListener('click', () => {document.querySelector('#Contact').scrollIntoView({behavior: 'smooth'}); toggleMenu();})

};
