import { gsap, Linear, Bounce } from 'gsap'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { DrawSVGPlugin } from 'gsap/dist/DrawSVGPlugin'

export default function GoatLoadingAni() {

    //this is the timeline that controls the actual running animation of the GOAT
    var runningTL = gsap.timeline({ paused: true });
    //the timeline that launches other events when 'submit' is clicked
    var submitClickTL = gsap.timeline({ paused: true  });
    //the timeline that controls the ending animation on success
    var successAnimation = gsap.timeline({ paused: true });
    //the timeline that controls the ending animation on failure
    var errorAnimation = gsap.timeline({ paused: true });
    //shuts down and resets all animations
    var endAnimation = gsap.timeline({ paused: true });

    //now try and set the transform origin for all pieces
    gsap.set(['#RunningGoatGroup', '#SuccessGroup', '#ErrorGroup'], {
        transformOrigin: '200px 400px',
        rotate: '-90deg',
    })


    var runningDuration = 0.5;

    runningTL 
        .add('start')
        .to('#RunningGoatGroup', {
            duration: runningDuration,
            y: '+=5%',
            repeat: -1,
            yoyo: true,
            ease: Linear.easeNone,
        }, 'start')
        .to('#FFF', {
            duration: runningDuration,
            morphSVG: {
                shape: '#FBF',
                shapeIndex: 0,
            },
            ease: Linear.easeNone,
            repeat: -1, 
            yoyo: true
        }, 'start')
        .to('#FFB', {
            duration: runningDuration,
            morphSVG: {
                shape: '#FBB',
                shapeIndex: 0,
            },
            ease: Linear.easeNone,
            repeat: -1, 
            yoyo: true
        }, 'start')
        .to('#BFF', {
            duration: runningDuration,
            morphSVG: {
                shape: '#BBF',
                shapeIndex: 0,
            },
            ease: Linear.easeNone,
            repeat: -1, 
            yoyo: true
        }, 'start+=0.25')
        .to('#BFB', {
            duration: runningDuration,
            morphSVG: {
                shape: '#BBB',
                shapeIndex: 0,
            },
            ease: Linear.easeNone,
            repeat: -1, 
            yoyo: true
        }, 'start+=0.25')

    //now building the timeline for the transforms that happen when you click the submit button
    //should morph the button to the goat and go from there
    submitClickTL
        .add('start')
        //first display the overlay
        .fromTo('#ContactSubmitOverlay', {
            x: '100vw',
        }, {
            x: 0,
            opacity: 0.25,
            duration: 0.01,
        }, 'start')
        .fromTo('#LoadingGoatCont', {
            x: '100vw'
        },{
            x: '-50%',
            duration: 0.01,
        }, 'start')
        .to('#RunningGoatGroup', {
            rotate: '0deg',
            duration: 0.5,
            ease: Bounce.ease
        }, 'start+=0.02')

    successAnimation
        .add('start')
        .to('#RunningGoatGroup', {
            rotate: '90deg',
            duration: 0.5
        }, 'start')
        .to('#SuccessGroup', {
            rotate: '0deg',
            duration: 0.5
        }, 'start')
        .fromTo('#SuccessGroup path', {
            drawSVG: '0%'
        }, {
            duration: 0.5,
            drawSVG: '100%',
        }, 'start+=0.6')
        .to('#SuccessGroup path', {
            scale: 1.05,
            duration: 0.25,
            repeat: 3,
            yoyo: true,
        })
        .to('#SuccessGroup', {
            duration: 1,
            opacity: 0,
        },'start+=2')

    errorAnimation
        .add('start')
        .to('#RunningGoatGroup', {
            rotate: '90deg',
            duration: 0.25
        }, 'start')
        .to('#ErrorGroup', {
            rotate: '0',
            duration: 0.25
        }, 'start')

    
    endAnimation
        .add('start')
        .to('#LoadingGoatCont', {
            opacity: 0,
            duration: 0.25,
        }, 'start')
        .to('#ContactSubmitOverlay', {
            opacity: 0,
            duration: 0.01
        })
        

    function restartAll() {
        runningTL.invalidate().restart().pause();
        submitClickTL.invalidate().restart().pause();
        successAnimation.invalidate().restart().pause();
        errorAnimation.invalidate().restart().pause();

        //now reset the pieces for the next animation load
        gsap.set(['#RunningGoatGroup', '#SuccessGroup', '#ErrorGroup'], {
            rotate: '-90deg',
            opacity: 1,
            scale: 1
        })

        gsap.set(['#ContactSubmitOverlay', '#LoadingGoatCont'], {
            x: '100vw',
            opacity: 1,
        })
    }



    return {
        running: runningTL,
        submitClick: submitClickTL,
        onSuccess: successAnimation,
        onError: errorAnimation,
        endAnimation: endAnimation,
        restartAll: restartAll,
    }
}