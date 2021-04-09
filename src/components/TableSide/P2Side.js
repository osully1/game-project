import P2Hand from '../PlayerHand/P2Hand'
import Player2Tally from '../PlayerTally/Player2Tally'
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
            p2Tally={props.p2Tally}
            setP2Tally={props.setP2Tally}
            p2Turn={props.p2Turn}
            setP2Turn={props.setP2Turn}
        />
        </>
    )
}

export default P2Side