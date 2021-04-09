import React from 'react'
import styles from './PlayArea.module.css'
import { Card } from '../Card/Card'


const PlayArea = (props) => {

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
                        if (
                            props.p1Tally.pCardValue
                            && props.p1Turn.isP1Turn === true
                            && props.p1Tally.cCardValue.length < 4
                            && props.p1Tally.cCardValue.every(function (i) {
                                return i.code !== card.code
                            })) {
                            toggleCardP1({code: card.code, value: card.value})
                        } else if (
                            props.p2Tally.pCardValue
                            && props.p1Turn.isP1Turn === false
                            && props.p2Tally.cCardValue.length < 4
                            && props.p2Tally.cCardValue.every(function (i) {
                                return i.code !== card.code
                            })) {
                            toggleCardP2({code: card.code, value: card.value})
                        }
                    }}
                />
        )
    })
}

export default PlayArea;