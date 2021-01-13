import { gsap } from 'gsap';

export default function buildComputerAnimation() {
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

    return tl;
}