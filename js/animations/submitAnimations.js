import { gsap } from 'gsap';

//builds the animation timeline to show the form
export function buildFormTimeline() {

    var contactForm = document.querySelector('#contactForm');
    var overlay = document.querySelector('#contactOverlay');

    var tl= gsap.timeline( { paused: true } );

    tl
        .add('start')
        .fromTo(contactForm, {
            y: '100%'
        },
        {
            duration: 0.5,
            y: '-50%',
        }, 'start')
        .fromTo(overlay, {
            y: '-100vh',
        }, 
        {
            y: 0,
            duration: 0.01
        },'start')
        .fromTo(overlay, {
            opacity: 0,
        }, 
        {
            duration: 0.5,
            opacity: 0.5,
        }, 'start')

    return tl;
}


//controls the animation of the submit button ON HOVER
export function buildSubmitHoverTL() {

    var contactSubmitBtn = contactForm.querySelector('#contactFormSubmit');

    var tl = gsap.timeline({paused: true});

    tl
        .add('start')
        .to(contactSubmitBtn, {
            duration: 0.1,
            scale: 1.1,
        }, 'start')
        .to('#contactFormSubmit', {
            duration: 0.1,
            backgroundColor: '#ff4242',
            color: '#ffffff'
        }, 'start')



    return tl;
}

export function buildCloseHoverTL() {

    var contactCloseBtn = contactForm.querySelector('#contactFormClose');
    
    var tl = gsap.timeline({paused: true});

    tl
        .to(contactCloseBtn, {
            duration: 0.1,
            color: '#FF4242'
        })

    return tl;
}

export function buildFormSubmitComplete() {
    
    var contactForm = document.querySelector('#contactForm');
    var overlay = document.querySelector('#contactOverlay');

    var tl = gsap.timeline({paused: true})

    tl
        .add('start')
        .to(contactForm, {
            duration: 0.5,
            scale: 0
        })

    return tl;
}