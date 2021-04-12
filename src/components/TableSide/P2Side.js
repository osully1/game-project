import P2Hand from '../PlayerHand/P2Hand'
import Player2Tally from '../PlayerTally/Player2Tally'
import NewDealButton from '../NewDealButton/NewDealButton'
import styles from './TableSide.module.css'

const P2Side = (props) => {
    return(
        <>
        <div className={styles.P2Side}>
            <P2Hand
                deckData={props.deckData}
                player2Hand={props.player2Hand}
                p2Tally={props.p2Tally}
                setP2Tally={props.setP2Tally}
                p1Turn={props.p1Turn}
                setP1Turn={props.setP1Turn}
            />
        </div>
        <Player2Tally
            deckData={props.deckData}
            player1Hand={props.player1Hand}
            setPlayer1Hand={props.setPlayer1Hand}
            player2Hand={props.player2Hand}
            setPlayer2Hand={props.setPlayer2Hand}
            commonCards={props.commonCards}
            setCommonCards={props.setCommonCards}
            p2Tally={props.p2Tally}
            setP2Tally={props.setP2Tally}
            p1Turn={props.p1Turn}
            setP1Turn={props.setP1Turn}
            p2Pile={props.p2Pile}
            setP2Pile={props.setP2Pile}
            cardsGoToP1={props.cardsGoToP1}
            setCardsGoToP1={props.setCardsGoToP1}
        />
        {/* <NewDealButton
            deckData={props.deckData}
            player1Hand={props.player1Hand}
            setPlayer1Hand={props.setPlayer1Hand}
            player2Hand={props.player2Hand}
            setPlayer2Hand={props.setPlayer2Hand}
        /> */}
        </>
    )
}

export default P2Side