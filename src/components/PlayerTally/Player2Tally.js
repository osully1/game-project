import P2PlayCardsButton from '../PlayCardsButton/P2PlayCardsButton'
import styles from './PlayerTally.module.css'

const Player2Tally = (props) => {

    const playerSelect = () => {
        if (props.p2Tally.pCardValue === 'KING') {
            props.setP2Tally((prevState) => ({...prevState, pCardValue: props.p2Tally.pCardValue.replace('KING', '10')}))
        } else if (props.p2Tally.pCardValue === 'JACK') {
            props.setP2Tally((prevState) => ({...prevState, pCardValue: props.p2Tally.pCardValue.replace('JACK', '9')}))
        } else if (props.p2Tally.pCardValue === 'QUEEN') {
            props.setP2Tally((prevState) => ({...prevState, pCardValue: props.p2Tally.pCardValue.replace('QUEEN', '8')}))
        } else if (props.p2Tally.pCardValue === 'ACE') {
            props.setP2Tally((prevState) => ({...prevState, pCardValue: props.p2Tally.pCardValue.replace('ACE', '1')}))
        }
        return (parseInt(props.p2Tally.pCardValue))
    }

    const tallyEquals = () => {
        if (props.p2Tally.cCardValue.length) {
            return(
                props.p2Tally.cCardValue.map((cCard, idx) => {
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
        <div className={styles.p2tally}>
            <p>{playerSelect()}</p>
            {/* <p>{props.p2Tally.cCardValue.map((card, idx) => {
                return (
                    <span> + {card.value}</span>
                )
            })}</p> */}
            <p>{
                tallyEquals().reduce((a, b) => a + b, 0)
            }</p>
            <P2PlayCardsButton
                deckData={props.deckData}
                player2Hand={props.player2Hand}
                setPlayer2Hand={props.setPlayer2Hand}
                commonCards={props.commonCards}
                setCommonCards={props.setCommonCards}
                p2Tally={props.p2Tally}
                setP2Tally={props.setP2Tally}
                p1Turn={props.p1Turn}
                setP1Turn={props.setP1Turn}
            />
        </div>
    )
}

export default Player2Tally