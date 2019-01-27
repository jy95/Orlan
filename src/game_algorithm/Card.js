// Color of the card
export const TYPES = {
    SPADES : 1, // PIQUE
    HEARTS : 2, // COEUR
    DIAMONDS : 3, // CARREAU
    CLUBS : 4, // TREFLE
    JOKER : 5
};

// Card number
export const NUMBERS = {
    ACE : 1,
    JACK : 11,
    QUEEN : 12,
    KING : 13
};

export default class Card {
    constructor(type, number) {
        this._type = type;
        this._number = number;
    }

    getType() {
        return this._type;
    }

    getNumber() {
        return this._number;
    }

    equals(other) {
        return (other.isPrototypeOf(Card)
            && other.hasOwnProperty('type')
            && other.hasOwnProperty('number')) ?
            (other.type === this.getType() && other.number === this.getNumber()) : false;
    }
}