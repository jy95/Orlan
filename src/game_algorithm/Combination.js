import { TYPES, NUMBERS } from './Card';
const MIN_CARD_AMOUNT = 3;

export default class Combination {

    constructor() {
        this._cardsPlayed = [];
        this._colorPlayed = new Set();
        this._jokerPositions = [];
    }

    // the correct order of card for successive combination
    static correct_order() {
        return [ NUMBERS.ACE, 2, 3, 4, 5, 6, 7, 8, 9, 10, NUMBERS.JACK, NUMBERS.QUEEN, NUMBERS.JACK, NUMBERS.ACE ];
    }

    // returns all the stored card(s)
    listCards() {
        return this._cardsPlayed;
    }

    // add a card at the end of the array
    set addCard(card) {
        this._cardsPlayed.push(card);
        switch (card.getType()) {

            case TYPES.JOKER:
                this._jokerPositions.push(this._cardsPlayed.length - 1);
                break;

            default:
                this._colorPlayed.add(card.getType());
                break;
        }
    }

    // match criteria(s)
    verification() {
        return this.requiredCardAmount()
            && !this.successiveJokers()
            && ( this.logicalSequenceCheck() || this.sameValueCardCheck() );
    }

    requiredCardAmount() {
        return this._cardsPlayed.length >= MIN_CARD_AMOUNT;
    }

    // no two successive JOKER
    successiveJokers() {
        return this._jokerPositions.some(
            (position, index, array) => array.includes(position + 1, index + 1)
        )
    }

    // Example : 5 - 5 - 5 is valid if each 5 is a unique TYPE to each other
    sameValueCardCheck() {
        // get the first card that isn't a joker
        let myCard = this._cardsPlayed.find( (card) => card.getType() !== TYPES.JOKER );
        // count occurrence of this card
        let count = this._cardsPlayed
            .reduce(
                (acc, card) =>
                    ( card.getType() !== TYPES.JOKER && card.getNumber() === myCard.getNumber() ) ? acc + 1 : acc
                , 0);
        return this._colorPlayed.size === count;
    }

    sameColor() {
        return this._colorPlayed.size === 1;
    }

    isOrdered() {
        // first, find the first index of the sub array in master array
        let first_element = this._cardsPlayed.find( (card) => card.getType() !== TYPES.JOKER );
        let correct_order = Combination.correct_order();
        let first_index = correct_order.findIndex( (number) => number === first_element.getValue() );
        return this._cardsPlayed
            .every(
                (card, index) =>
                    (card.getType() !== TYPES.JOKER)
                        ? card.getValue() === correct_order[index + first_index]
                        : true
            );
    }

    logicalSequenceCheck() {
        return this.sameColor() && this.isOrdered();
    }

    getValue() {
        // not a valid combination
        if (! this.verification()){
            return 0;
        } else if ( this.sameValueCardCheck() ) {
            let myCard = this._cardsPlayed.find( (card) => card.getType() !== TYPES.JOKER );

            return ( myCard.getNumber() >= 10 || myCard.getNumber() === NUMBERS.ACE )
                ? this._cardsPlayed.length * 10
                : this._cardsPlayed.length * myCard.getNumber();
        } else {

            let first_element = this._cardsPlayed.find( (card) => card.getType() !== TYPES.JOKER );
            let correct_order = Combination.correct_order();
            let first_index = correct_order.findIndex( (number) => number === first_element.getValue() );
            // compute value of successive cards
            let value = 0;
            for ( let index = 0 ; index < this._cardsPlayed.length ; index++ ) {
                let number = correct_order[first_index + index];
                // multiple case depending of the number
                if ( number >= 10 || ( number === NUMBERS.ACE && index + first_index !== 0 ) ) {
                    value += 10;
                } else {
                    value += number;
                }
            }
            // in some case, we must find the value of the joker before the first not joker element
            if ( this._cardsPlayed[0] !== first_element ) {
                let number = correct_order[first_index - 1];
                if ( number >= 10 ) {
                    value += 10;
                } else {
                    value += number;
                }
            }
            return value;
        }
    }
}