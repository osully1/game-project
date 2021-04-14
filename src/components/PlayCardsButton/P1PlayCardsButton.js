import { drawCardsP1 } from '../../services/card-api';
import { drawCardsP2 } from '../../services/card-api';
import { drawCommonCards } from '../../services/card-api';

const P1PlayCardsButton = (props) => {

    async function newDeal1() {
        const p1Data = await drawCardsP1(props.deckData.deck_id)
        props.setPlayer1Hand({deck_id: p1Data.deck_id, cards: p1Data.cards})
    }

    async function newDeal2() {
        const p2Data = await drawCardsP2(props.deckData.deck_id)
        props.setPlayer2Hand({deck_id: p2Data.deck_id, cards: p2Data.cards})
        props.setDeckData((prevState) => ({
            ...prevState,
            remaining: props.deckData.remaining -= 6
        }))
    }

    const tallyEquals = () => {
        if (props.p1Tally.cCardValue.length) {
            return(
                props.p1Tally.cCardValue.map((cCard, idx) => {
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
        const newPileCards = props.p1Tally.cCardValue.map((card, idx) => {
                return(card)
            }).concat(props.p1Tally.pCardValue)
        props.setP1Pile(props.p1Pile.concat(newPileCards))
    }

    const playButtonFunction = () => {
        props.setCardsGoToP1(true)

        handleNewPileData()

        const newHand = []
        props.player1Hand.cards.forEach((card, idx) => {
            if (card.code !== props.p1Tally.pCardValue.code) {
                newHand.push(card)
            }
        })
        props.setPlayer1Hand((prevState) => ({
            ...prevState,
            cards: newHand
        }))

        const commonCardArray = []
        const commonTallyArray = props.p1Tally.cCardValue.map((card, idx) => {
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

        props.setP1Tally({pCardValue: {}, cCardValue: []})

        props.setP1Turn(false)

        if (
            props.player1Hand.cards.length === 1
            && props.player2Hand.cards.length === 0
            && props.deckData.remaining > 0
        ) {
            setTimeout(() => {
                newDeal1()   
            }, 800)

            setTimeout(() => {
                newDeal2()   
            }, 1600)
        }
    }

    if (props.p1Turn === true && props.p1Tally.pCardValue.value == tallyEquals().reduce((a, b) => a + b, 0)) {
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

export default P1PlayCardsButton