import { gsap } from 'gsap';
import { morphSVGPlugin } from 'gsap/MorphSVGPlugin';

export default function navMobileToggleAnimation() {

    //register morphSVG
    // gsap.registerPlugin(morphSVGPlugin);

    //first establish the timeline from gsap
    var tl = gsap.timeline({ paused: true })

    //determine the duration of the tiemline
    var aniDuration = 0.3;

    tl
        .add('start')
        //these first three transform the open menu to the close menu
        .to('#navOpenTop', {
            duration: aniDuration,
            morphSVG: '#DiagTop',
            stroke: '#ff4242',
        }, 'start')
        .to('#navOpenBot', {
            duration: aniDuration,
            morphSVG: '#DiagBot',
            stroke: '#ff4242',
        }, 'start')
        .to('#navOpenMid', {
            duration: aniDuration,
            morphSVG: '#navGoatPath',
            fill: '#ffffff'
        }, 'start')
        //now make the overlay appear
        .fromTo('#navOverlay', {
            y: '-100vh',
        }, 
        {
            y: 0,
            duration: 0.01
        },'start')
        .fromTo('#navOverlay', {
            opacity: 0,
        }, 
        {
            duration: aniDuration,
            opacity: aniDuration,
        }, 'start')
        //now we need to make the actual nav menu pop in from the right side
        .fromTo('#navSideMenu', {
            x: '100%'
        }, {
            duration: aniDuration,
            x: '0%',
        }, 'start')


    return tl;
}