import P1PlayCardsButton from '../PlayCardsButton/P1PlayCardsButton'
import P1DiscardButton from '../DiscardButton/P1DiscardButton'
import styles from './PlayerTally.module.css'

const Player1Tally = (props) => {

    const playerSelect = () => {
        if (props.p1Tally.pCardValue.value === 'KING') {
            props.setP1Tally((prevState) => ({...prevState, pCardValue: {code: props.p1Tally.pCardValue.code, value: props.p1Tally.pCardValue.value.replace('KING', '10'), suit: props.p1Tally.pCardValue.suit}}))
        } else if (props.p1Tally.pCardValue.value === 'JACK') {
            props.setP1Tally((prevState) => ({...prevState, pCardValue: {code: props.p1Tally.pCardValue.code, value: props.p1Tally.pCardValue.value.replace('JACK', '9'), suit: props.p1Tally.pCardValue.suit}}))
        } else if (props.p1Tally.pCardValue.value === 'QUEEN') {
            props.setP1Tally((prevState) => ({...prevState, pCardValue: {code: props.p1Tally.pCardValue.code, value: props.p1Tally.pCardValue.value.replace('QUEEN', '8'), suit: props.p1Tally.pCardValue.suit}}))
        } else if (props.p1Tally.pCardValue.value === 'ACE') {
            props.setP1Tally((prevState) => ({...prevState, pCardValue: {code: props.p1Tally.pCardValue.code, value: props.p1Tally.pCardValue.value.replace('ACE', '1'), suit: props.p1Tally.pCardValue.suit}}))
        }
        return (parseInt(props.p1Tally.pCardValue.value))
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

    const pTallyDisplay = () => {
        if (isNaN(playerSelect())) {
            return <p></p>
        } else {
            return (
                <>
                <p>{playerSelect()}</p>
                <p>{tallyEquals().reduce((a, b) => a + b, 0)}</p>
                <P1DiscardButton 
                    deckData={props.deckData}
                    player1Hand={props.player1Hand}
                    setPlayer1Hand={props.setPlayer1Hand}
                    commonCards={props.commonCards}
                    setCommonCards={props.setCommonCards}
                    p1Tally={props.p1Tally}
                    setP1Tally={props.setP1Tally}
                    p1Turn={props.p1Turn}
                    setP1Turn={props.setP1Turn}
                />
                </>
            )
        }
    }

    return(
        <div className={styles.p1tally}>
            <p>{pTallyDisplay()}</p>
            <P1PlayCardsButton
                deckData={props.deckData}
                player1Hand={props.player1Hand}
                setPlayer1Hand={props.setPlayer1Hand}
                commonCards={props.commonCards}
                setCommonCards={props.setCommonCards}
                p1Tally={props.p1Tally}
                setP1Tally={props.setP1Tally}
                p1Turn={props.p1Turn}
                setP1Turn={props.setP1Turn}
                p1Pile={props.p1Pile}
                setP1Pile={props.setP1Pile}
            />
        </div>
    )
}

export default Player1Tally