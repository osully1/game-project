import styles from './PlayerHand.module.css'

const P1Hand = (props) => {
    return props.player1Hand.cards.map((card, idx) => {
        return(
            <div className={styles.P1Hand}>
                <img src={card.image} className={styles.card}></img>
            </div>
        )
    })
}

export default P1Hand;