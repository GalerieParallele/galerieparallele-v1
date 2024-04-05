import React, {useState} from "react";

import generalStyle from "@/components/oeuvres/filtres/General.module.scss";
import initialStyle from './InitialFiltresItem.module.scss';
import {FaChevronRight} from "react-icons/fa";

export default function InitialFiltresItem({title, children, isOpen = false}) {

    const [open, setOpen] = useState(isOpen)

    const toggleOpen = () => {
        setOpen(!open)
    }

    return (
        <div className={generalStyle.filtresContainer}>
            <h4
                className={generalStyle.filtresTitle}
                onClick={toggleOpen}
            >
                 <span
                     style={{
                         transform: open ? 'rotate(90deg)' : 'rotate(0deg)'
                     }}
                 >
                <FaChevronRight/>
            </span>
                {title}
            </h4>
            <div className={`${!open && initialStyle.close} ${initialStyle.content}`}>
                {children}
            </div>
        </div>
    )
}