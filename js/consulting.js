import { desktopCardExpand, fadeCards, unfadeCards, mouseEnterEVNT, mouseLeaveEVNT, mobileCardExpand, scrollListener, closeMobileCard } from './animations/consultingCardExpand';

export default function consultingInit() {

    //first determine screen size
    var wwidth = window.matchMedia('(max-width: 1024px)');

    //first find each card

    var cards = document.querySelectorAll('.consultingCard');

    //HOLDS EXPANDED STATE
    //DETERMINES WHETHER A CARD IS EXPANDED OR NOT
    // create a state object - this holds the active card (-1 for none) and the card object
    var cardState = {
        activeCard: -1,
        cardArr: [...cards]
    }
    //then add a property for it's index for tracking
    //then add a method on a property for the animation itself;
    cards.forEach((card, index) => {
        card.index = index;

        //determines mobile or not mobile
        wwidth.matches ? card.expandAni = null :
        card.expandAni = desktopCardExpand(card);
    })

    //add a listener to close the mobile card if it's clicked
    document.querySelector('.mobileCardOverlay').addEventListener('click', () => {
        closeMobileCard();
    })

    //now add all event listeners for the cards specifically
    cards.forEach(card => {

        //get an array of all the other cards to be able to fade them
        var otherCards = cardState.cardArr.filter(otherCards => otherCards.index != card.index);

        //first raise the image up a bit and make the 'read more' extend more when hovered
        //scrolltrigger if mobile
        wwidth.matches ? 
        //MOBILE
        scrollListener(card) 
        :
        //DESKTOP 
        (
            card.addEventListener('mouseenter', () => mouseEnterEVNT(card, card.index == cardState.activeCard)),
            card.addEventListener('mouseleave', () => mouseLeaveEVNT(card, card.index == cardState.activeCard))
        )
        //now we need the actual click events
        card.addEventListener('click', () => {
            //if mobile just open the card + overlay
            if (wwidth.matches) {
                mobileCardExpand(card)
                return;
            }
            //else if no mobile
            //no active card selected
            if (cardState.activeCard == -1) {
                //open the card
                card.expandAni.play();
                //unfade yourself if faded
                unfadeCards(card);
                //fade the other cards
                fadeCards(otherCards);
                //update the acctive card
                cardState.activeCard = card.index;
                //clicking on the already open card
            } else if (cardState.activeCard == card.index) {
                //close the current card click
                card.expandAni.reverse();
                //unfade all cards
                unfadeCards(cardState.cardArr);
                //update state to set active card to none
                cardState.activeCard = -1;
                //clicking on a diff card while another one is open
            } else if (cardState.activeCard != card.index) {
                //close the current open card first
                //unfade and collapse all other cards
                cardState.cardArr[cardState.activeCard].expandAni.reverse();
                mouseLeaveEVNT(cardState.cardArr[cardState.activeCard]);
                fadeCards(otherCards);
                //now open the clicked card and unfade
                unfadeCards(card);
                card.expandAni.play();
                //now update the active card
                cardState.activeCard = card.index;
            }
        })
    })
}