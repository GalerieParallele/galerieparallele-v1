import Link from "next/link";
import {AiFillFacebook, AiFillInstagram, AiFillLinkedin} from "react-icons/ai";

import styles from './ArtistProfileSocial.module.scss';
import {IoEarth} from "react-icons/io5";

export default function ArtistProfileSocial({fullName, instagram, facebook, linkedin, website, tags}) {
    return (<div className={styles.main}>
        <h2>{fullName}</h2>
        <div className={styles.socialsList}>
            {instagram && (<Link href={instagram} passHref>
                <AiFillInstagram/>
            </Link>)}
            {facebook && (<>
                {instagram && <span className={styles.verticalSeparator}/>}
                <Link href={facebook} passHref>
                    <AiFillFacebook/>
                </Link>
            </>)}
            {linkedin && (<>
                {(instagram || facebook) && <span className={styles.verticalSeparator}/>}
                <Link href={linkedin} passHref>
                    <AiFillLinkedin/>
                </Link>
            </>)}
            {
                website && (<>
                    {(instagram || facebook || linkedin) && <span className={styles.verticalSeparator}/>}
                    <Link href={website} passHref>
                        <IoEarth/>
                    </Link>
                </>)
            }
        </div>
        {tags && tags.length > 0 && (
            <div className={styles.tags}>
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className={styles.tagItem}>
                        #{tag.name}
                    </span>
                ))}
            </div>
        )}
    </div>);
}
