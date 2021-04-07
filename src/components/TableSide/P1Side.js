import P1Hand from '../PlayerHand/P1Hand'
import styles from './TableSide.module.css'

const P1Side = (props) => {
    return(
        <>
        <div className={styles.P1Side}>
            <P1Hand deckData={props.deckData} player1Hand={props.player1Hand}/>
        </div>
        <button className="btn play-btn play-btn-1">Play</button>
        </>
    )
}

export default P1Side