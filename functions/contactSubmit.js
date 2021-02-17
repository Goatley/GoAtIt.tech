import axios from 'axios';

//performs the form submission and controls the animations
//@param loadingAnimations is an object that holds the animation timelines for the loading pieces after clicking submit
//@param toggleForm holds the animation to close the form after submission
//@param the rest are teh individual form inputs, aptly named 
export default async function submitForm(fName, lName, contactEmail, projectdesc, toggleForm, loadingAnimations, formSubmitcomplete) {
    
//first play the loading animation
    loadingAnimations.running.play();
        
    //then swing the animation into view
    loadingAnimations.submitClick.play();

    //play the animation to shrink the form to nothing
    formSubmitcomplete.play();



    var res = await axios.post(
        'https://api.goatit.tech/prod/submitcontact',
        {
            firstName: fName,
            lastName: lName,
            email: contactEmail,
            description: projectdesc,
        }
    ).catch(error => {
        console.log('oops... looks like we ran into an error')
        console.log(error.message)
        //first we want to play the 'loading' animation after click
        loadingAnimations.submitClick.pause();
        loadingAnimations.onError.play();
        loadingAnimations.onError.eventCallback('onComplete', () => {
            setTimeout(() => loadingAnimations.endAnimation.play(), 2000);
        });
        loadingAnimations.endAnimation.eventCallback('onComplete', () => toggleForm());
    })

    //if successful
    if (res.status == '200') {
        //first change the button text to open the form to 'thank you'
        document.querySelector('#contactOpenBtn').innerHTML = 'Thank you!'

        //literally completes too fast usually... instead adding a one second pause, lol
        setTimeout(() => {
            //first we want to play the 'loading' animation after click
            loadingAnimations.submitClick.pause();
            //close the form
            loadingAnimations.onSuccess.play();
            loadingAnimations.onSuccess.eventCallback('onComplete', () => loadingAnimations.endAnimation.play());
            loadingAnimations.endAnimation.eventCallback('onComplete', () => {
            
            
                toggleForm();
                //wait for the form to dissapear, then remove it
                setTimeout(() => {
                    document.body.removeChild(document.querySelector('#contactForm'));
                    document.body.removeChild(document.querySelector('#contactOverlay'));
                }, 1000);
            });
        }, 1000);
    }

    return res;
}