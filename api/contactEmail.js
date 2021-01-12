module.exports = (req, res) => {

    const { firstName, lastName, email, description } = req.body;

    console.log('starting email send');
    //setting up mailing variables here

    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = { 
        "personalizations": [
            {
                "to": {
                    'email': 'adam.goatley@goatit.tech',
                    'name': 'Adam Goatley'
                },
                'subject': 'You have a potential new customer!',
                'from': 'customer@goatit.tech',
                'content': {
                    "type": "text/plain",
                    "value": `Somebody has reached out to you for a potential project.  Here's what we've got:
                    First name: ${firstName}
                    Last name: ${lastName}
                    Contact Email Address: ${email}
                    A quick description of their project:
                        ${description}
                        
                    Good luck!`,
                }
            }
        ],
    }


    await sgMail
    .send(msg)
    .then((msg) => {
        console.log(msg);
        console.log('Email sent');

        res.statusCode(200);
        res.json({
            msg: 'Email sent successfully',
        });
    })
    .catch((error) => {
        console.error(error);
        res.statusCode(400);
        res.send('Oops!  We ran into an error' + error);
    })

}