import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

//importing our animations
import buildComputerAnimation from './animations/getComputerAnimation';
import buildCityAnimation from './animations/getCityAnimation';

export default function getInit() {
    //register our drawsvg plugin
    gsap.registerPlugin(ScrollTrigger);


    //grab the screen width for media queries
    var windowWidth = window.matchMedia('(max-width: 768px)');

    //if we're on anything mobile, have the animations just play from teh start for the cards
    //basically, on desktop the animation actaully only plays on the clone of the card objects
    //here, we want them to play on the actual object so it's always visible

    var cards = document.querySelectorAll('.getCardExpander');
    cards.forEach(card => {
        buildCardAnimation.call(card, windowWidth.matches);
    })
    //window.addEventListener('load', () => initGetCards(windowWidth.matches));    
    // if (windowWidth.matches) {
    //     buildComputerAnimation(true);
    //     buildCityAnimation(true);
    // };
}


//@param mobile is a window match media query; true = mobile
function buildCardAnimation(mobile) {
    //this variable will hold the animation itself (built in wahtever function)
    //set it based on the class name of the card object
    var animation;
    
    if (this.classList.contains('getComputer')) {
        animation = buildComputerAnimation();
    } else if (this.classList.contains('getCity')) {
        animation = buildCityAnimation();
    // } else if (this.classList.contains('getBudget')) {
    //     animation = buildBudgetAnimation();
    }

    //this will store the expaning card animation itself - NOT the svg animation abov
    //this is how the card will grow/shrink and display/hide text
    var tl = gsap.timeline( { paused: true } );

    tl
        .add('start')
        .fromTo(this, {
            boxShadow: '0 0 0 0 rgba(209, 227, 221, 0.25)'
        },{
            duration: 0.25,
            // scale: 1.2
            boxShadow: '0 0 30px 25px rgba(209, 227, 221, 0.4)'
        }, 'start')
        .to(this.querySelector('.getCardTitle'), {
            duration: 0.25,
            y: '-25%',
        }, 'start')
        .fromTo(this.querySelector('.getCardDescription'), {
            // scale: 0.7,
            opacity: 0
        }, {
            duration: 0.25,
            // scale: 1/1.2,
            opacity: 1,
        }, 'start')

    if (mobile) {
        if (typeof animation !== 'undefined') {
            ScrollTrigger.create({
                trigger: this,
                start: "bottom 90%",
                end: "bottom 50%",
                onEnter: self => { 
                    // animation.play()
                    tl.play();
                    tl.eventCallback('onComplete', () => animation.play());
                },
                onLeave: self => {
                    animation.restart()
                    animation.pause()
                    tl.reverse();
                },
                onEnterBack: self => {
                    // animation.play();
                    tl.play();
                    tl.eventCallback('onComplete', () => animation.play());
                },
                onLeaveBack: self => {
                    animation.restart();
                    animation.pause();
                    tl.reverse();
                },
            })
            //if no animation is available, just make the card grow without playing it
        } else {
            ScrollTrigger.create({
                trigger: this,
                start: "bottom 90%",
                end: "bottom 50%",
                onEnter: self => { 
                    tl.play();
                },
                onLeave: self => {
                    tl.reverse();
                },
                onEnterBack: self => {
                    tl.play();
                },
                onLeaveBack: self => {
                    tl.reverse();
                },
            })
        }
    } else {
        if (typeof animation !== 'undefined') {
            //event listener for hovering the card
            this.addEventListener('mouseenter', () => {
                tl.play();
                animation.play();
            });

            //listener for leaving the card
            this.addEventListener('mouseleave', () => {
                tl.reverse();
                animation.restart();
                animation.pause();
            })
        } else {
            this.addEventListener('mouseenter', () => {
                tl.play();
            });

            this.addEventListener('mouseleave', () => {
                tl.reverse();
            })
        }
    }
}