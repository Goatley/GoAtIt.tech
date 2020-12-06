/*
    function that allows elements to "fade in" when you scroll over them

    @params hiddenClassName and shownClassName are both the STRING classnames on objects that determine which start off as hidden
    and what the class that has the animations is


*/

export default function appearOnScroll(hiddenClassName, shownClassName) {
    var elements;
    var windowHeight;
    

    function init() {
        elements = document.querySelectorAll(`.${hiddenClassName}`);
        windowHeight = window.innerHeight;
    }

    


    function checkPosition() {
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            var positionFromTop = elements[i].getBoundingClientRect().top;

            if (positionFromTop - windowHeight + 200 <= 0) {
                element.classList.add(`${shownClassName}`);
                element.classList.remove(`${hiddenClassName}`);
            }
        }
    }

    window.addEventListener('scroll', checkPosition);
    window.addEventListener('resize', init);

    
    init();
    checkPosition();
}