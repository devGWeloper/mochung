import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { weddingConfig } from '../config/wedding';
import styles from './Gallery.module.css';

export function Gallery() {
  const { gallery } = weddingConfig;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openLightbox = (image: string) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = '';
  };

  return (
    <section className={styles.gallery}>
      <h2 className={styles.sectionTitle}>갤러리</h2>

      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={12}
        slidesPerView={1.2}
        centeredSlides
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className={styles.swiper}
      >
        {gallery.map((image, index) => (
          <SwiperSlide key={index}>
            <div
              className={styles.slide}
              onClick={() => openLightbox(image)}
            >
              <img
                src={image}
                alt={`웨딩 사진 ${index + 1}`}
                className={styles.image}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://placehold.co/400x500/F5F0E8/8B9D83?text=Photo+${index + 1}`;
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={styles.grid}>
        {gallery.slice(0, 6).map((image, index) => (
          <div
            key={index}
            className={styles.gridItem}
            onClick={() => openLightbox(image)}
          >
            <img
              src={image}
              alt={`웨딩 사진 ${index + 1}`}
              className={styles.gridImage}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://placehold.co/200x200/F5F0E8/8B9D83?text=${index + 1}`;
              }}
            />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <button className={styles.closeButton} onClick={closeLightbox}>
            ×
          </button>
          <img
            src={selectedImage}
            alt="확대 이미지"
            className={styles.lightboxImage}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://placehold.co/600x800/F5F0E8/8B9D83?text=Photo';
            }}
          />
        </div>
      )}
    </section>
  );
}
