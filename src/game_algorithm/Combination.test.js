import Combination from './Combination'
import Card , {TYPES, NUMBERS} from './Card'

describe('Hand Combinations tests : ', function () {

    describe('Hand Combination : Ace JOKER KING ACE', function () {

        let combinaison1 = new Combination();

        combinaison1.addCard(new Card(TYPES.DIAMONDS, NUMBERS.ACE));
        combinaison1.addCard(new Card());
        combinaison1.addCard(new Card(TYPES.DIAMONDS, NUMBERS.KING));
        combinaison1.addCard(new Card(TYPES.DIAMONDS, NUMBERS.ACE));

        test("Test n°1 : requiredCardAmount() test", function () {
            expect(combinaison1.requiredCardAmount()).toBe(true);
        });

        test("Test n°2 : logicalSequenceCheck() test", function () {
            expect(combinaison1.logicalSequenceCheck()).toBe(false);
        });

        test("Test n°3 : sameValueCardCheck() test", function () {
            expect(combinaison1.sameValueCardCheck()).toBe(false);
        });

        test("Test n°4 : verification() test", function () {
            expect(combinaison1.verification()).toBe(false);
        });

        test("Test n°5 : getValue() test", function () {
            expect(combinaison1.getValue()).toBe(0);
        });

        test("Test n°6 : moveCard test", function () {
           expect(combinaison1.moveCard(0,1)).toBe(true);
           expect(combinaison1.listCards()[0].getType()).toBe(TYPES.JOKER);
           expect(combinaison1.listCards()[1].getNumber()).toBe(NUMBERS.ACE);
           expect(combinaison1.moveCard(-1,-1)).toBe(false);
        });

        test("Test n°7 : Clone", function () {
           expect(combinaison1.clone().listCards()).toEqual(combinaison1.listCards())
        });

    });

    describe("Hand Combination : Full ACE", function () {

        let combinaison2 = new Combination();

        combinaison2.addCard(new Card(TYPES.CLUBS, NUMBERS.ACE));
        combinaison2.addCard(new Card(TYPES.DIAMONDS, NUMBERS.ACE));
        combinaison2.addCard(new Card(TYPES.HEARTS, NUMBERS.ACE));
        combinaison2.addCard(new Card(TYPES.SPADES, NUMBERS.ACE));

        test("Test n°1 : requiredCardAmount() test", function () {
            expect(combinaison2.requiredCardAmount()).toBe(true);
        });

        test("Test n°2 : logicalSequenceCheck() test", function () {
            expect(combinaison2.logicalSequenceCheck()).toBe(false);
        });

        test("Test n°3 : sameValueCardCheck() test", function () {
            expect(combinaison2.sameValueCardCheck()).toBe(true);
        });

        test("Test n°4 : verification() test", function () {
            expect(combinaison2.verification()).toBe(true);
        });

        test("Test n°5 : getValue() test", function () {
            expect(combinaison2.getValue()).toBe(40);
        });

    });

    describe("Hand Combination : JOKER QUEEN KING ACE", function () {

        let combinaison3 = new Combination();

        combinaison3.addCard(new Card());
        combinaison3.addCard(new Card(TYPES.DIAMONDS, NUMBERS.QUEEN));
        combinaison3.addCard(new Card(TYPES.DIAMONDS, NUMBERS.KING));
        combinaison3.addCard(new Card(TYPES.DIAMONDS, NUMBERS.ACE));

        test("Test n°1 : requiredCardAmount() test", function () {
            expect(combinaison3.requiredCardAmount()).toBe(true);
        });

        test("Test n°2 : logicalSequenceCheck() test", function () {
            expect(combinaison3.logicalSequenceCheck()).toBe(true);
        });

        test("Test n°3 : sameValueCardCheck() test", function () {
            expect(combinaison3.sameValueCardCheck()).toBe(false);
        });

        test("Test n°4 : verification() test", function () {
            expect(combinaison3.verification()).toBe(true);
        });

        test("Test n°5 : getValue() test", function () {
            expect(combinaison3.getValue()).toBe(40);
        });

    });

    describe("Hand Combination : Full 2 Card (one Joker)", function () {

        let combinaison4 = new Combination();

        combinaison4.addCard(new Card());
        combinaison4.addCard(new Card(TYPES.DIAMONDS, 2));
        combinaison4.addCard(new Card(TYPES.CLUBS, 2));
        combinaison4.addCard(new Card(TYPES.SPADES, 2));

        test("Test n°1 : requiredCardAmount() test", function () {
            expect(combinaison4.requiredCardAmount()).toBe(true);
        });

        test("Test n°2 : logicalSequenceCheck() test", function () {
            expect(combinaison4.logicalSequenceCheck()).toBe(false);
        });

        test("Test n°3 : sameValueCardCheck() test", function () {
            expect(combinaison4.sameValueCardCheck()).toBe(true);
        });

        test("Test n°4 : verification() test", function () {
            expect(combinaison4.verification()).toBe(true);
        });

        test("Test n°5 : getValue() test", function () {
            expect(combinaison4.getValue()).toBe(8);
        });

    });

    describe("Hand Combination : Full ACE (two Jokers )", function () {

        let combinaison5 = new Combination();

        combinaison5.addCard(new Card(TYPES.CLUBS, NUMBERS.ACE));
        combinaison5.addCard(new Card());
        combinaison5.addCard(new Card());
        combinaison5.addCard(new Card(TYPES.SPADES, NUMBERS.ACE));

        test("Test n°1 : requiredCardAmount() test", function () {
            expect(combinaison5.requiredCardAmount()).toBe(true);
        });

        test("Test n°2 : logicalSequenceCheck() test", function () {
            expect(combinaison5.logicalSequenceCheck()).toBe(false);
        });

        test("Test n°3 : sameValueCardCheck() test", function () {
            expect(combinaison5.sameValueCardCheck()).toBe(false);
        });

        test("Test n°4 : verification() test", function () {
            expect(combinaison5.verification()).toBe(false);
        });

        test("Test n°5 : getValue() test", function () {
            expect(combinaison5.getValue()).toBe(0);
        });

    });

    describe("Hand Combination : ACE TO ACE", function () {
        let combinaison6 = new Combination();

        for (let i = 1; i < 11; i++) {
            combinaison6.addCard(new Card(TYPES.DIAMONDS, i));
        }

        combinaison6.addCard(new Card(TYPES.DIAMONDS, NUMBERS.JACK));
        combinaison6.addCard(new Card(TYPES.DIAMONDS, NUMBERS.QUEEN));
        combinaison6.addCard(new Card(TYPES.DIAMONDS, NUMBERS.KING));
        combinaison6.addCard(new Card(TYPES.DIAMONDS, NUMBERS.ACE));

        test("Test n°1 : requiredCardAmount() test", function () {
            expect(combinaison6.requiredCardAmount()).toBe(true);
        });

        test("Test n°2 : logicalSequenceCheck() test", function () {
            expect(combinaison6.logicalSequenceCheck()).toBe(true);
        });

        test("Test n°3 : sameValueCardCheck() test", function () {
            expect(combinaison6.sameValueCardCheck()).toBe(false);
        });

        test("Test n°4 : verification() test", function () {
            expect(combinaison6.verification()).toBe(true);
        });

        test("Test n°5 : getValue() test", function () {
            expect(combinaison6.getValue()).toBe(95);
        });

    });

    describe("Hand Combination : ACE TO FOUR (JOKER AS THREE)", function () {
        let combinaison7 = new Combination();

        combinaison7.addCard(new Card(TYPES.DIAMONDS, 1));
        combinaison7.addCard(new Card(TYPES.DIAMONDS, 2));
        combinaison7.addCard(new Card());
        combinaison7.addCard(new Card(TYPES.DIAMONDS, 4));

        test("Test n°1 : requiredCardAmount() test", function () {
            expect(combinaison7.requiredCardAmount()).toBe(true);
        });

        test("Test n°2 : logicalSequenceCheck() test", function () {
            expect(combinaison7.logicalSequenceCheck()).toBe(true);
        });

        test("Test n°3 : sameValueCardCheck() test", function () {
            expect(combinaison7.sameValueCardCheck()).toBe(false);
        });

        test("Test n°4 : verification() test", function () {
            expect(combinaison7.verification()).toBe(true);
        });

        test("Test n°5 : getValue() test", function () {
            expect(combinaison7.getValue()).toBe(10);
        });

    });

    describe("Hand Combination : QUEEN KING JOKER", function () {

        let combinaison8 = new Combination();

        combinaison8.addCard(new Card(TYPES.DIAMONDS, NUMBERS.QUEEN));
        combinaison8.addCard(new Card(TYPES.DIAMONDS, NUMBERS.KING));
        combinaison8.addCard(new Card());

        test("Test n°1 : requiredCardAmount() test", function () {
            expect(combinaison8.requiredCardAmount()).toBe(true);
        });

        test("Test n°2 : logicalSequenceCheck() test", function () {
            expect(combinaison8.logicalSequenceCheck()).toBe(true);
        });

        test("Test n°3 : sameValueCardCheck() test", function () {
            expect(combinaison8.sameValueCardCheck()).toBe(false);
        });

        test("Test n°4 : verification() test", function () {
            expect(combinaison8.verification()).toBe(true);
        });

        test("Test n°5 : getValue() test", function () {
            expect(combinaison8.getValue()).toBe(30);
        });


    });

    describe("Hand Combination : ACE TO FOUR (JOKER AS FOUR)", function () {
        let combinaison9 = new Combination();

        combinaison9.addCard(new Card(TYPES.DIAMONDS, 1));
        combinaison9.addCard(new Card(TYPES.DIAMONDS, 2));
        combinaison9.addCard(new Card(TYPES.DIAMONDS, 3));
        combinaison9.addCard(new Card());

        test("Test n°1 : requiredCardAmount() test", function () {
            expect(combinaison9.requiredCardAmount()).toBe(true);
        });

        test("Test n°2 : logicalSequenceCheck() test", function () {
            expect(combinaison9.logicalSequenceCheck()).toBe(true);
        });

        test("Test n°3 : sameValueCardCheck() test", function () {
            expect(combinaison9.sameValueCardCheck()).toBe(false);
        });

        test("Test n°4 : verification() test", function () {
            expect(combinaison9.verification()).toBe(true);
        });

        test("Test n°5 : getValue() test", function () {
            expect(combinaison9.getValue()).toBe(10);
        });

    });
});