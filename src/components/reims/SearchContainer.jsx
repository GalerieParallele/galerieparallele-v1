import styles from './SearchContainer.module.scss';
import LeftSearchContainer from "@/components/reims/LeftSearchContainer";
import RightSearchContainer from "@/components/reims/RightSearchContainer";

export default function SearchContainer() {
    return (
        <div className={styles.main}>
            <LeftSearchContainer/>
            <RightSearchContainer/>
        </div>
    )
}