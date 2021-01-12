export default function navInit() {
    var contactBtn = document.querySelector('#ContactBtn');

    contactBtn.addEventListener('mouseenter', () => {
        contactBtn.style.transform = 'scale(1.1)';
        contactBtn.querySelector('button').style.backgroundColor = '#FF4242';
        contactBtn.querySelector('button').style.color = '#ffffff';
    });

    contactBtn.addEventListener('mouseleave', () => {
        contactBtn.style.transform = 'scale(1)';
        contactBtn.querySelector('button').style.backgroundColor = 'transparent';
        contactBtn.querySelector('button').style.color = '#FF4242';
    })
}