import { gsap } from "gsap";

//import our animations
//each function returns a gsap timeline object that will be associated with the actively selected item

export default function includeInit() {

    //stores the array value of the current include animation
    var currentInclude = 0;

    //define the arrays of buttons
    var btns = document.querySelectorAll('.includeBtn');
    //array of SVG elements
    var includeArr = document.querySelectorAll('.includeItem');
    //array of animation objects (gsap timeline objects)
    // var animations


    //assigns event listeners to handle current selection and animation transformations
    for(var i = 0; i < btns.length; i++) {
        //set up clicking to manage flipping of the animations
        btnClick(i);
    }

    //basically controls state of the currently viewable include animation
    function updateInclude(newInclude) {
        currentInclude = newInclude;
    }

    //assign event listeners to morph the svg and update the current SVG collection
    function btnClick(i) {
        btns[i].addEventListener('click', () => {

            gsap.to(btns[i], {
                duration: 0.1,
                color: '#FF4242', //red-500
            })
            gsap.to(btns[currentInclude], {
                duration: 0.1,
                color: '#313335' //gray-700
            })

            //if we're moving down the list, swoop down.  if up, swoop up
            //just do nothing if it's already selected
            if(i > currentInclude) {
                //first scroll the current image out
                gsap.to(includeArr[currentInclude], {
                    duration: 0.5,
                    y: '-150%',
                    opacity: 0,
                    ease: "elastic.out(0.5, 0.75)",
                })

                //now bring the new image and description in
                gsap.fromTo(includeArr[i], {
                        y: '150%',
                        opacity: 0,
                    }, 
                    {
                        duration: 0.5,
                        y: '0%',
                        opacity: 1,
                        ease: "elastic.out(0.5, 0.75)"
                    }
                )
            } else if (i < currentInclude) {
                //first scroll the SVG/descriptions to be shown
                gsap.to(includeArr[currentInclude], {
                    duration: 0.5,
                    y: '150%',
                    opacity: 0,
                    ease: "elastic.out(0.5, 0.75)",
                })
                gsap.fromTo(includeArr[i], {
                        y: '-150%',
                        opacity: 0,
                    },
                    {
                        duration: 0.5,
                        y: '0%',
                        opacity: 1,
                        ease: "elastic.out(0.5, 0.75)",
                    }
                )
            }

            //now start playing the current animation
            //animations[i].play()


            //update the currently selected animation state
            updateInclude(i);
        });

        
        //hover/mouseover event
        btns[i].addEventListener('mouseenter', () => {
            gsap.to(btns[i], {
                duration: 0.25,
                scale: 1.1,
            })
        })

        //hover/mouseleave event
        btns[i].addEventListener('mouseleave', () => {
            gsap.to(btns[i], {
                duration: 0.25,
                scale: 1
            })
        })
    }
};
