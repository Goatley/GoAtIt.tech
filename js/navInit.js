export default function navInit() {
    var contactBtn = document.querySelector('#ContactBtn');

    contactBtn.addEventListener('mouseenter', () => {
        contactBtn.style.transform = 'scale(1.1)';
    });

    contactBtn.addEventListener('mouseleave', () => {
        contactBtn.style.transform = 'scale(1)';
    })
}