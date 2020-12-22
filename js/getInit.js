import { gsap, Linear } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function getInit() {
    //register our drawsvg plugin
    gsap.registerPlugin(DrawSVGPlugin);
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

    //this will store the expaning card animation itself - NOT the svg animation abov
    //this is how the card will grow/shrink and display/hide text
    var tl = gsap.timeline( { paused: true } );

    tl
        .add('start')
        .to(this, {
            duration: 0.25,
            scale: 1.2
        }, 'start')
        .to(this.querySelector('.getCardTitle'), {
            duration: 0.25,
            y: '-25%',
        }, 'start')
        .fromTo(this.querySelector('.getCardDescription'), {
            scale: 0.7,
            opacity: 0
        }, {
            duration: 0.25,
            scale: 1/1.2,
            opacity: 1,
        }, 'start')

    if (this.classList.contains('getComputer')) {
        animation = buildComputerAnimation();
    } else if (this.classList.contains('getCity')) {
        animation = buildCityAnimation();
    // } else if (this.classList.contains('getBudget')) {
    //     animation = buildBudgetAnimation();
    }

    if (mobile) {
        if (typeof animation !== 'undefined') {
            ScrollTrigger.create({
                trigger: this,
                start: "bottom 90%",
                end: "bottom 50%",
                onEnter: self => { 
                    tl.play();
                    animation.play();
                },
                onLeave: self => {
                    tl.reverse();
                    animation.restart();
                    animation.pause();
                },
                onEnterBack: self => {
                    tl.play();
                    animation.play();
                },
                onLeaveBack: self => {
                    tl.reverse();
                    animation.restart();
                    animation.pause();
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

function initGetCards(mobile) {

    //get an array of all of the 3 cards
    var cards = document.querySelectorAll('.getCardExpander');

    cards.forEach(card => {
        createCard(mobile, card);
    });
}

//input parameter simply tells if we're under the media query for mobile or not
function createCard(mobile, card) {

    //create the background greyed out overlay and set it's css styles
    var getOverlay = document.createElement('div');
    getOverlay.setAttribute('style', 'position: fixed; width: 100%; height: 100%; inset: 0; z-index: 11; background-color: #000000')

    //call function on window resize
    // window.addEventListener('resize', resize);

    //variables to hold the clone of the card, the original card (target), and the timeline for gsap
    var clone; 

    //creates the clone, builds the timeline for the clone, gets the timeline for the card animation specifically
    var masterTL;

    //simply add the triggers for the cards to expand
    //on desktop this is on mouse hover
    // on mobile, this is the scroll trigger instead
    if (mobile) {
        ScrollTrigger.create({
            trigger: card,
            start: "bottom 90%",
            end: "bottom 50%",
            onEnter: self => openGetCard(),
            onLeave: self => closeGetCard(),
            onLeaveBack: self => closeGetCard(),
            onEnterBack: self => openGetCard(),
        });
    } else {
        card.addEventListener('mouseenter', openGetCard);
    }

    
    // function resize() {
    //     if (timeline) {
    //         var progress = timeline.progress();
    //         var reversed = timeline.reversed();
    //         timeline.kill();
    //         buildTimeline(progress, reversed);
    //     }
    // }

    function createClone(target) {

        clone = target.cloneNode(true);

        clone.classList.add('clone');
        clone.style.margin = '0';

        //i set padding here to get the new width of being regular widht + 2 rem (1 on each side)
        //then, in the gsap transition I go from padding: 0 to padding: 1rem so that the initial growth starts at the same place
        clone.style.padding = '1rem';
        mobile ? null : clone.addEventListener('mouseleave', closeGetCard);

        //now make the extra info on the cards shown on just the clone
        clone.querySelector('.getCardDescription').style.display = 'block';
        clone.style.overflow = 'hidden';
    }

    function buildTimeline(target, clone) {

        //gets the exact position of the original card for the clone to be created
        var rect = getPosition(target);

        var height = clone.offsetHeight; 
        var width = clone.offsetWidth;
        var x = (rect.width - width) / 2;
        var y = (rect.height - height) / 2;

        //set the cloen to have the exact position of the real 'base' card
        gsap.set(clone, rect);

        var timeline = gsap.timeline({ onReverseComplete: removeClone, paused: true }) //{ onReverseComplete: removeClone }
            .add('cardStart')
            .fromTo(getOverlay, { opacity: 0 }, { duration: 0.15, opacity: 0.3 }, 'cardStart')
            // .set(clone, {zIndex: 20}, 'cardStart')
            .fromTo(clone, { padding: 0, margin: 0 }, { duration: 0.15, padding: '1rem' }, 'cardStart')
            .fromTo(clone, { x: 0, y: 0 }, { duration: 0.25, x: x, y: y, width: width, height: height, autoRound: false }, 'cardStart')
            .fromTo(`.clone .getCardDescription`, {opacity: 0}, {duration: 0.1, opacity: 1}, 'cardStart+=0.2')
            //for if progress was interrupted
            // .progress(progress || 0)
            // .reversed(reversed || false);

        //now, build the animation based on which card it is
        if (target.classList.contains('getComputer')) {
            buildComputerAnimation().play();
            // uniqueClass = '.getComputer'
        } else if (target.classList.contains('getCity')) {
            buildCityAnimation().play();
            // uniqueClass = '.getCity'
        } else if (target.classList.contains('getBudget')) {

        }

        return timeline;
    }

    function openGetCard() {
        //first make sure clone doesn't exist yet
        if(clone) {
            clone.remove();
            clone = null;
            masterTL = null;
        }

        //based on if it's mobile or not - if yes, ignore the overlay. else, overlay it up
        document.body.append(getOverlay);

        createClone(card);
        document.body.append(clone);

        masterTL = buildTimeline(card, clone);
        masterTL.play();
    }

    function closeGetCard() {
        //it just looks better if it's not spead up on mobile
        // masterTL.timeScale(2);
        mobile ? null : masterTL.timeScale(2);
        masterTL.reverse();
    }

    //may be deprecated - we might not need to have this at all if we leave the clones
    function removeClone() {
        getOverlay.remove();
        clone.remove();
        clone = null;
        masterTL = null;
    }
    
    function getPosition(element) {
        var body = document.body;
        var root = document.documentElement;
        var rect = element.getBoundingClientRect();
    
        var scrollTop = window.pageYOffset || root.scrollTop || body.scrollTop || 0;
        var scrollLeft = window.pageXOffset || root.scrollLeft || body.scrollLeft || 0;
    
        var clientTop = root.clientTop || body.clientTop || 0;
        var clientLeft = root.clientLeft || body.clientLeft || 0;
    
        return {
            top: Math.round(rect.top + scrollTop - clientTop),
            left: Math.round(rect.left + scrollLeft - clientLeft),
            height: rect.height,
            width: rect.width
        };
    }
}

function buildComputerAnimation(mobile) {
    var tl = gsap.timeline({ paused: true }); //{ paused: true }

    //transform theo rigin of the gears
    var largeGear = document.querySelector(`#LargeGear`);
    var smallGear = document.querySelector(`#SmallGear`);

    // console.log(document.querySelector('.clone'));

    largeGear.setAttribute('transform-origin', '80 80');
    smallGear.setAttribute('transform-origin', '32.5 32.5')

    tl
        .add('animationStart')
        //first make the gears spin - increments of 45 deg
        .to(largeGear, {
            duration: 0.5,
            rotate: 45,
            repeat: -1,
            ease: 'bounce.out'
        }, 'animationStart')
        .to(smallGear, {
            duration: 0.5,
            rotate: -45,
            repeat: -1,
            ease: 'bounce.out'
        }, 'animationStart')
        .to(`#ComputerStar`, {
            duration: 1,
            fill: '#fce803',
            repeat: -1,
            yoyo: true,
        }, 'animationStart')
        .fromTo(`#ComputerType`, {
            width: 0,
        }, {
            duration: 5,
            width: 400,
            repeat: -1,
        }, 'AnimationStart-=0.75')

        // document.querySelector('#heroContactButton').addEventListener('click', () => tl.play());

    return tl;
}

function buildCityAnimation(mobile) {

    var masterTL = gsap.timeline({ repeat: -1, paused: true })

    //first get teh drawsvg plugin setup for the fireworks
    var fireWorkTL = gsap.timeline( {repeat: -1, repeatDelay: 2} );

    fireWorkTL
        .add('animationStart')
        .to(`#FireworkGroup1, #FireworkGroup2`, {
            visibility: 'visible',
            opacity: 1
        })
        //animating the first firework
        .fromTo(`.firework1Trail`, {
            drawSVG: '0%'
        }, {
            drawSVG: '100%',
            duration: 1
        }, 'animationStart+=0.25')
        .fromTo(`.firework1Boom`, {
            drawSVG: '0%'
        }, {
            drawSVG: '100%',
            duration: 1,
        }, 'animationStart+=1.25')
        .to(`#FireworkGroup1`, {
            opacity: 0,
            duration: 0.5
        }, 'animationStart+=2.25')
        //now animating the second firework
        .fromTo(`.firework2Trail`, {
            drawSVG: '0%'
        }, {
            drawSVG: '100%',
            duration: 1
        }, 'animationStart+=1.5')
        .fromTo(`.firework2Boom`, {
            drawSVG: '0%'
        }, {
            drawSVG: '100%',
            duration: 1,
        }, 'animationStart+=2.5')
        .to(`#FireworkGroup2`, {
            opacity: 0,
            duration: 0.5
        }, 'animationStart+=3.5')
        
    var planeTL = gsap.timeline({ repeat: -1, repeatDelay: 2 });

    planeTL
        //animating the plane flying around
        .to(`#PlaneGroup`, {
            visibility: 'visible',
            x: '-50%',
            y: '-40px'
        },'animationStart')
        .fromTo(`#PlaneGroup`, {
            x: '-50%'
        },{
            x: '200%',
            duration: 7,
            ease: Linear.easeNone
        }, 'animationStart+=0.25')
        .to(`#PlaneGroup`, {
            scaleX: -1,
            y: '-20px0',
            duration: 0.1
        }, 'animationStart+=7.25')
        .to(`#PlaneGroup`, {
            x: '-50%',
            duration: 7,
            ease: Linear.easeNone
        }, 'animationStart+=9')


    masterTL.add('animationStart');
    masterTL.add(fireWorkTL, 'animationStart');
    masterTL.add(planeTL, 'animationStart');


    return masterTL;

}