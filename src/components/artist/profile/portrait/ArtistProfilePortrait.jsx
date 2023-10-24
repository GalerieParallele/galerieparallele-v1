import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import {EffectCoverflow, Pagination} from "swiper/modules";
import Image from "next/image";

import styles from './ArtistProfilePortrait.module.scss'

export default function ArtistProfilePortrait() {
    return (
        <div className={styles.main}>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={3}
                fadeEffect={{crossFade: true}}
                loop={true}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={false}
                modules={[EffectCoverflow, Pagination]}
            >
                {[...Array(8)].map((_, index) => (
                    <SwiperSlide key={index} style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Image
                            src={`https://picsum.photos/200/300?random=${index}`} alt="artist"
                            width={200}
                            height={300}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
