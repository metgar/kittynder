import { CatData, UserAction, UserActionFn } from '../../models/models';
import styles from './Viewer.module.css';

interface ViewerProps {
    data: CatData;
    userAction: UserActionFn;
}

export function Viewer({ data, userAction }: ViewerProps) {

    const { affection, energy, intelligence } = data;
    return (
        <div className={styles.viewWrapper}>

            <div className={styles.imageWrapper}>
                <img src={data.url} alt='cat' className={styles.responsive}></img>
            </div>

            <div className={styles.info}>
                <div className={styles.row}><span>affection</span><span>{affection}</span></div>
                <div className={styles.row}><span>energy</span><span> {energy}</span></div>
                <div className={styles.row}><span>intelligence</span><span>{intelligence}</span></div>
            </div>

            <div className={styles.actions}>
                <button onClick={userAction(UserAction.LIKE)}>like</button>
                <button onClick={userAction(UserAction.DISLIKE)}>dislike</button>
                <button onClick={userAction(UserAction.SKIP)}>skip</button>
            </div>
        </div>
    );
}
