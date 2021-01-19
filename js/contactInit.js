import { gsap } from 'gsap';;
import submitForm from '../functions/contactSubmit'

export default function contactInit() {
    //state variable to determine if the contact form is open or not
    var contactOpen = false;

    //establish dom elements for the contact form, overlay, and buttons
    var contactForm = document.querySelector('#contactForm');
    var overlay = document.querySelector('#contactOverlay');
    var contactOpenBtn = document.querySelector('#contactOpenBtn');
    var contactSubmitBtn = contactForm.querySelector('#contactFormSubmit');
    var contactCloseBtn = contactForm.querySelector('#contactFormClose');

    //establishes the timeline for the opening animation
    var openFormAni = buildTimeline();
    var submitHoverAni = buildSubmitHoverTL();
    var closeHoverAni = buildCloseHoverTL();

    //establish event listeners
    contactOpenBtn.addEventListener('click', () => toggleForm());
    // contactSubmitBtn.addEventListener('click', () => toggleForm());
    contactCloseBtn.addEventListener('click', () => toggleForm());

    //event listeners to make buttons grow
    contactSubmitBtn.addEventListener('mouseenter', () => {
        submitHoverAni.play();
    })
    contactSubmitBtn.addEventListener('mouseleave', () => {
        submitHoverAni.reverse();
    })

    /*function call to submit the form
    first - prevent default so the html form doesn't submit
    then use axios to actually submit the post request to our url
    then wait for a response to get the update
    */
    contactSubmitBtn.addEventListener('click', (e) => {
        //dont' submit the form normally
        e.preventDefault();

        var firstName = contactForm.querySelector('.contactFirstName').value;
        var lastName = contactForm.querySelector('.contactLastName').value;
        var email = contactForm.querySelector('.contactEmail').value;
        var description = contactForm.querySelector('.contactDescription').value;

        //run the submit function
        //internally, it will update and run animations if successful
        submitForm(firstName, lastName, email, description);

    })

    //close button transitions
    contactCloseBtn.addEventListener('mouseenter', () => {
        closeHoverAni.play();
    })
    contactCloseBtn.addEventListener('mouseleave', () => {
        closeHoverAni.reverse();
    })

    //functions to keep track of state
    const toggleForm = () => {
        if (contactOpen) {
            openFormAni.reverse();
        } else if (!contactOpen) {
            openFormAni.play();
        }

        contactOpen = !contactOpen;        
    }

    //builds the animation timeline to show the form
    function buildTimeline() {

        var tl= gsap.timeline( { paused: true } );

        tl
            .add('start')
            .fromTo(contactForm, {
                y: '100%'
            },
            {
                duration: 0.5,
                y: '-50%',
            }, 'start')
            .fromTo(overlay, {
                y: '-100vh',
            }, 
            {
                y: 0,
                duration: 0.01
            },'start')
            .fromTo(overlay, {
                opacity: 0,
            }, 
            {
                duration: 0.5,
                opacity: 0.5,
            }, 'start')

        return tl;
    }

    function buildSubmitHoverTL() {
        var tl = gsap.timeline({paused: true});

        tl
            .to(contactSubmitBtn, {
                duration: 0.1,
                scale: 1.1,
                backgroundColor: '#FF4242',
                color: '#ffffff'
            })


        return tl;
    }

    function buildCloseHoverTL() {
        var tl = gsap.timeline({paused: true});

        tl
            .to(contactCloseBtn, {
                duration: 0.1,
                color: '#FF4242'
            })

        return tl;
    }
}