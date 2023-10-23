import styles from './RowPortrait.module.scss';

export default function RowPortrait({question, response}) {
    return (
        <div className={styles.main}>
            <span className={styles.question}>{question}</span>
            <span className={styles.response}>
                <span>
                    {response}
                </span>
                <span>
                    ?
                </span>
            </span>
        </div>
    )
}