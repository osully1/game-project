// import { drawCardsP1 } from '../../services/card-api';
// import { drawCardsP2 } from '../../services/card-api';

// const NewDealButton = (props) => {

//     async function newDeal() {
//         const p1Data = await drawCardsP1(props.deckData.deck_id)
//         const p2Data = await drawCardsP2(props.deckData.deck_id)
//         props.setPlayer1Hand({deck_id: p1Data.deck_id, cards: p1Data.cards})
//         props.setPlayer2Hand({deck_id: p2Data.deck_id, cards: p2Data.cards})
//         console.log(p1Data)
//     }
//         return (
//             <button
//                 onClick={() => {newDeal()}}
//             >
//             </button>
//         )
// }

// export default NewDealButton