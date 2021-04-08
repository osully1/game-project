import { drawCardsP1 } from '../../services/card-api';
import { drawCardsP2 } from '../../services/card-api';
import { drawCommonCards } from '../../services/card-api'

export class Card {
    constructor(code, value, suit, image, idx) {
        this.code = code;
        this.image = image;
        this.value = value;
        this.suit = suit;
        this.idx = idx
    }
}

// export function createCommonCards(commonstate) {
//     return commonstate.map((card, idx) => {
//         new Card (card.code, card.image, card.value, card.suit, idx)
//     })
// }

// export default Card