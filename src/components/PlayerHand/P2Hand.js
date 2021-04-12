import FadeIn from 'react-fade-in'
import styles from './PlayerHand.module.css'

const P2Hand = (props) => {

    function toggleCard(e) {
        props.setP2Tally({pCardValue: e, cCardValue: []})
    }

    return props.player2Hand.cards.map((card, idx) => {
        return(
            <FadeIn delay={150}>
                <div className="P2Hand">
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
                    />
                </div>
            </FadeIn>
        )
    })
}

export default P2Hand;