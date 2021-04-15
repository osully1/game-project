import { slideInUp } from 'react-animations'
import { fadeOut } from 'react-animations'
import { css, StyleSheet } from "aphrodite"

const P2Hand = (props) => {

    const styles = StyleSheet.create({
        P2Hand: {
            animationName: slideInUp,
            animationDuration: '1s',
            margin: '1rem'
        },
        P2Out: {
            animationName: fadeOut,
            animationDuration: '1s'
        }
    })

    function toggleCard(e) {
        props.setP2Tally({pCardValue: e, cCardValue: []})
    }

    return props.player2Hand.cards.map((card, idx) => {
        return(
            <div className={css(styles.P2Hand)}>
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
                        if (props.p1Turn === false) {
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

export default P2Hand;