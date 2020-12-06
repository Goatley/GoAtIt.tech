export default function heroInit() {

    //add an event listener to make the contact button grow when you hover it
    var btn = document.querySelector('#heroContactButton');
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'scale(1.1)';
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'scale(1)';
    })



    /*
    Cloud moving portion
    */

    var cloud1Len = document.querySelector('#Cloud1Group').clientWidth;
    var cloud2Len = document.querySelector('#Cloud2Group').clientWidth;
    var cloud3Len = document.querySelector('#Cloud3Group').clientWidth;

    var tl = new gsap.timeline({
    });

    tl.add('cloudStart')
    tl.to('#Cloud1Group', 40, {
        x: window.innerWidth + cloud1Len,
        ease: Linear.easeNone,
        repeat: -1,
    }, 'cloudStart+=20')
    tl.to('#Cloud2Group', 60, {
        x: window.innerWidth + cloud2Len,
        ease: Linear.easeNone,
        repeat: -1,
    }, 'cloudStart-=10')
    tl.to('#Cloud3Group', 30, {
        x: window.innerWidth + cloud3Len,
        ease: Linear.easeNone,
        repeat: -1,
    }, 'cloudStart+=1')
    tl.to('#Cloud4Group', 55, {
        x: window.innerWidth + cloud3Len,
        ease: Linear.easeNone,
        repeat: -1,
    }, 'cloudStart+=20')
    tl.to('#Cloud5Group', 45, {
        x: window.innerWidth + cloud3Len,
        ease: Linear.easeNone,
        repeat: -1,
    }, 'cloudStart+=11')

    //this makes the clouds bob up and down at different times
    gsap.to('#Cloud1Group', 3, {
        yoyo: true,
        repeat: -1,
        y: '+=20',
        ease: Power1.easeInOut,
    })
    gsap.to('#Cloud2Group', 6, {
        yoyo: true,
        repeat: -1,
        y: '+=25',
        ease: Power1.easeInOut,
    })
    gsap.to('#Cloud3Group', 3, {
        yoyo: true,
        repeat: -1,
        y: '+=15',
        ease: Power1.easeInOut,
        delay: 1.25,
    })
    gsap.to('#Cloud4Group', 3, {
        yoyo: true,
        repeat: -1,
        y: '+=15',
        ease: Power1.easeInOut,
        delay: 1.25,
    })
    gsap.to('#Cloud5Group', 3, {
        yoyo: true,
        repeat: -1,
        y: '+=15',
        ease: Power1.easeInOut,
        delay: 1.25,
    })
}
