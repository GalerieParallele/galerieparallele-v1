import PropTypes from "prop-types";

import styles from './OeuvreListItem.module.scss';
import Image from "next/image";
import {MdModeEditOutline} from "react-icons/md";
import {FaTrashCan} from "react-icons/fa6";

export default function OeuvreListItem({oeuvre}) {

    return (
        <div className={styles.main}>
            <h3>{oeuvre.name}</h3>
            <div className={styles.imgContainer}>
                <Image
                    src={oeuvre.images[0]}
                    alt={'test'}
                    width={200}
                    height={200}
                />
            </div>
            <div className={styles.buttonsSpace}>
                <button
                    type={"button"}
                >
                    <MdModeEditOutline/>
                </button>
                <button
                    type={"button"}
                >
                    <FaTrashCan/>
                </button>
            </div>
        </div>
    )
}

OeuvreListItem.propTypes = {
    oeuvre: PropTypes.shape(
        {
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            images: PropTypes.shape(
                PropTypes.string.isRequired
            ).isRequired
        }
    )
}