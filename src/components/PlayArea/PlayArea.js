import React from 'react'
import { Image } from 'react-konva'
import styles from './PlayArea.module.css'

const PlayArea = (props) => {
    return props.commonCards.cards.map((card, idx) => {
        return(
            <div className={styles.commonCards}>
                <img src={card.image} className={styles.commonCard}></img>
            </div>
        )
    })
}

export default PlayArea;