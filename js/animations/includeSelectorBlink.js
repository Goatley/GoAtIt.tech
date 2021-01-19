import { gsap, Linear } from 'gsap';

//@param I'm passing an array of all of the objects in for both left and right selectors
//there will be one timeline object affected each of these
export default function includeSelectorAni(left, right) {
    var tl = gsap.timeline({yoyo: true, repeat: -1})

    tl.add('start')
    tl.to([left, right], {
        duration: 1,
        scale: 1.5,
        ease: Linear.easeNone,
    }, 'start')

    return tl;
}