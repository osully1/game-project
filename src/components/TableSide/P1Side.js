import P1Hand from '../PlayerHand/P1Hand'
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
        <p className={styles.p1tally}>{props.p1Tally.pCardValue}</p>
        </>
    )
}

export default P1Side