import { drawCardsP1 } from '../../services/card-api';
import { drawCardsP2 } from '../../services/card-api';

const P2PlayCardsButton = (props) => {

    async function newDeal1() {
    const p1Data = await drawCardsP1(props.deckData.deck_id)
    props.setPlayer1Hand({deck_id: p1Data.deck_id, cards: p1Data.cards})
    }

    async function newDeal2() {
    const p2Data = await drawCardsP2(props.deckData.deck_id)
    props.setPlayer2Hand({deck_id: p2Data.deck_id, cards: p2Data.cards})
    }

    const tallyEquals = () => {
        if (props.p2Tally.cCardValue.length) {
            return(
                props.p2Tally.cCardValue.map((cCard, idx) => {
                    if (cCard.value === 'KING') {
                        cCard.value = cCard.value.replace('KING', '10')
                    } else if (cCard.value === 'JACK') {
                        cCard.value = cCard.value.replace('JACK', '9')
                    } else if (cCard.value === 'QUEEN') {
                        cCard.value = cCard.value.replace('QUEEN', '8')
                    } else if (cCard.value === 'ACE') {
                        cCard.value = cCard.value.replace('ACE', '1')
                    } 
                    return (parseInt(cCard.value))
                })
            )
        } else {
            return [0]
        }
    }

    function handleNewPileData() {
        const newPileCards = props.p2Tally.cCardValue.map((card, idx) => {
                return(card)
            }).concat(props.p2Tally.pCardValue)
        props.setP2Pile(props.p2Pile.concat(newPileCards))
    }

    const playButtonFunction = () => {
        props.setCardsGoToP1(false)

        handleNewPileData()

        const newHand = []
        props.player2Hand.cards.forEach((card, idx) => {
            if (card.code !== props.p2Tally.pCardValue.code) {
                newHand.push(card)
            }
        })
        props.setPlayer2Hand((prevState) => ({
            ...prevState,
            cards: newHand
        }))

        const commonCardArray = []
        const commonTallyArray = props.p2Tally.cCardValue.map((card, idx) => {
            return card.code
        })
        props.commonCards.cards.map((card, idx) => {
            if(commonTallyArray.indexOf(card.code) === -1) {
                commonCardArray.push(card)
            }
        })
        props.setCommonCards((prevState) => ({
            ...prevState,
            cards: commonCardArray
        }))

        props.setP2Tally({pCardValue: {}, cCardValue: []})

        props.setP1Turn(true)

        if (props.player1Hand.cards.length === 0 && props.player2Hand.cards.length === 1) {
            setTimeout(() => {
                newDeal1()   
            }, 800)

            setTimeout(() => {
                newDeal2()   
            }, 1600)
        }
    }

    if (props.p1Turn === false && props.p2Tally.pCardValue.value == tallyEquals().reduce((a, b) => a + b, 0)) {
        return (
            <button
                style={{
                    fontSize: '0.8em'
                }}
                onClick={() => {
                    playButtonFunction()
                }}
            >Play Card</button>
        )
    } else {
        return (
            <p></p>
        )
    }
}

export default P2PlayCardsButton