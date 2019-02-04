import Combination from './Combination';

export default class Player {
    static MIN_REQUIRED_VALUE = 51;

    constructor() {
        this._cards = [];
        this._tempCombinations = [];
        this._checkedCombinations = [];
        this._hasRequiredAmount = false;
    }

    // fct to be called at each start
    initGame() {
        this._cards = [];
        this._tempCombinations = [];
        this._checkedCombinations = [];
        this._hasRequiredAmount = false;
    }

    set setCards(cards) {
        this._cards = cards;
    }

    listCards() {
        return this._cards;
    }

    validCombinations() {
        return this._checkedCombinations;
    }

    tempCombinations() {
        return this._tempCombinations;
    }

    moveCard(index_from, index_to) {
        let check = 0 <= index_from &&
            index_from < this._cards.length &&
            0 <= index_to &&
            index_to < this._cards.length;
        if (check) {
            let previousCard = this._cards[index_from];
            this._cards[index_from] = this._cards[index_to];
            this._cards[index_to] = previousCard;
        }
        return check;
    }

    createTempCombination() {
        this._tempCombinations.push(new Combination());
    }

    removeTempCombination(index) {
        let check = 0 <= index && index < this._tempCombinations.length;
        if (check) {
            let combi = this._tempCombinations[index];
            // return the cards to hand
            for (let card in combi.listCards()) {
                this._cards.push(card);
            }
            this._tempCombinations.splice(index, 1);
        }
        return check;
    }


    addCardToTempCombination(cardIndex, combIndex) {
        let check = 0 <= cardIndex &&
            cardIndex < this._cards.length &&
            0 <= combIndex &&
            combIndex < this._tempCombinations.length;
        if (check) {
            let cardToBeAdded = this._cards[cardIndex];
            let combination = this._tempCombinations[combIndex];
            combination.addCard(cardToBeAdded);
            this._cards.splice(cardIndex, 1);
        }
        return check;
    }

    validateCombinations() {
        // partition function
        function partitionFct(collection, predicate) {
            return collection.reduce(
                (result, value) => {
                    result[predicate(value) ? 0 : 1].push(value);
                    return result;
                }, [[], []]
            )
        }

        let partition = partitionFct(this._tempCombinations, (combi) => combi.verification());
        let count = partition[0].reduce((sum, combi) => sum + combi.getValue(), 0);
        let check = (this._hasRequiredAmount || count >= Player.MIN_REQUIRED_VALUE);

        // checks the player has the right to play combinations without having TRUE
        switch (this._hasRequiredAmount) {

            case true:
                for (let combi of partition[0]) {
                    this._checkedCombinations.push(combi);
                }
                break;

            default:
                if (count >= Player.MIN_REQUIRED_VALUE) {
                    this._hasRequiredAmount = true;
                    // add the right combinations inside the right variable
                    this._checkedCombinations = partition[0];
                } else {
                    // reinject all the cards used in right combinations inside hand
                    for (let combination of partition[0]) {
                        for (let card of combination.listCards()) {
                            this._cards.push(card);
                        }
                    }
                }
        }

        // reinject all the cards used in wrong combinations inside hand
        for (let combination of partition[1]) {
            for (let card of combination.listCards()) {
                this._cards.push(card);
            }
        }

        // clear temp
        return check;
    }
}