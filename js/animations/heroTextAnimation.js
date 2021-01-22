import { gsap } from 'gsap'

export default function() {
    var tl = gsap.timeline({ paused: true })

    tl 
        .add('start')
        .fromTo('.heroText h1', {
            y: '+=25',
            opacity: 0,
        }, {
            y: '-=25',
            duration: 0.5,
            opacity: 1,
        }, 'start')
        .fromTo('.heroText h2', {
            y: '+=25',
            opacity: 0,
        }, {
            y: '-=25',
            duration: 0.5,
            opacity: 1,
        }, 'start+=0.5')
        .fromTo('.heroTextBtn', {
            y: '+=25',
            opacity: 0,
        }, {
            y: '-=25',
            duration: 0.5,
            opacity: 1,
        }, 'start+=0.75')

    return tl;
}

