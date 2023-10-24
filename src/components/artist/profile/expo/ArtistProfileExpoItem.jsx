import styles from './ArtistProfileExpoItem.module.scss';
import {BiChevronsDown, BiChevronsUp} from "react-icons/bi";

export default function ArtistProfileExpoItem({item, isOpen, onClick}) {
    return (
        <button onClick={onClick} className={styles.main}>
            <div className={styles.year}>
                <p>{item.year}</p>
            </div>
            <div className={styles.rightContent}>
                {
                    isOpen && (
                        <div className={styles.list}>
                            {item.content.map((content, index) => (
                                <div key={index}>
                                    <p>{content.name}, {content.location}</p>
                                </div>
                            ))}
                        </div>
                    )
                }
                {
                    !isOpen && (
                        <div className={styles.rightContentPreview}>
                            {item.content.slice(0, 2).map((content, index) => (
                                <div key={index}>
                                    <p>{content.name}, {content.location}</p>
                                </div>
                            ))}
                        </div>
                    )
                }
                <div className={styles.preview}>
                    {isOpen ? <BiChevronsUp/> : <BiChevronsDown/>}
                </div>
            </div>
        </button>
    );
}
