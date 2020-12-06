export default function contactInit() {
    var isContactOpen = false;

    //get dom elements
    var heroContactBtn = document.querySelector('.heroContactButton');
    var contactBtn = document.querySelector('.contactButton');
    var contactForm = document.querySelector('.contactFormContainer');
    var contactFormBG = document.querySelector('.contactFormBgGrey')


    //combining into a single function
    //yea, if you clicked the 'contact' button again while it was open, it would close the form
    //but you'll never be able to see if while the form is open, and I can re-use this for the 'X' at the top right corner to close
    const openContactForm = () => {
        if (isContactOpen) {
            return;
        } else {
            contactForm.classList.remove('contactHidden');
            contactFormBG.classList.remove('contactHidden');
            isContactOpen = true;
        }
    }

    //checks to see if the form is open, then closes if it is
    //for clicking on the grey background or the x to close the form
    const closeContactForm = () => {
        if (isContactOpen) {
            contactForm.classList.add('contactHidden');
            contactFormBG.classList.add('contactHidden');
            isContactOpen = false;
        }
    }

    //add the event listeners for the contact buttons to open the form
    
    

    heroContactBtn.addEventListener('click', openContactForm);
    contactBtn.addEventListener('click', openContactForm);
    contactFormBG.addEventListener('click', closeContactForm);
    contactBtn.addEventListener('mouseenter', () => {
        contactBtn.style.transform = 'scale(1.1)';
    });

    contactBtn.addEventListener('mouseleave', () => {
        contactBtn.style.transform = 'scale(1)';
    });
    
}