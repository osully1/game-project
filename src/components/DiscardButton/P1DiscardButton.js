import { drawCardsP1 } from '../../services/card-api';
import { drawCardsP2 } from '../../services/card-api';

const P1DiscardButton = (props) => {

    async function newDeal1() {
    const p1Data = await drawCardsP1(props.deckData.deck_id)
    props.setPlayer1Hand({deck_id: p1Data.deck_id, cards: p1Data.cards})
    }

    async function newDeal2() {
    const p2Data = await drawCardsP2(props.deckData.deck_id)
    props.setPlayer2Hand({deck_id: p2Data.deck_id, cards: p2Data.cards})
    }

    const discardFunction = () => {
        const newHand = []
        const newCommonCards = props.commonCards.cards
        props.player1Hand.cards.map((card, idx) => {
            if (card.code !== props.p1Tally.pCardValue.code) {
                newHand.push(card)
            } else {
                newCommonCards.push(card)
            }
        })
        props.setPlayer1Hand((prevState) => ({
            ...prevState,
            cards: newHand
        }))
        props.setCommonCards((prevState) => ({
            ...prevState,
            cards: newCommonCards
        }))

        props.setP1Tally({pCardValue: {}, cCardValue: []})

        props.setP1Turn(false)

        if (props.player1Hand.cards.length === 1 && props.player2Hand.cards.length === 0) {
            setTimeout(() => {
                newDeal1()   
            }, 800)

            setTimeout(() => {
                newDeal2()   
            }, 1600)
        }
    }

    if (props.p1Tally.pCardValue && props.p1Tally.cCardValue.length == 0) {
        return (
            <button
                style={{
                    fontSize: '0.8em'
                }}
                onClick={() => {
                    discardFunction()
                }}
            >Discard</button>
        )
    } else {
        return <p></p>
    }
}

export default P1DiscardButton