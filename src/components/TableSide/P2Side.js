import P2Hand from '../PlayerHand/P2Hand'
import styles from './TableSide.module.css'

const P2Side = (props) => {
    return(
        <>
        <div className={styles.P2Side}>
            <P2Hand deckData={props.deckData} player2Hand={props.player2Hand}/>
        </div>
        <button className={styles.playButton}>Play</button>
        </>
    )
}

export default P2Side