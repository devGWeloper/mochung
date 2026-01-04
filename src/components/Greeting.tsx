import { weddingConfig } from '../config/wedding';
import styles from './Greeting.module.css';

export function Greeting() {
  const { greeting, groom, bride } = weddingConfig;

  return (
    <section className={styles.greeting}>
      <div className={styles.divider}>
        <span>&#10047;</span>
      </div>

      <h2 className={styles.title}>{greeting.title}</h2>

      <p className={styles.message}>{greeting.message}</p>

      <div className={styles.parents}>
        <div className={styles.parentRow}>
          <span className={styles.parentNames}>
            {groom.father.name} · {groom.mother.name}
          </span>
          <span className={styles.relation}>의 아들</span>
          <span className={styles.childName}>{groom.name}</span>
        </div>
        <div className={styles.parentRow}>
          <span className={styles.parentNames}>
            {bride.father.name} · {bride.mother.name}
          </span>
          <span className={styles.relation}>의 딸</span>
          <span className={styles.childName}>{bride.name}</span>
        </div>
      </div>
    </section>
  );
}
