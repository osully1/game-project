import styles from './PastScores.module.css'

const PastScores = (props) => {
    return(
        props.scores.map((score, idx) => {
            return(
                <div className={styles.singleScore}>
                    <p className={styles.p1score}>Player 1: {score.player1Score}</p>
                    <p className={styles.p1score}>Player 2: {score.player2Score}</p>
                </div>
            )
        })
    )
}

export default PastScores