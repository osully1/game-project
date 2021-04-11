const P2DiscardButton = (props) => {
    if (props.p2Tally.pCardValue) {
        return (
            <button
                style={{
                    fontSize: '0.8em'
                }}
                onClick={() => {
                    const newHand = []
                    const newCommonCards = props.commonCards.cards
                    props.player2Hand.cards.map((card, idx) => {
                        if (card.code !== props.p2Tally.pCardValue.code) {
                            newHand.push(card)
                        } else {
                            newCommonCards.push(card)
                        }
                    })
                    props.setPlayer2Hand((prevState) => ({
                        ...prevState,
                        cards: newHand
                    }))
                    props.setCommonCards((prevState) => ({
                        ...prevState,
                        cards: newCommonCards
                    }))
                    props.setP1Turn(true)
                }}
            >Discard</button>
        )
    }
}

export default P2DiscardButton