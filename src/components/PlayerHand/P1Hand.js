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
                        height: '20vh',
                        width: '11vw',
                        margin: '1rem',
                        backgroundImage: "url(" + `${card.image}` + ")",
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no - repeat',
                        backgroundSize: 'cover'
                    }}
                    onClick={() => toggleCard(card.value)}
                />
            </div>
        )
    })
}

export default P1Hand;