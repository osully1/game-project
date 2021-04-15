import { useState, useRef, useEffect } from 'react';
import { drawCardsP1 } from '../../services/card-api';
import { drawCardsP2 } from '../../services/card-api';
import { drawCommonCards } from '../../services/card-api';
import { Link } from 'react-router-dom'
import P1Side from '../TableSide/P1Side';
import P2Side from '../TableSide/P2Side';
import PlayArea from '../PlayArea/PlayArea';
import ScoreScreen from '../ScoreScreen/ScoreScreen';
import NewRoundButton from '../NewRoundButton/NewRoundButton';
import GameHistoryButton from '../GameHistoryButton/GameHistoryButton';
import styles from './GameTable.module.css';

const BASE_URL = 'http://localhost:3001/api/scores'

const GameTable = (props) => {

    const [ player1Hand, setPlayer1Hand ] = useState({deck_id: '', cards: []});
    const [ player2Hand, setPlayer2Hand ] = useState({deck_id: '', cards: []});
    const [ commonCards, setCommonCards ] = useState({deck_id: '', cards: []});
    const [ p1Tally, setP1Tally ] = useState({pCardValue: {}, cCardValue: []});
    const [ p2Tally, setP2Tally ] = useState({pCardValue: {}, cCardValue: []});
    const [ p1Pile, setP1Pile ] = useState([]);
    const [ p2Pile, setP2Pile ] = useState([]);
    const [ p1Turn, setP1Turn ] = useState(true);
    const [ p1Score, setP1Score ] = useState(0)
    const [ p2Score, setP2Score ] = useState(0)
    const [ cardsGoToP1, setCardsGoToP1 ] = useState(true)
    const myCallbacksList = useRef([])

    async function newGameDeal() {
        const p1Data = await drawCardsP1(props.deckData.deck_id)
        const p2Data = await drawCardsP2(props.deckData.deck_id)
        const commonData = await drawCommonCards(props.deckData.deck_id)
        setPlayer1Hand({deck_id: p1Data.deck_id, cards: p1Data.cards})
        setPlayer2Hand({deck_id: p2Data.deck_id, cards: p2Data.cards})
        setCommonCards({deck_id: commonData.deck_id, cards: commonData.cards})
        props.setDeckData((prevState) => ({
            ...prevState,
            remaining: 30
        }))
    }

    async function newDeal1() {
        const p1Data = await drawCardsP1(props.deckData.deck_id)
        setPlayer1Hand({deck_id: p1Data.deck_id, cards: p1Data.cards})
    }

    async function newDeal2() {
        const p2Data = await drawCardsP2(props.deckData.deck_id)
        setPlayer2Hand({deck_id: p2Data.deck_id, cards: p2Data.cards})
        props.setDeckData((prevState) => ({
            ...prevState,
            remaining: props.deckData.remaining -= 6
        }))
    }

    async function submitScoreData() {
        const schemaFormat = {
            player1Score: p1Score,
            player2Score: p2Score
        }
        await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-type': 'Application/json'
            },
            body: JSON.stringify(schemaFormat)
        }).then(res => res.json())
    }

    function handleNewPileData() {
        const newPileCards = p2Tally.cCardValue.map((card, idx) => {
                return(card)
            }).concat(p2Tally.pCardValue)
        if (newPileCards.length > 1) {
            setP2Pile(p2Pile.concat(newPileCards))
        }
    }

    const checkIfNewRound = () => {
        if (
            cardsGoToP1 === false
            && props.deckData.remaining === 0
            && player1Hand.cards.length === 0
            && player2Hand.cards.length === 1
        ) {
            setP2Pile(p2Pile.concat(commonCards.cards))
            setScores()
        } else if (
            cardsGoToP1 === true
            && props.deckData.remaining === 0
            && player1Hand.cards.length === 0
            && player2Hand.cards.length === 1
        ) {
            setP1Pile(p1Pile.concat(commonCards.cards))
            setScores()
        }
    }

    const playButtonFunction = () => {

        handleNewPileData()

        const newHand = []
        player2Hand.cards.forEach((card, idx) => {
            if (card.code !== p2Tally.pCardValue.code) {
                newHand.push(card)
            }
        })
        setPlayer2Hand((prevState) => ({
            ...prevState,
            cards: newHand
        }))

        const commonCardArray = []
        const commonTallyArray = p2Tally.cCardValue.map((card, idx) => {
            return card.code
        })
        commonCards.cards.map((card, idx) => {
            if(commonTallyArray.indexOf(card.code) === -1) {
                commonCardArray.push(card)
            }
        })
        setCommonCards((prevState) => ({
            ...prevState,
            cards: commonCardArray
        }))

        setP2Tally({pCardValue: {}, cCardValue: []})

        // if (p1Turn === false) {
        //     setP1Turn(true)
        // } else if (p1Turn === true) {
        //     setP1Turn(false)
        // }
        

        if (
            player1Hand.cards.length === 0
            && player2Hand.cards.length === 1
            && props.deckData.remaining > 0
            && p1Turn === true
        ) {
            setTimeout(() => {
                newDeal1()   
            }, 800)

            setTimeout(() => {
                newDeal2()   
            }, 1600)
        } else if (
            player1Hand.cards.length === 1
            && player2Hand.cards.length === 0
            && props.deckData.remaining > 0
            && p1Turn === false
        ) {
            setTimeout(() => {
                newDeal1()   
            }, 800)

            setTimeout(() => {
                newDeal2()   
            }, 1600)
        }
    }

    const setScores = () => {

        let p1Diamonds = []
        let p2Diamonds = []
        p1Pile.map((card, idx) => {
            if (card.suit === "DIAMONDS") {
                p1Diamonds.push(card)
            }
        })
        p2Pile.map((card, idx) => {
            if (card.suit === "DIAMONDS") {
                p2Diamonds.push(card)
            }
        })

        let p1Sevens = []
        let p2Sevens = []
        p1Pile.map((card, idx) => {
            if (card.value === "7") {
                p1Sevens.push(card)
            }
        })
        p2Pile.map((card, idx) => {
            if (card.value === "7") {
                p2Sevens.push(card)
            }
        })

        const cardLengthPoint = () => {

            let player1Discards = p1Pile
            let player2Discards = p2Pile

            const removeEmptyObjects = (arr, value) => {
                var i = 0
                while (i < arr.length) {
                    if (arr[i] === value) {
                        arr.splice(i, 1)
                    } else {
                        ++i
                    }
                }
                return arr
            }

            removeEmptyObjects(player1Discards, {})
            removeEmptyObjects(player2Discards, {})

            if (player1Discards.length > player2Discards.length) {
                setP1Score(prevState => ++prevState)
            } else if (player1Discards.length < player2Discards.length) {
                setP2Score(prevState => ++prevState)
            }
        }

        const cardDiamondsPoint = () => {
            if (p1Diamonds.length > p2Diamonds.length) {
                setP1Score(prevState => ++prevState)
            } else if (p1Diamonds.length < p2Diamonds.length) {
                setP2Score(prevState => ++prevState)
            }
        }

        const cardSevensPoint = () => {
            if (p1Sevens.length > p2Sevens.length) {
                setP1Score(prevState => ++prevState)
            } else if (p1Sevens.length < p2Sevens.length) {
                setP2Score(prevState => ++prevState)
            }
        }

        const card7DPoint = () => {
            p1Pile.map((card, idx) => {
                if (card.code === "7D") {
                    setP1Score(prevState => ++prevState)
                }
            })
            p2Pile.map((card, idx) => {
                if (card.code === "7D") {
                    setP2Score(prevState => ++prevState)
                }
            })
        }       

        setTimeout(cardLengthPoint(), 500)
        setTimeout(cardDiamondsPoint(), 5500)
        setTimeout(cardSevensPoint(), 10500)
        setTimeout(card7DPoint(), 15500)
    }

    useEffect(() => {
        playButtonFunction()
        checkIfNewRound()
        // myCallbacksList.current.forEach((callback) => (callback()))
        // myCallbacksList.current = []
    }, [cardsGoToP1])

    return (
        <div className={styles.GameTable}>
            <P1Side 
                deckData={props.deckData}
                setDeckData={props.setDeckData}
                player1Hand={player1Hand}
                player2Hand={player2Hand}
                setPlayer1Hand={setPlayer1Hand}
                setPlayer2Hand={setPlayer2Hand}
                commonCards={commonCards}
                setCommonCards={setCommonCards}
                p1Tally={p1Tally}
                setP1Tally={setP1Tally}
                p1Turn={p1Turn}
                setP1Turn={setP1Turn}
                p1Pile={p1Pile}
                p2Pile={p2Pile}
                setP1Pile={setP1Pile}                
                setP2Pile={setP2Pile}
                cardsGoToP1={cardsGoToP1}
                setCardsGoToP1={setCardsGoToP1}
                p1Score={p1Score}
                p2Score={p2Score}
                setP1Score={setP1Score}
                setP2Score={setP2Score}
            />
            <div className={styles.commonCardContainer}>
                <PlayArea
                    commonCards={commonCards}
                    p1Tally={p1Tally}
                    p2Tally={p2Tally}
                    setP1Tally={setP1Tally}
                    setP2Tally={setP2Tally}
                    p1Pile={p1Pile}
                    p2Pile={p2Pile}
                    setP1Pile={setP1Pile}
                    setP2Pile={setP2Pile}
                    p1Turn={p1Turn}
                    setP1Turn={setP1Turn}
                />
            </div>
            <P2Side
                deckData={props.deckData}
                setDeckData={props.setDeckData}
                player1Hand={player1Hand}
                player2Hand={player2Hand}
                setPlayer1Hand={setPlayer1Hand}
                setPlayer2Hand={setPlayer2Hand}
                commonCards={commonCards}
                setCommonCards={setCommonCards}
                p2Tally={p2Tally}
                setP2Tally={setP2Tally}
                p1Turn={p1Turn}
                setP1Turn={setP1Turn}
                p1Pile={p1Pile}
                p2Pile={p2Pile}
                setP1Pile={setP1Pile}                
                setP2Pile={setP2Pile}
                cardsGoToP1={cardsGoToP1}
                setCardsGoToP1={setCardsGoToP1}
                p1Score={p1Score}
                p2Score={p2Score}
                setP1Score={setP1Score}
                setP2Score={setP2Score}
                myCallbacksList={myCallbacksList}
            />
            <ScoreScreen
                p1Score={p1Score}
                p2Score={p2Score}
            />
            <NewRoundButton
                deckData={props.deckData}
                p1Score={p1Score}
                p2Score={p2Score}
                player1Hand={player1Hand}
                player2Hand={player2Hand}
                submitScoreData={submitScoreData}
            />
            {/* <GameHistoryButton
                player1Hand={player1Hand}
                player2Hand={player2Hand}
                deckData={props.deckData}
            /> */}
            <button
                className={styles.startbtn}
                onClick={() => newGameDeal()}
            >Start Game</button>
        </div>
    )
}

export default GameTable;