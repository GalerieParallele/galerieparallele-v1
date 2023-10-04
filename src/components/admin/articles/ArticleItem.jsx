import React from 'react';

import ROUTES from "@/constants/ROUTES";

import {HiLockClosed, HiLockOpen} from "react-icons/hi";
import {htmlToText} from 'html-to-text';
import {useRouter} from "next/router";
import {FaRegEdit} from "react-icons/fa";
import {ImEye} from "react-icons/im";
import {AiFillDelete} from "react-icons/ai";

import styles from "./ArticleItem.module.css";

export default function ArticleItem({id, title, content, lock}) {

    const router = useRouter();

    return <div className={styles.homeArticle}>
        <div className={styles.status}>
            {lock ?
                <>
                    <HiLockClosed
                        className={styles.closeStatus}/>
                    <p>Privé</p>
                </>
                :
                <>
                    <HiLockOpen
                        className={styles.openStatus}
                    />
                    <p>Public</p>
                </>
            }
        </div>
        <div className={styles.content}>
            <p>{title}</p>
            <p>{htmlToText(content)}</p>
        </div>
        <div className={styles.buttons}>
            <button onClick={() => {
                router.push(`${ROUTES.ADMIN.ARTICLES.EDIT}${id}`)
            }}>
                <FaRegEdit/>
            </button>
            <button onClick={() => {
                router.push(`${ROUTES.ADMIN.ARTICLES.PREVIEW}${id}`)
            }}>
                <ImEye/>
            </button>
            <button onClick={() => {
                router.push(`${ROUTES.ADMIN.ARTICLES.DELETE}${id}`)
            }}>
                <AiFillDelete/>
            </button>
        </div>
    </div>
}