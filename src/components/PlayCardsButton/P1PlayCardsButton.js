import { addToPile1 } from '../../services/card-api';

const P1PlayCardsButton = (props) => {

    // async function playCard() {
    //     const cardsWon = 
    //     const newPile = await addToPile1(props.deckData.deck_id, )
    // }
    // Modify p1Tally to accept codes of player and common cards for above function

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

    const commonCardsCombined = props.p1Tally.cCardValue.map((card, idx) => {
        return (
            card.value
        )
    })

    if (props.p1Turn.isP1Turn === true && props.p1Tally.pCardValue == tallyEquals().reduce((a, b) => a + b, 0)) {
        return (
            <button
                style={{
                    fontSize: '0.8em'
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