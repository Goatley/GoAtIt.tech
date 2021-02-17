import { gsap } from 'gsap';
import submitForm from '../functions/contactSubmit';

//importing the loading animations here
import GoatLoadingAni from './animations/GoatRunningAnimation';
import { buildFormTimeline, buildSubmitHoverTL, buildCloseHoverTL, buildFormSubmitComplete } from './animations/submitAnimations';

export default function contactInit() {
    //state variable to determine if the contact form is open or not
    var contactOpen = false;

    //establish dom elements for the contact form, overlay, and buttons
    var contactForm = document.querySelector('#contactForm');
    var overlay = document.querySelector('#contactOverlay');
    var contactOpenBtn = document.querySelector('#contactOpenBtn');
    var contactSubmitBtn = contactForm.querySelector('#contactFormSubmit');
    var contactCloseBtn = contactForm.querySelector('#contactFormClose');
    var midContactBtn = document.querySelector('.midContactBtn');

    //establishes the timeline for the opening animation
    var openFormAni = buildFormTimeline();
    var submitHoverAni = buildSubmitHoverTL();
    var closeHoverAni = buildCloseHoverTL();
    var loadingAnimations = GoatLoadingAni();
    var formSubmitcomplete = buildFormSubmitComplete();

    //establish event listeners to open/close form
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

    //event listener for middle contact button
    midContactBtn.addEventListener('click', () => {
        document.querySelector('#Contact').scrollIntoView({behavior: 'smooth'})
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
        submitForm(firstName, lastName, email, description, toggleForm, loadingAnimations, formSubmitcomplete);

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
}