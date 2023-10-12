import Navbar from "@/components/items/navbar/Navbar";
import Image from "next/image";

import styles from "./Index.module.scss";
import Link from "next/link";
import {AiFillFacebook, AiFillInstagram, AiFillLinkedin} from "react-icons/ai";

export default function artisteTest() {
    return (
        <main>
            <Navbar/>
            <main>
                <section>
                    <div>
                        {/* Artiste */}
                        <div>
                            {/* Avatar */}
                            <div className={styles.imgContainer}>
                                <Image
                                    src="/assets/img/artistes/orlinski.jpg"
                                    alt={"Image de orlinski"}
                                    width={200}
                                    height={200}
                                />
                            </div>
                        </div>
                        <div>
                            {/* Social */}
                            <h2>Richard Orlinski</h2>
                            <div className={styles.socialsList}>
                                <Link
                                    href={"#"}
                                >
                                    <AiFillInstagram/>
                                </Link>
                                <span className={styles.verticalSeparator}/>
                                <Link
                                    href={"#"}
                                >
                                    <AiFillFacebook/>
                                </Link>
                                <span className={styles.verticalSeparator}/>
                                <Link
                                    href={"#"}
                                >
                                    <AiFillLinkedin/>
                                </Link>
                            </div>


                        </div>
                    </div>
                    <div>
                        {/* Save the date */}
                        <div>
                            {/* Head */}
                        </div>
                        <div>
                            {/* List */}
                        </div>
                    </div>
                </section>
            </main>
        </main>
    )
}