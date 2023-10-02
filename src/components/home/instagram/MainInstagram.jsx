import InstagramItem from "@/components/home/instagram/InstagramItem";
import styles from './MainInstagram.module.scss';
import {useEffect, useState} from "react";

export default function MainInstagram() {
    const images = [
        '/assets/img/login/login1.jpg',
        '/assets/img/login/login2.jpg',
        '/assets/img/login/login3.jpg',
        '/assets/img/login/login4.jpg',
        '/assets/img/login/login5.jpg',
        '/assets/img/login/login6.jpg',
        '/assets/img/login/login1.jpg',
        '/assets/img/login/login2.jpg',
        '/assets/img/login/login3.jpg',
        '/assets/img/login/login4.jpg',
        '/assets/img/login/login5.jpg',
        '/assets/img/login/login6.jpg',
    ];

    const [gridStyle, setGridStyle] = useState({});
    const [layoutTypes, setLayoutTypes] = useState([]);

    const generateRandomGrid = () => {

        const layouts = [
            ['1x2', '1x2', '2x2', '3x1', '1x1', '1x1', '1x1', '1x1', '1x1', '1x1', '2x2', '1x1'],
            ['1x2', '1x2', '2x2', '2x1', '1x1', '1x1', '1x1', '2x1', '1x1', '1x1', '1x1', '2x2', '1x1'],
        ];

        const chosenLayout = layouts[Math.floor(Math.random() * layouts.length)];

        return {
            gridTemplateRows: `repeat(2, 1fr)`,
            gridTemplateColumns: `repeat(4, 1fr)`,
            layoutTypes: chosenLayout
        };
    }

    useEffect(() => {
        const {gridTemplateRows, gridTemplateColumns, layoutTypes} = generateRandomGrid();
        setGridStyle({
            gridTemplateRows,
            gridTemplateColumns
        });
        setLayoutTypes(layoutTypes);
    }, []);

    return (
        <main className={styles.main} style={gridStyle}>
            {images.map((src, index) => (
                <InstagramItem
                    key={index}
                    src={src}
                    layoutType={layoutTypes[index] || '1x1'}
                    href={"#"}
                />
            ))}
        </main>
    );
}
