import P2Hand from '../PlayerHand/P2Hand'
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
            />
        </div>
        <p className={styles.p2tally}>{props.p2Tally.pCardValue}</p>
        </>
    )
}

export default P2Side