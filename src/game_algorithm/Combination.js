import {TYPES, NUMBERS} from './Card';

export default class Combination {

    constructor() {
        this._cardsPlayed = [];
        this._colorPlayed = new Set();
        this._jokerPositions = [];
    }

    // minimal amount of card required for combi
    static MIN_CARD_AMOUNT = 3;

    // the correct order of card for successive combination
    static correct_order() {
        return [NUMBERS.ACE, 2, 3, 4, 5, 6, 7, 8, 9, 10, NUMBERS.JACK, NUMBERS.QUEEN, NUMBERS.KING, NUMBERS.ACE];
    }

    // returns all the stored card(s)
    listCards() {
        return this._cardsPlayed;
    }

    // clone method
    clone() {
        let clone = new Combination();
        for (let card of this.listCards()) {
            clone.addCard(card);
        }
        return clone;
    }

    // add a card at the end of the array
    addCard(card) {
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

    moveCard(index_from, index_to) {
        let check = 0 <=
            index_from &&
            index_from < this._cardsPlayed.length &&
            0 <= index_to &&
            index_to < this._cardsPlayed.length;
        if (check) {
            let previousCard = this._cardsPlayed[index_from];
            this._cardsPlayed[index_from] = this._cardsPlayed[index_to];
            this._cardsPlayed[index_to] = previousCard;
        }
        return check;
    }

    // match criteria(s)
    verification() {
        return this.requiredCardAmount() && (this.logicalSequenceCheck() || this.sameValueCardCheck());
    }

    requiredCardAmount() {
        return this._cardsPlayed.length >= Combination.MIN_CARD_AMOUNT;
    }

    // no two successive JOKER
    successiveJokers() {
        return this._jokerPositions.some(
            (position, index, array) => array.includes(position + 1, index + 1)
        )
    }

    differentColors() {
        return this._cardsPlayed.length - this._colorPlayed.size - this._jokerPositions.length === 0;
    }

    sameColor() {
        return this._colorPlayed.size === 1;
    }

    // Example : 5 - 5 - 5 is valid if each 5 is a unique TYPE to each other
    sameValueCardCheck() {
        // get the first card that isn't a joker
        let myCard = this._cardsPlayed.find((card) => card.getType() !== TYPES.JOKER);
        let result = this._cardsPlayed.reduce(
            (acc, card) => (acc.valid) ? {
                valid: card.getType() === TYPES.JOKER || card.getNumber() === acc.number,
                number: acc.number
            } : acc, {valid: true, number: myCard.getNumber()}
        );
        return this.differentColors() && !this.successiveJokers() && result.valid
    }

    isOrdered() {
        // first, find the first index of the sub array in master array
        let first_element = this._cardsPlayed.find((card) => card.getType() !== TYPES.JOKER);
        let correct_order = Combination.correct_order();
        let first_index = correct_order.findIndex((number) => number === first_element.getNumber());
        // shift to handle the algorithm
        let shift = (this._cardsPlayed[0].getType() === TYPES.JOKER) ? -1 : 0;
        return this._cardsPlayed
            .every(
                (card, index) =>
                    (card.getType() !== TYPES.JOKER)
                        ? card.getNumber() === correct_order[index + first_index + shift]
                        : true
            );
    }

    logicalSequenceCheck() {
        return !this.successiveJokers() && this.sameColor() && this.isOrdered();
    }

    getValue() {
        // not a valid combination
        if (!this.verification()) {
            return 0;
        } else if (this.sameValueCardCheck()) {
            let myCard = this._cardsPlayed.find((card) => card.getType() !== TYPES.JOKER);

            return (myCard.getNumber() >= 10 || myCard.getNumber() === NUMBERS.ACE)
                ? this._cardsPlayed.length * 10
                : this._cardsPlayed.length * myCard.getNumber();
        } else {

            let first_element = this._cardsPlayed.find((card) => card.getType() !== TYPES.JOKER);
            let correct_order = Combination.correct_order();
            let first_index = correct_order.findIndex((number) => number === first_element.getNumber());
            // shift to handle the algorithm
            let shift = (this._cardsPlayed[0].getType() === TYPES.JOKER) ? -1 : 0;
            // compute value of successive cards
            return this._cardsPlayed.reduce(
                (value, elem, index) => {
                    let number = correct_order[first_index + index + shift];
                    return ( number >= 10 || (number === NUMBERS.ACE && index + first_index !== 0) )
                        ? value + 10
                        : value + correct_order[first_index + index + shift]
                }, 0);
        }
    }
}