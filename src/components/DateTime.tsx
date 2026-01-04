import { useEffect, useState } from 'react';
import { weddingConfig } from '../config/wedding';
import styles from './DateTime.module.css';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function DateTime() {
  const { wedding, location } = weddingConfig;
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const weddingDate = new Date(`${wedding.date}T${wedding.time}:00`);

    const updateCountdown = () => {
      const now = new Date();
      const diff = weddingDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [wedding.date, wedding.time]);

  const { year, month, day, dayOfWeek } = wedding.calendar;

  // 달력 생성
  const generateCalendar = () => {
    const firstDay = new Date(year, month - 1, 1).getDay();
    const lastDate = new Date(year, month, 0).getDate();
    const weeks: (number | null)[][] = [];
    let week: (number | null)[] = [];

    for (let i = 0; i < firstDay; i++) {
      week.push(null);
    }

    for (let date = 1; date <= lastDate; date++) {
      week.push(date);
      if (week.length === 7) {
        weeks.push(week);
        week = [];
      }
    }

    if (week.length > 0) {
      while (week.length < 7) {
        week.push(null);
      }
      weeks.push(week);
    }

    return weeks;
  };

  const calendar = generateCalendar();
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <section className={styles.datetime}>
      <h2 className={styles.sectionTitle}>예식 일시</h2>

      <div className={styles.info}>
        <p className={styles.date}>
          {year}년 {month}월 {day}일 {dayOfWeek}
        </p>
        <p className={styles.time}>{wedding.time.replace(':', '시 ')}분</p>
        <p className={styles.venue}>
          {location.name} {location.hall}
        </p>
      </div>

      <div className={styles.calendar}>
        <div className={styles.calendarHeader}>
          <span className={styles.monthYear}>
            {year}. {String(month).padStart(2, '0')}
          </span>
        </div>
        <div className={styles.dayNames}>
          {dayNames.map((dayName, i) => (
            <span key={dayName} className={i === 0 ? styles.sunday : i === 6 ? styles.saturday : ''}>
              {dayName}
            </span>
          ))}
        </div>
        <div className={styles.dates}>
          {calendar.map((week, weekIndex) => (
            <div key={weekIndex} className={styles.week}>
              {week.map((date, dateIndex) => (
                <span
                  key={dateIndex}
                  className={`${styles.dateCell} ${
                    date === day ? styles.weddingDay : ''
                  } ${dateIndex === 0 ? styles.sunday : dateIndex === 6 ? styles.saturday : ''}`}
                >
                  {date}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.countdown}>
        <p className={styles.countdownLabel}>결혼식까지</p>
        <div className={styles.countdownBoxes}>
          <div className={styles.countdownBox}>
            <span className={styles.countdownNumber}>{timeLeft.days}</span>
            <span className={styles.countdownUnit}>일</span>
          </div>
          <div className={styles.countdownBox}>
            <span className={styles.countdownNumber}>{timeLeft.hours}</span>
            <span className={styles.countdownUnit}>시간</span>
          </div>
          <div className={styles.countdownBox}>
            <span className={styles.countdownNumber}>{timeLeft.minutes}</span>
            <span className={styles.countdownUnit}>분</span>
          </div>
          <div className={styles.countdownBox}>
            <span className={styles.countdownNumber}>{timeLeft.seconds}</span>
            <span className={styles.countdownUnit}>초</span>
          </div>
        </div>
      </div>
    </section>
  );
}
