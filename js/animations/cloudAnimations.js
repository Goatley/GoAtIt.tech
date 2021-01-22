import { gsap, Linear } from 'gsap'

export default function initiateClouds() {
        /*
    Cloud moving portion
    */

    var cloud1Len = document.querySelector('#Cloud1Group').clientWidth;
    var cloud2Len = document.querySelector('#Cloud2Group').clientWidth;
    var cloud3Len = document.querySelector('#Cloud3Group').clientWidth;

    var tl = gsap.timeline({ 
    });

    tl.add('cloudStart')
    tl.to('#Cloud1Group', {
        duration: 40,
        x: window.innerWidth + cloud1Len,
        ease: Linear.easeNone,
        repeat: -1,
    }, 'cloudStart+=20')
    tl.to('#Cloud2Group', {
        duration: 60,
        x: window.innerWidth + cloud2Len,
        ease: Linear.easeNone,
        repeat: -1,
    }, 'cloudStart-=10')
    tl.to('#Cloud3Group', {
        duration: 30,
        x: window.innerWidth + cloud3Len,
        ease: Linear.easeNone,
        repeat: -1,
    }, 'cloudStart+=1')
    tl.to('#Cloud4Group', {
        duration: 55,
        x: window.innerWidth + cloud3Len,
        ease: Linear.easeNone,
        repeat: -1,
    }, 'cloudStart+=20')
    tl.to('#Cloud5Group', {
        duration: 45,
        x: window.innerWidth + cloud3Len,
        ease: Linear.easeNone,
        repeat: -1,
    }, 'cloudStart+=11')

    return tl;

    //this makes the clouds bob up and down at different times
    // gsap.to('#Cloud1Group', 3, {
    // yoyo: true,
    // repeat: -1,
    // y: '+=20',
    // ease: Power1.easeInOut,
    // })
    // gsap.to('#Cloud2Group', 6, {
    // yoyo: true,
    // repeat: -1,
    // y: '+=25',
    // ease: Power1.easeInOut,
    // })
    // gsap.to('#Cloud3Group', 3, {
    // yoyo: true,
    // repeat: -1,
    // y: '+=15',
    // ease: Power1.easeInOut,
    // delay: 1.25,
    // })
    // gsap.to('#Cloud4Group', 3, {
    // yoyo: true,
    // repeat: -1,
    // y: '+=15',
    // ease: Power1.easeInOut,
    // delay: 1.25,
    // })
    // gsap.to('#Cloud5Group', 3, {
    // yoyo: true,
    // repeat: -1,
    // y: '+=15',
    // ease: Power1.easeInOut,
    // delay: 1.25,
    // })
}