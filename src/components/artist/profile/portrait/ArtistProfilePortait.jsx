import styles from './ArtistProfilePortait.module.scss';
import RowPortrait from "@/components/artist/profile/portrait/RowPortrait";

export default function ArtistProfilePortait({questionsList}) {

    const handleGetFirstHalf = () => {
        const half = Math.ceil(questionsList.length / 2);
        return questionsList.slice(0, half);
    }

    const handleGetSecondHalf = () => {
        const half = Math.ceil(questionsList.length / 2);
        return questionsList.slice(half, questionsList.length);
    }

    return (
        <div className={styles.main}>
            <div className={styles.questionsList}>
                {
                    handleGetFirstHalf().map((item, index) => {
                        return (
                            <RowPortrait
                                question={item.question}
                                response={item.answer}
                                key={index}
                            />
                        )
                    })
                }
            </div>
            <div className={styles.separator}/>
            <div  className={styles.questionsList}>
                {
                    handleGetSecondHalf().map((item, index) => {
                        return (
                            <RowPortrait
                                question={item.question}
                                response={item.answer}
                                key={index}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}