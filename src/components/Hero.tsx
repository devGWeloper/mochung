import { weddingConfig } from '../config/wedding';
import styles from './Hero.module.css';

export function Hero() {
  const { groom, bride, wedding } = weddingConfig;
  const { year, month, day, dayOfWeek } = wedding.calendar;

  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <p className={styles.date}>
          {year}.{String(month).padStart(2, '0')}.{String(day).padStart(2, '0')} {dayOfWeek}
        </p>

        <div className={styles.names}>
          <span className={styles.name}>{groom.name}</span>
          <span className={styles.and}>&</span>
          <span className={styles.name}>{bride.name}</span>
        </div>

        <div className={styles.floral}>
          <svg viewBox="0 0 100 40" className={styles.floralSvg}>
            <path
              d="M10 20 Q25 5 40 20 Q50 30 60 20 Q75 5 90 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            />
            <circle cx="50" cy="20" r="3" fill="currentColor" />
            <path d="M47 17 Q50 10 53 17" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <path d="M44 20 Q40 20 44 24" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <path d="M56 20 Q60 20 56 24" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>

        <p className={styles.venue}>{weddingConfig.location.name}</p>
      </div>
    </section>
  );
}
