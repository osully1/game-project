import { useState } from 'react';
import { drawCardsP1 } from '../../services/card-api';
import { drawCardsP2 } from '../../services/card-api';
import { drawCommonCards } from '../../services/card-api'
import P1Side from '../TableSide/P1Side';
import P2Side from '../TableSide/P2Side';
import PlayArea from '../PlayArea/PlayArea';
import styles from './GameTable.module.css';

const GameTable = (props) => {

    const [ player1Hand, setPlayer1Hand ] = useState({deck_id: '', cards: []});
    const [ player2Hand, setPlayer2Hand ] = useState({deck_id: '', cards: []});
    const [ commonCards, setCommonCards ] = useState({deck_id: '', cards: []});
    const [ p1Tally, setP1Tally ] = useState({pCardValue: null, cCardValue: []});
    const [ p2Tally, setP2Tally ] = useState({pCardValue: null, cCardValue: []});
    const [ p1Turn, setP1Turn ] = useState({isP1Turn: true});

    async function newGameDeal() {
        const p1Data = await drawCardsP1(props.deckData.deck_id)
        const p2Data = await drawCardsP2(props.deckData.deck_id)
        const commonData = await drawCommonCards(props.deckData.deck_id)
        setPlayer1Hand({deck_id: p1Data.deck_id, cards: p1Data.cards})
        setPlayer2Hand({deck_id: p2Data.deck_id, cards: p2Data.cards})
        setCommonCards({deck_id: commonData.deck_id, cards: commonData.cards})
        console.log(p1Data)
      }

    return (
        <div className={styles.GameTable}>
            <P1Side 
                deckData={props.deckData}
                player1Hand={player1Hand}
                p1Tally={p1Tally}
                setP1Tally={setP1Tally}
                p1Turn={p1Turn}
                setP1Turn={setP1Turn}
            />
            <div className={styles.commonCardContainer}>
                <PlayArea
                    commonCards={commonCards}
                    p1Tally={p1Tally}
                    p2Tally={p2Tally}
                    setP1Tally={setP1Tally}
                    setP2Tally={setP2Tally}
                    p1Turn={p1Turn}
                    setP1Turn={setP1Turn}
                />
            </div>
            <P2Side
                deckData={props.deckData}
                player2Hand={player2Hand}
                p2Tally={p2Tally}
                setP2Tally={setP2Tally}
                p1Turn={p1Turn}
                setP1Turn={setP1Turn}
            />
            <button
                className={styles.startbtn}
                onClick={() => newGameDeal()}
            >Start Game</button>
        </div>
    )
}

export default GameTable;