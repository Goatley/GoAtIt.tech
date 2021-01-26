import axios from 'axios';

//performs the form submission and controls the animations
//@param loadingAnimations is an object that holds the animation timelines for the loading pieces after clicking submit
//@param toggleForm holds the animation to close the form after submission
//@param the rest are teh individual form inputs, aptly named 
export default async function submitForm(fName, lName, contactEmail, projectdesc, toggleForm, loadingAnimations) {
    
//first play the loading animation
    loadingAnimations.running.play();
        
    //then swing the animation into view
    loadingAnimations.submitClick.play();


    var res =  await axios.post(
        'https://api.goatit.tech/prod/submitcontact',
        {
            firstName: fName,
            lastName: lName,
            email: contactEmail,
            description: projectdesc,
        }
    )

    console.log(res);

    //if successful
    if (res.status == '200') {
        //literally completes too fast usually... instead adding a one second pause, lol
            //first we want to play the 'loading' animation after click
    console.log('loading')

    setTimeout(() => {
        loadingAnimations.submitClick.pause();
        //close the form
        loadingAnimations.onSuccess.play();
        loadingAnimations.onSuccess.eventCallback('onComplete', () => loadingAnimations.endAnimation.play());
        loadingAnimations.endAnimation.eventCallback('onComplete', () => {
            toggleForm();
            setTimeout(() => loadingAnimations.restartAll(), 1000);
        });
        console.log('success!')
    }, 2000);

    return;
    } else {
        console.log('oops... looks like we ran into an error')
        loadingAnimations.onError.play();
        loadingAnimations.onError.eventCallback('onComplete', () => loadingAnimations.endAnimation.play());
        loadingAnimations.endAnimation.eventCallback('onComplete', () => toggleForm());
    }

    return res;
}