import Player from './Player';
import Card, {TYPES, NUMBERS} from './Card'

describe('Player tests : ', function () {

    let cards = [
        // a good combi with value 30
        new Card(TYPES.HEARTS, NUMBERS.JACK),
        new Card(TYPES.HEARTS, NUMBERS.QUEEN),
        new Card(TYPES.HEARTS, NUMBERS.KING),
        // a wrong combi with value 0
        new Card(TYPES.DIAMONDS, NUMBERS.JACK),
        new Card(TYPES.DIAMONDS, NUMBERS.KING),
        new Card(TYPES.DIAMONDS, NUMBERS.KING),
        // a good combi with value 24
        new Card(TYPES.DIAMONDS, 7),
        new Card(TYPES.DIAMONDS, 8),
        new Card(TYPES.DIAMONDS, 9)
    ];

    // a copy for test
    let copy = [];
    cards.forEach( (card) => copy.push(card.clone()) );

    it("Not enough combination value", () => {
        let player = new Player();
        player.initGame();
        player.setCards = copy;
        expect(player.removeTempCombination(-1)).toBe(false);
        // switch place for KING DIAMONDS
        expect(player.moveCard(4, -1)).toBe(false);
        expect(player.moveCard(4,5)).toBe(true);
        // set up combi
        for (let combIndex = 0; combIndex < 2; combIndex++) {
            player.createTempCombination();
            for (let cardIndex = 0; cardIndex < 3; cardIndex++) {
                player.addCardToTempCombination(cardIndex + 3*combIndex, combIndex);
            }
        }
        // before validate combinations
        expect(player.validCombinations()).toHaveLength(0);
        expect(player.tempCombinations()).not.toHaveLength(0);
        // validate
        expect(player.validateCombinations()).toBe(false);
    });

    it("Enough combination value with complex tests", () => {
        let player = new Player();
        player.initGame();
        player.setCards = cards;
        expect(player.listCards()).toEqual(cards);
        // set up combi
        for (let combIndex = 0; combIndex < 3; combIndex++) {
            player.createTempCombination();
            for (let i = 0; i < 3; i++) {
                player.addCardToTempCombination(0, combIndex);
            }
        }
        // validate
        expect(player.validateCombinations()).toBe(true);
        expect(player.removeTempCombination(0)).toBe(true);
    });

});