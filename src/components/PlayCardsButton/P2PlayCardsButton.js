const P2PlayCardsButton = (props) => {

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

    const commonCardsCombined = props.p2Tally.cCardValue.map((card, idx) => {
        return (
            card.value
        )
    })

    if (props.p1Turn.isP1Turn === false && props.p2Tally.pCardValue == tallyEquals().reduce((a, b) => a + b, 0)) {
        return (
            <button

            >Play Card</button>
        )
    } else {
        return (
            <p></p>
        )
    }
}

export default P2PlayCardsButton