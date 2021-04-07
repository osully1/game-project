import styles from './PlayerHand.module.css'

const P2Hand = (props) => {
    return props.player2Hand.cards.map((card, idx) => {
        return(
            <div className={styles.P2Hand}>
                <img src={card.image} className={styles.card}></img>
            </div>
        )
    })
}

export default P2Hand;