import P1Hand from '../PlayerHand/P1Hand'
import Player1Tally from '../PlayerTally/Player1Tally'
import styles from './TableSide.module.css'

const P1Side = (props) => {
    return(
        <>
        <div className={styles.P1Side}>
            <P1Hand
                deckData={props.deckData}
                player1Hand={props.player1Hand}
                p1Tally={props.p1Tally}
                setP1Tally={props.setP1Tally}
                p1Turn={props.p1Turn}
                setP1Turn={props.setP1Turn}
            />
        </div>
        <Player1Tally
            deckData={props.deckData}
            setDeckData={props.setDeckData}
            player1Hand={props.player1Hand}
            setPlayer1Hand={props.setPlayer1Hand}
            player2Hand={props.player2Hand}
            setPlayer2Hand={props.setPlayer2Hand}
            commonCards={props.commonCards}
            setCommonCards={props.setCommonCards}
            p1Tally={props.p1Tally}
            setP1Tally={props.setP1Tally}
            p1Turn={props.p1Turn}
            setP1Turn={props.setP1Turn}
            p1Pile={props.p1Pile}
            setP1Pile={props.setP1Pile}
            cardsGoToP1={props.cardsGoToP1}
            setCardsGoToP1={props.setCardsGoToP1}
            p1Score={props.p1Score}
            p2Score={props.p2Score}
            setP1Score={props.setP1Score}
            setP2Score={props.setP2Score}
        />
        </>
    )
}

export default P1Side