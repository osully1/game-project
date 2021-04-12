import FadeIn from 'react-fade-in'
import styles from './PlayerHand.module.css'

const P1Hand = (props) => {

    function toggleCard(e) {
        props.setP1Tally({pCardValue: e, cCardValue: []})
    }

    return props.player1Hand.cards.map((card, idx) => {
        return(
            <FadeIn delay={50}>
                <div className="P1Hand">
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
                    />
                </div>
            </FadeIn>
        )
    })
}

export default P1Hand;