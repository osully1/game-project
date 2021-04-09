import styles from './PlayerTally.module.css'

const Player1Tally = (props) => {

    const playerSelect = () => {
        if (props.p1Tally.pCardValue === 'KING') {
            props.setP1Tally(props.p1Tally.pCardValue.replace('KING', '10'))
        } else if (props.p1Tally.pCardValue === 'JACK') {
            props.setP1Tally(props.p1Tally.pCardValue.replace('JACK', '9'))
        } else if (props.p1Tally.pCardValue === 'QUEEN') {
            props.setP1Tally(props.p1Tally.pCardValue.replace('QUEEN', '8'))
        } else if (props.p1Tally.pCardValue === 'ACE') {
            props.setP1Tally(props.p1Tally.pCardValue.replace('ACE', '1'))
        }
        return (parseInt(props.p1Tally.pCardValue))
    }

    const tallyEquals = () => {
        if (props.p1Tally.cCardValue.length) {
            return(
                props.p1Tally.cCardValue.map((cCard, idx) => {
                    if (cCard.value === 'KING') {
                        cCard.value = cCard.value.replace('KING', '10')
                    } else if (cCard.value === 'JACK') {
                        cCard.value = cCard.value.replace('JACK', '9')
                    } else if (cCard.value === 'QUEEN') {
                        cCard.value = cCard.value.replace('QUEEN', '8')
                    } else if (cCard.value === 'ACE') {
                        cCard.value = cCard.value.replace('ACE', '1')
                    }
                    return (parseInt(cCard.value))
                })
            )
        } else {
            return [0]
        }
    }

    return(
        <div className={styles.p1tally}>
            <p>{props.p1Tally.pCardValue}</p>
            <p>{props.p1Tally.cCardValue.map((card, idx) => {
                return (
                    <span> + {card.value}</span>
                )
            })}</p>
            <p>{
                tallyEquals().reduce((a, b) => a + b, 0)
            }</p>
        </div>
    )
}

export default Player1Tally