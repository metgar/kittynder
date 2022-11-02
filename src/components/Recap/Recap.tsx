import { Results } from '../../models/models'
import styles from './Recap.module.css';

interface RecapProps {
    resultData: Results,
    manageNewGame: () => void
}

export function Recap({ resultData, manageNewGame }: RecapProps) {

    const { dislikes, likes, seen, skipped } = resultData;

    return (
        <>
            <div className={styles.results}>
                <div className={styles.row}><span>likes</span><span data-testid="likes">{likes}</span></div>
                <div className={styles.row}><span>dislikes</span><span data-testid='dislikes'>{dislikes}</span></div>
                <div className={styles.row}><span>skipped</span><span data-testid='skipped'>{skipped}</span></div>
                <div className={styles.row}><span>seen</span><span data-testid='seen'>{seen}</span></div>
            </div>

            <button onClick={manageNewGame} data-testid="new-game-btn">Restart</button>
        </>
    )
}
