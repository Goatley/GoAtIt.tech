import { gsap, Linear } from 'gsap';
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

export default function buildCityAnimation() {

    //register the drawSVG plugin used in the fireworks
    gsap.registerPlugin(DrawSVGPlugin);

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