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
                />
        )
    })
}

export default PlayArea;