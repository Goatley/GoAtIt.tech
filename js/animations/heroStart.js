import { gsap } from 'gsap';

import initiateClouds from './cloudAnimations';
import flagAnimation from './heroFlagAnimation';
import heroTextAnimation from './heroTextAnimation';

//animation to initialize the hero image
//will have the mountain pop up and clouds pop down before animating upon load
export default function heroStart() {

    var cloudsTL = initiateClouds();
    var flagTL = flagAnimation();
    var textTL = heroTextAnimation();

    var tl = gsap.timeline({ pause: true });

    cloudsTL.pause(6);
    cloudsTL.play();


    tl
        .add('start')
        .fromTo(['#MountainGroup', '#FlagGroup', '#GoatGroup'], {
            y: '+=400'
        }, {
            duration: 1,
            y: '0',
        }, 'start+=0.5')
        .fromTo(['#Cloud2Group', '#Cloud3Group'], {
            y: '-=500'
        }, {
            duration: 1,
            y: '+=500',
            stagger: 0.25
        }, 'start+=1.5')
        .add('end')
        .add(flagTL.play(),'end')
        .add(textTL.play(), 'end+=0.25')
    
        

    return tl;
}