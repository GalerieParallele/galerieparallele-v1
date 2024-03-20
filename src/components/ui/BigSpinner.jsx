import React from "react";

import {ImSpinner6} from "react-icons/im";

import "@/app/globals.css";

export default function BigSpinner() {
    return <div className={"spinBox"}>
        <ImSpinner6 className={"spin bigSpin"}/>
    </div>
}