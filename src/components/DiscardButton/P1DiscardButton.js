const P1DiscardButton = (props) => {
    if (props.p1Tally.pCardValue) {
        return (
            <button
                style={{
                    fontSize: '0.8em'
                }}
                onClick={() => {
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
                    props.setP1Turn(false)
                }}
            >Discard</button>
        )
    }
}

export default P1DiscardButton