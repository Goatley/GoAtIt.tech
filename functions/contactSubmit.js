import axios from 'axios';

export default async function submitForm(fName, lName, contactEmail, projectdesc, toggleForm) {
    //first we want to play the 'loading' animation after click
    console.log('loading')


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
        //close the form
        toggleForm();
        console.log('success!')
    } else {
        console.log('oops... looks like we ran into an error')
    }

    return res;
}