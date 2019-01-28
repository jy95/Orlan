import Card , {TYPES, NUMBERS} from './Card'

describe("Card ", () => {

    test("Create a basic card", () => {
       let myCard = new Card(TYPES.DIAMONDS, NUMBERS.ACE);
       expect(myCard.getNumber()).toEqual(NUMBERS.ACE);
       expect(myCard.getType()).toEqual(TYPES.DIAMONDS);
    });

    test("Create a JOKER card", () => {
        let myCard = new Card();
        expect(myCard.getType()).toEqual(TYPES.JOKER);
    });

    test("equals", () => {
        let myCard = new Card();
        let myCard2 = new Card();
        expect(myCard.equals(myCard2)).toBe(true);
    });

});