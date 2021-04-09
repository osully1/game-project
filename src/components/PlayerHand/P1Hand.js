import { useState } from 'react';
import styles from './PlayerHand.module.css'

const P1Hand = (props) => {

    function toggleCard(e) {
        props.setP1Tally({pCardValue: e, cCardValue: []})
    }

    return props.player1Hand.cards.map((card, idx) => {
        return(
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
                        if (props.p1Turn.isP1Turn === true) {
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

export default P1Hand;