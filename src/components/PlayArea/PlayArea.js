import React from 'react'
import styles from './PlayArea.module.css'
import { Card } from '../Card/Card'


const PlayArea = (props) => {
    return props.commonCards.cards.map((card, idx) => {
        return(
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
                        if (props.p1Tally.pCardValue && props.p1Turn.isP1Turn === true) {
                            props.setP1Tally(props.p1Tally, props.p1Tally.cCardValue.concat(card.value))
                        } else if (props.p2Tally.pCardValue && props.p1Turn.isP1Turn === false) {
                            props.setP2Tally(props.p2Tally, props.p2Tally.cCardValue.concat(card.value))
                        }
                    }}
                />
        )
    })
}

export default PlayArea;