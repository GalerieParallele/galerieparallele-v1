import React from "react";

import styles from "./Picto.module.css"
import PictoItem from "@/components/items/picto/PictoItem";
import {FaQuestion} from "react-icons/fa";

export default function Picto() {
    return (
        <div className={styles.picto}>
            <PictoItem
                IconComponent={FaQuestion}
                title={"LOREM IPSUM"}
            />
            <PictoItem
                IconComponent={FaQuestion}
                title={"LOREM IPSUM"}
            />
            <PictoItem
                IconComponent={FaQuestion}
                title={"LOREM IPSUM"}
            />
            <PictoItem
                IconComponent={FaQuestion}
                title={"LOREM IPSUM"}
            />
        </div>
    )
}