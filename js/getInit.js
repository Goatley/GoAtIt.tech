
export default function getInit() {
    var windowWidth = window.matchMedia('(max-width: 768px)');

    console.log(windowWidth);

    initGetCards();    
    if (windowWidth.matches) {buildComputerAnimation(true)};
}

function initGetCards() {
    var cards = document.querySelectorAll('.getCardExpander');

    var getOverlay = document.createElement('div');
    getOverlay.setAttribute('style', 'position: fixed; width: 100%; height: 100%; inset: 0; z-index: 11; background-color: #000000')

    var clone = null;
    var target= null;
    var timeline = null;

    window.addEventListener('resize', resize);

    cards.forEach(card => {
        card.addEventListener('mouseenter', openGetCard);
    });

    
    function resize() {
        if (timeline) {
            var progress = timeline.progress();
            var reversed = timeline.reversed();
            timeline.kill();
            buildTimeline(progress, reversed);
        }
    }

    function buildTimeline(progress, reversed) {
        var rect = getPosition(target);

        var height = clone.offsetHeight;  //rect.height * 1.5;
        var width = clone.offsetWidth;
        var x = (rect.width - width) / 2;
        var y = (rect.height - height) / 2;

        TweenLite.set(clone, rect);

        timeline = gsap.timeline({ onReverseComplete: removeClone }) //{ onReverseComplete: removeClone }
            .add('cardStart')
            .fromTo(getOverlay, 0.15, { opacity: 0 }, { opacity: 0.3 }, 'cardStart')
            .fromTo(clone, 0.15, { padding: 0, margin: 0 }, { padding: '1rem' }, 'cardStart')
            .fromTo(clone, 0.25, { x: 0, y: 0 }, { x: x, y: y, width: width, height: height, autoRound: false }, 'cardStart')
            .fromTo('.clone .getCardDescription', 0.1, {opacity: 0}, {opacity: 1}, 'cardStart+=0.2')
            //for if progress was interrupted
            .progress(progress || 0)
            .reversed(reversed || false);
    }

    function openGetCard() {
        target = this;
        clone = target.cloneNode(true);

        clone.classList.add('clone');
        clone.style.margin = '0';

        //i set padding here to get the new width of being regular widht + 2 rem (1 on each side)
        //then, in the gsap transition I go from padding: 0 to padding: 1rem so that the initial growth starts at the same place
        clone.style.padding = '1rem';
        clone.addEventListener('mouseleave', closeGetCard);

        //now make the extra info on the cards shown on just the clone
        clone.querySelector('.getCardDescription').style.display = 'block';
        clone.style.overflow = 'hidden';

        document.body.append(getOverlay);
        document.body.append(clone);

        if (this.classList.contains('getComputer')) {
            buildComputerAnimation();
        } else if (this.classList.contains('getCity')) {

        } else if (this.classList.contains('getBudget')) {

        }

        buildTimeline();
        timeline.play();
    }

    function closeGetCard() {
        timeline.timeScale(2);
        timeline.reverse();
    }

    function removeClone() {
        getOverlay.remove();
        clone.remove();
        timeline=null;
        target=null;
        clone=null;
    }
    
    function getPosition(element) {
        var body = document.body;
        var root = document.documentElement;
        var rect = element.getBoundingClientRect();
    
        var scrollTop = window.pageYOffset || root.scrollTop || body.scrollTop || 0;
        var scrollLeft = window.pageXOffset || root.scrollLeft || body.scrollLeft || 0;
    
        var clientTop = root.clientTop || body.clientTop || 0;
        var clientLeft = root.clientLeft || body.clientLeft || 0;
    
        return {
            top: Math.round(rect.top + scrollTop - clientTop),
            left: Math.round(rect.left + scrollLeft - clientLeft),
            height: rect.height,
            width: rect.width
        };
    }
}

function buildComputerAnimation(mobile) {
    var tl = gsap.timeline(); //{ paused: true }

    //transform theo rigin of the gears
    var largeGear = document.querySelector(`${mobile ? '' : '.clone'} #LargeGear`);
    var smallGear = document.querySelector(`${mobile ? '' : '.clone'} #SmallGear`);

    // console.log(document.querySelector('.clone'));

    largeGear.setAttribute('transform-origin', '80 80');
    smallGear.setAttribute('transform-origin', '32.5 32.5')

    tl
        .add('animationStart')
        //first make the gears spin - increments of 45 deg
        .to(largeGear, 0.5, {
            rotate: 45,
            repeat: -1,
            ease: 'bounce.out'
        }, 'animationStart')
        .to(smallGear, 0.5, {
            rotate: -45,
            repeat: -1,
            ease: 'bounce.out'
        }, 'animationStart')
        .to(`${mobile ? '' : '.clone'} #ComputerStar`, 1, {
            fill: '#fce803',
            repeat: -1,
            yoyo: true,
        }, 'animationStart')
        .fromTo(`${mobile ? '' : '.clone'} #ComputerType`, 5, {
            width: 0,
        }, {
            width: 400,
            repeat: -1,
        }, 'AnimationStart-=0.75')

        // document.querySelector('#heroContactButton').addEventListener('click', () => tl.play());
}

