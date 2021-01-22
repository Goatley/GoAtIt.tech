import { gsap, Linear, Power1 } from 'gsap';
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

import heroStart from './animations/heroStart';

export default function heroInit() {

    gsap.registerPlugin(MorphSVGPlugin);

    //add an event listener to make the contact button grow when you hover it
    var btns = document.querySelectorAll('#heroContactButton, #middleContactButton, #contactContactButton');
    btns.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'scale(1.2)';
        });
    
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'scale(1)';
        })
    })

    //event listener to scroll to our contact section if hero contact button is clicked
    document.querySelector('#heroContactButton button').addEventListener('click', () => {document.querySelector('#Contact').scrollIntoView({behavior: 'smooth'}); toggleMenu();})

    var heroAni = heroStart();

    window.onload = () => {

        //after load, make the items appear
        heroAni.play();
    };

    
}


