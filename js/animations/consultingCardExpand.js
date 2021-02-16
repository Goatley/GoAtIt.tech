import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/*
@param card - the card element we'd like to run this function on
 card has 'expanded' property and 'index' property which holds whether it's expanded and which  card it is, respectively
@return - returns a gsap timeline object that holds the animation for expanding the card


*/
export function desktopCardExpand(card) {
    //create the timeline
    var tl = gsap.timeline({ paused: true });
    // console.log(card);
    

    //set transform origin based on if it's on left or right side of screen
    //the card.index holds the index;  basiclaly, if it's odd, make it top right
    if (card.index & 1) {
        //if odd
        gsap.set(card, {
            transformOrigin: '10px right'
        })
    } else {
        //if even
        gsap.set(card, {
            transformOrigin: '10px left'
        })
    }

    //set the transform origin of the card descriptions that are initiall hidden
    gsap.set(card.querySelector('.cardDescExpanded'), {
        transformOrigin: 'top left',
        // y: '70px',
        x: '20px',
    })


    //duration of animation
    var aniDuration = 0.2;

    tl
        .add('start')
        .set(card, {
            zIndex: 20,
        }, 'start')
        .to(card, {
            duration: aniDuration,
            scaleX: 2,
            scaleY: 2,
        }, 'start')
        .to(card.querySelector('.cardReadMore'), {
            duration: aniDuration,
            visibility: 'hidden'
        }, 'start')
        .to(card.querySelector('h4'), {
            duration: aniDuration/2,
            scale: 1/1.5,
            x: '-20px',
            y: '-10px',
        }, 'start')
        .to(card.querySelector('.cardDescBody'), {
            duration: aniDuration/2,
            opacity: 1
        },'start+=0.1')
        .to(card.querySelector('.cardDescExpanded'), {
            duration: aniDuration/2,
            scale: 1/2,
        }, 'start')
        .to(card.querySelector('.consultingCardImg'), {
            duration: aniDuration,
            scale: 1/2,
            y: '-=20px'
        }, 'start')

    return tl;
}

export function mobileCardExpand(card) {
    //establish the contents that we want to fill out for the mobile cards
    var desc = card.querySelector('.cardDescExpanded').innerHTML;
    var title = card.querySelector('.cardTitle').innerHTML;
    var svg = card.querySelector('.consultingCardImg').cloneNode(true);

    //update the svg styling components
    svg.style = '';
    svg.style.display = 'flex';
    svg.style.backgroundColor = '#d1e3dd';
    svg.style.width = '100%';
    // svg.style.transform = 'translate(0px, -20px)';
    svg.querySelector('svg').style.maxHeight = '80%';


    var mobileCard = document.querySelector('.mobileExpandedCard');
    var mobileCardOverlay = document.querySelector('.mobileCardOverlay');

    var aniDuration = 0.2;

    mobileCard.querySelector('.mobileTitleContent').innerHTML = title;
    mobileCard.querySelector('.mobileBodyContent').innerHTML = desc;
    mobileCard.querySelector('.mobileCardSVG').appendChild(svg);

    gsap.set(mobileCardOverlay, {
        duration: aniDuration,
        x: '0'
    })

    gsap.set(mobileCard, {
        x: '-150vw'
    })

    gsap.to(mobileCardOverlay, {
        duration: aniDuration,
        opacity: 0.5,
    })

    gsap.to(mobileCard, {
        duration: aniDuration,
        x: '-50%',
    })
}

export function closeMobileCard() {

    var aniDuration = 0.2;
    
    gsap.to('.mobileExpandedCard', {
        duration: aniDuration,
        x: '+=100vw'
    });
    gsap.to('.mobileCardOverlay', {
        duration: aniDuration / 2,
        opacity: 0,
        onComplete: () => {gsap.set('.mobileCardOverlay', {
            x: '-100vw'
        })}
    });

    document.querySelector('.mobileCardSVG').removeChild(document.querySelector('.mobileCardSVG .consultingCardImg'));
}


export function fadeCards(cards) {

    var aniDuration = 0.2;

    gsap.to(cards, {
        duration: aniDuration,
        opacity: 0.5,
    })
}

//unfades cards
//@param cards can be either an array of cards or a single card
export function unfadeCards(cards) {
    var aniDuration = 0.2;

    gsap.to(cards, {
        duration: aniDuration,
        opacity: 1,
    })
}


/*
// function that controls the hover animation when you ENTER the card
//In conjunction with teh 'mouseleave' event right below
//@param card the actual element that you are adding the listener to
//@param active is whether the card is currently active/opened or not (to disable listener if it is)
//@return returns a gsap timeline to play when unhovered (mouseenter event)
*/
export function mouseEnterEVNT(card, active) {
    if (!active) {
        gsap.to(card.querySelector('.consultingCardImg'), {
            duration: 0.2,
            translateY: '-45px',
            backgroundColor: '#d1e3dd',
        });
        gsap.to(card.querySelector('p'), {
            duration: 0.2,
            translateX: '20px',
            scale: 1.1,
            color: '#FF4242'
        });
    }
}


/*
// function that controls the hover animation when you LEAVE the card
//In conjunction with teh 'mouseenter' event right above
//@param card the actual element that you are adding the litener to
//@param active is whether the card is currently active/opened or not (to disable listener if it is)
//@return returns a gsap timeline to play when unhovered (mouseleave event)
*/
export function mouseLeaveEVNT(card, active) {
    if(!active) {
        gsap.to(card.querySelector('.consultingCardImg'), {
            duration: 0.2,
            translateY: '-20px',
            backgroundColor: '#f2f7f6'
        });
        gsap.to(card.querySelector('p'), {
            duration: 0.2,
            translateX: '0px',
            scale: 1,
            color: '#313335'
        });
    }
}

export function scrollListener(card) {
    
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(card.querySelector('.consultingCardImg'), {
        duration: 0.2,
        translateY: '-40px',
        backgroundColor: '#d1e3dd',
        scrollTrigger: {
            trigger: card,
            start: 'top 55%',
            end: 'top 35%',
            onEnter: () => card.svgAnimation?.play(),
            onEnterBack: () => card.svgAnimation?.play(),
            onLeave: () => card.svgAnimation?.restart().pause(),
            onLeaveBack: () => card.svgAnimation?.restart().pause(),
            toggleActions: 'play reverse play reverse'
        }
    });
    gsap.to(card.querySelector('p'), {
        duration: 0.2,
        translateX: '20px',
        scale: 1.1,
        color: '#FF4242',
        scrollTrigger: {
            trigger: card,
            start: 'top 55%',
            end: 'top 35%',
            toggleActions: 'play reverse play reverse'
        }
    });
}