import { gsap, Linear } from 'gsap'

export function apiAnimation() {
    var tl = gsap.timeline({ paused: true })

    const svg = document.querySelector('#consultingAPISVG');

    var bulbTL = gsap.timeline({ paused: true })

    bulbTL
        .add('start')
        .to('.apiLightBulb', {
            duration: 0.05,
            fill: '#F7FA5C'
        })
        .to('.apiLightBulb', {
            duration: 0.05,
            fill: 'none'
        })
        .to('.apiLightBulb', {
            duration: 0.05,
            fill: '#F7FA5C'
        })
        .to('.apiLightBulb', {
            duration: 0.05,
            fill: 'none'
        })
        .to('.apiLightBulb', {
            duration: 0.05,
            fill: '#F7FA5C'
        })

    tl
        .add('start')
        .to('#left_plug', {
            duration: 0.2,
            transform: 'translate(5px, -2.5px)'
        }, 'start')
        .to('#right_plug', {
            duration: 0.2,
            transform: 'translate(-4.5px, 2px) rotate(2deg)'
        }, 'start')
        .add(bulbTL.play())

    return tl;
}

export function rocketShipAnimation() {
    var tl = gsap.timeline({paused: true})

    var shipTL = gsap.timeline({paused: true, yoyo: true, repeat: -1})
    var smokeTL = gsap.timeline({paused: true, repeat: -1})
    var shipShake = gsap.timeline({paused: true, repeat: -1})

    gsap.set('#rocket_ship', {
        transformOrigin: '50% 50%'
    })

    shipShake
        .to('#rocket_ship', {
            duration: 0.1,
            rotate: '1deg'
        })
        .to('#rocket_ship', {
            duration: 0.1,
            rotate: '-1deg',
        })


    shipTL
        .add('start')
        .to('.rocketSVG', {
            duration: 0.5,
            x: '10',
            ease: Linear.easeNone
        }, 'start')
        .to('.rocketSVG', {
            duration: 0.5,
            x: 0,
            ease: Linear.easeNone
        }, 'start+0.5')
        .to('.rocketSVG', {
            duration: 0.5,
            x: -10,
            ease: Linear.easeNone
        }, 'start+1')

    smokeTL
        .add('start')
        .to('.smoke', {
            duration: 0.5,
            y: '+=100',
            opacity: 1,
            stagger: 0.2,
        }, 'start')
        .to('.smoke', {
            duration: 0.5,
            opacity: 0,
            stagger: 0.2
        }, 'start+=0.5')

    tl
        .add('start')
        .add(shipTL.play(), 'start')
        .add(smokeTL.play(), 'start')
        .add(shipShake.play(), 'start')

    return tl;
}

export function cloudInfraAni() {
    var tl = gsap.timeline({paused: true, repeat: -1})

    tl
        .add('start')
        .fromTo('#cloudArrowSVG', {
            y: 0
        }, {
            duration: 1,
            fill: '#FF4242',
            y: -50
        }, 'start')
        .to('#cloudOutlineSVG', {
            duration: 1,
            fill: '#FF4242',
        }, 'start')
        .to({}, {duration: 1})
        // .addPause(0.5)

    return tl;
}