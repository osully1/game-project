import { useState } from 'react';
import styles from './PlayerHand.module.css'

const P2Hand = (props) => {

    function toggleCard(e) {
        props.setP2Tally({pCardValue: e, cCardValue: []})
    }

    return props.player2Hand.cards.map((card, idx) => {
        return(
            <div className="P2Hand">
                <button
                    style={{
                        height: '20vh',
                        width: '11vw',
                        margin: '1rem',
                        backgroundImage: "url(" + `${card.image}` + ")",
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no - repeat',
                        backgroundSize: 'cover'
                    }}
                    onClick={() => {
                        if (props.p1Turn.isP1Turn === false) {
                            toggleCard(card.value)
                        } else {
                            return null
                        }
                    }}
                />
            </div>
        )
    })
}

export default P2Hand;