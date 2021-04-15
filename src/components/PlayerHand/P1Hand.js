import { slideInDown } from 'react-animations'
import { css, StyleSheet } from "aphrodite"

const P1Hand = (props) => {

    const styles = StyleSheet.create({
        P1Hand: {
            animationName: slideInDown,
            animationDuration: '1s',
            margin: '1rem'
        }
    })

    function toggleCard(e) {
        props.setP1Tally({pCardValue: e, cCardValue: []})
    }

    return props.player1Hand.cards.map((card, idx) => {
        return(
            <div className={css(styles.P1Hand)}>
                <button 
                    style={{
                        height: '7em',
                        width: '5em',
                        margin: '1rem',
                        backgroundImage: "url(" + `${card.image}` + ")",
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no - repeat',
                        backgroundSize: 'cover'
                    }}
                    onClick={() => {
                        if (props.p1Turn === true) {
                            toggleCard({code: card.code, value: card.value, suit: card.suit})
                        } else {
                            return null
                        }
                    }}
                    key={idx}
                />
            </div>
        )
    })
}

export default P1Hand;