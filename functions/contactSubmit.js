import axios from 'axios';

export default async function submitForm(fName, lName, contactEmail, projectdesc) {
    console.log('test');
    var res =  await axios.post(
        'https://doge5hhfe8.execute-api.us-east-1.amazonaws.com/prod/submitcontact',
        {
            firstName: fName,
            lastName: lName,
            email: contactEmail,
            description: projectdesc,
        }
    )

    console.log(res);
    return res;
}