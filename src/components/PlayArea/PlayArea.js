import React from 'react'
import { slideInRight } from 'react-animations'
import { css, StyleSheet } from "aphrodite"
import style from './PlayArea.module.css'


const PlayArea = (props) => {

    const styles = StyleSheet.create({
        CommonCards: {
            animationName: slideInRight,
            animationDuration: '1s',
            height: '7em',
            width: '5em',
            margin: '1rem',
            backgroundPosition: 'center',
            backgroundRepeat: 'no - repeat',
            backgroundSize: 'cover'
        }
    })

    function toggleCardP1(e) {
        let newArr1 = props.p1Tally.cCardValue.concat(e)
        props.setP1Tally((prevState) => ({
            ...prevState,
            cCardValue: newArr1
        }))
    }

    function toggleCardP2(e) {
        let newArr2 = props.p2Tally.cCardValue.concat(e)
        props.setP2Tally((prevState) => ({
            ...prevState,
            cCardValue: newArr2
        }))
    }

    return props.commonCards.cards.map((card, idx) => {
        return(
            <button 
                className={css(styles.CommonCards)}
                style={{backgroundImage: "url(" + `${card.image}` + ")",}}
                onClick={() => {
                    if (
                        props.p1Tally.pCardValue
                        && props.p1Turn === true
                        && props.p1Tally.cCardValue.length < 4
                        && props.p1Tally.cCardValue.every(function (i) {
                            return i.code !== card.code
                        })) {
                        toggleCardP1({code: card.code, value: card.value, suit: card.suit})
                    } else if (
                        props.p2Tally.pCardValue
                        && props.p1Turn === false
                        && props.p2Tally.cCardValue.length < 4
                        && props.p2Tally.cCardValue.every(function (i) {
                            return i.code !== card.code
                        })) {
                        toggleCardP2({code: card.code, value: card.value, suit: card.suit})
                    }
                }}
                key={idx}
            />
        )
    })
}

export default PlayArea;