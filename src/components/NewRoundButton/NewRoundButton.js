const NewRoundButton = (props) => {
    if (
        props.deckData.remaining === 0
        && props.player1Hand.cards.length === 0
        && props.player2Hand.cards.length === 0
    ) {
        return (
            <button onClick={() => props.submitScoreData()}>
                Next Round
            </button>
        )
    } else {
        return(<p></p>)
    }
}

export default NewRoundButton