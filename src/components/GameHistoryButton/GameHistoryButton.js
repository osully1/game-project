import { Link } from 'react-router-dom'
import styles from './GameHistoryButton.module.css'

const GameHistoryButton = (props) => {
    if (
        (
            props.deckData.remaining === 0
            && props.player1Hand.cards.length === 0
            && props.player1Hand.cards.length === 0
        ) || (
            props.deckData.remaining === 40
            && props.player1Hand.cards.length === 0
            && props.player1Hand.cards.length === 0
        )
    ) {
        return(<Link className={styles.historybtn} to='/history'>Game History</Link>)
    } else {
        return(<p></p>)
    }
}

export default GameHistoryButton