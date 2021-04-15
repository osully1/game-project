import styles from './ScoreScreen.module.css'

const ScoreScreen = (props) => {
    if (props.p1Score > 0 || props.p2Score > 0) {
        return (
            <div className={styles.PlayerScores}>
                <p className={styles.p1score}>Player 1: {props.p1Score}</p>
                <p className={styles.p2score}>Player 2: {props.p2Score}</p>
            </div>
        )
    } else {
        return(<p></p>)
    }
}

export default ScoreScreen