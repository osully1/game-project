import { drawCardsP1 } from '../../services/card-api';
import { drawCardsP2 } from '../../services/card-api';
import { drawCommonCards } from '../../services/card-api';

const P2PlayCardsButton = (props) => {

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

    async function newGameDeal() {
        const p1Data = await drawCardsP1(props.deckData.deck_id)
        const p2Data = await drawCardsP2(props.deckData.deck_id)
        const commonData = await drawCommonCards(props.deckData.deck_id)
        props.setPlayer1Hand({deck_id: p1Data.deck_id, cards: p1Data.cards})
        props.setPlayer2Hand({deck_id: p2Data.deck_id, cards: p2Data.cards})
        props.setCommonCards({deck_id: commonData.deck_id, cards: commonData.cards})
        props.setDeckData((prevState) => ({
            ...prevState,
            remaining: 30
        }))
    }

    const setScores = () => {

        let p1Diamonds = []
        let p2Diamonds = []
        props.p1Pile.map((card, idx) => {
            if (card.suit === "DIAMONDS") {
                p1Diamonds.push(card)
            }
        })
        props.p2Pile.map((card, idx) => {
            if (card.suit === "DIAMONDS") {
                p2Diamonds.push(card)
            }
        })

        let p1Sevens = []
        let p2Sevens = []
        props.p1Pile.map((card, idx) => {
            if (card.value === "7") {
                p1Sevens.push(card)
            }
        })
        props.p2Pile.map((card, idx) => {
            if (card.value === "7") {
                p2Sevens.push(card)
            }
        })

        function getDiamonds(array, value) {
            let count = 0
            array.forEach((v) => (v === value && count++))
            return count
        }

        const cardLengthPoint = () => {
            if (props.p1Pile.length > props.p2Pile.length) {
                props.setP1Score(prevState => ++prevState)
            } else if (props.p1Pile.length < props.p2Pile.length) {
                props.setP2Score(prevState => ++prevState)
            }
        }

        const cardDiamondsPoint = () => {
            if (p1Diamonds.length > p2Diamonds.length) {
                props.setP1Score(prevState => ++prevState)
            } else if (p1Diamonds.length < p2Diamonds.length) {
                props.setP2Score(prevState => ++prevState)
            }
        }

        const cardSevensPoint = () => {
            if (p1Sevens.length > p2Sevens.length) {
                props.setP1Score(prevState => ++prevState)
            } else if (p1Sevens.length < p2Sevens.length) {
                props.setP2Score(prevState => ++prevState)
            }
        }

        const card7DPoint = () => {
            props.p1Pile.map((card, idx) => {
                if (card.code === "7D") {
                    props.setP1Score(prevState => ++prevState)
                }
            })
            props.p2Pile.map((card, idx) => {
                if (card.code === "7D") {
                    props.setP2Score(prevState => ++prevState)
                }
            })
        }       

        setTimeout(cardLengthPoint(), 500)
        setTimeout(cardDiamondsPoint(), 5500)
        setTimeout(cardSevensPoint(), 10500)
        setTimeout(card7DPoint(), 15500)
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
        if (newPileCards.length > 1) {
            props.setP2Pile(props.p2Pile.concat(newPileCards))
        }
    }

    const checkIfNewRound = () => {
        if (
            props.cardsGoToP1 === false
            && props.deckData.remaining === 0
            && props.player1Hand.cards.length === 0
            && props.player2Hand.cards.length === 1
        ) {
            props.setP2Pile(props.p2Pile.concat(props.commonCards.cards))
            setScores()
        } else if (
            props.cardsGoToP1 === true
            && props.deckData.remaining === 0
            && props.player1Hand.cards.length === 0
            && props.player2Hand.cards.length === 1
        ) {
            props.setP1Pile(props.p1Pile.concat(props.commonCards.cards))
            setScores()
        }
    }

    const playButtonFunction = () => {

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

        if (props.p1Turn === false) {
            props.setP1Turn(true)
        } else if (props.p1Turn === true) {
            props.setP1Turn(false)
        }

        if (
            props.player1Hand.cards.length === 0
            && props.player2Hand.cards.length === 1
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

    const setStateWithCallback = (newState, callback) => {
        props.setCardsGoToP1(newState)
        if (callback) props.myCallbackList.current.push(callback)
    }
    const theCallback = () => {
        playButtonFunction()
        checkIfNewRound()
    }

    if (props.p1Turn === false && props.p2Tally.pCardValue.value == tallyEquals().reduce((a, b) => a + b, 0)) {
        return (
            <button
                style={{
                    fontSize: '0.8em'
                }}
                onClick={() => {
                    props.setP1Turn(true)
                    if (props.cardsGoToP1 === false) {
                        playButtonFunction()
                        checkIfNewRound()
                    } else {
                        props.setCardsGoToP1(false)
                    }
                    // setStateWithCallback(false, theCallback())
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