import { gsap, Linear } from 'gsap'

export default function flagAnimation() {
    var tl = new gsap.timeline({repeat: -1, paused: true });

    tl.add('animationStart')
    tl.to('#Flag0', {
            duration: 0.5,
            morphSVG: '#Flag1',
            ease: Linear.easeNone
    })
    tl.to('#Flag0', {
        duration: 0.5,
        morphSVG: '#Flag2',
        ease: Linear.easeNone
    })
    tl.to('#Flag0', {
        duration: 0.5,
        morphSVG: '#Flag3',
        ease: Linear.easeNone
    })
    tl.to('#Flag0', {
        duration: 0.5,
        morphSVG: '#Flag0',
        ease: Linear.easeNone
    })

    return tl;

}
