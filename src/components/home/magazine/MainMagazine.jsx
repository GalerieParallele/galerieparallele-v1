import MagazineItem from "@/components/home/magazine/MagazineItem";

import styles from "./MainMagazine.module.scss";
import Button from "@/components/items/button/Button";

export default function MainMagazine() {
    return (
        <main className={styles.main}>
            <div>
                <MagazineItem
                    title={"Titre 1"}
                    content={"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam."}
                    date={"24 juillet 2023"}
                    image={"https://picsum.photos/400/300?random=1"}
                />
                <MagazineItem
                    title={"Titre 1"}
                    content={"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam."}
                    date={"24 juillet 2023"}
                    image={"https://picsum.photos/400/300?random=2"}
                />
                <MagazineItem
                    title={"Titre 1"}
                    content={"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam."}
                    date={"24 juillet 2023"}
                    image={"https://picsum.photos/400/300?random=3"}
                />
            </div>
            <div>
                <Button
                    text={"Voir plus"}
                    isWhite={false}
                />
            </div>
        </main>
    )
}