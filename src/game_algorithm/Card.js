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
        // A JOKER CARD
        if ( arguments.length === 0) {
            this._type = TYPES.JOKER;
        } else {
            this._type = type;
            this._number = number;
        }

    }

    getType() {
        return this._type;
    }

    getNumber() {
        return this._number;
    }

    equals(other) {
        return (other instanceof Card
            && 'getType' in other
            && 'getNumber' in other) ?
            (other.getType() === this.getType() && other.getNumber() === this.getNumber()) : false;
    }

    clone() {
        return (this.getType() === TYPES.JOKER) ? new Card() : new Card(this.getType(), this.getNumber());
    }
}