import { useEffect, useState, FormEvent } from 'react';
import {
  GuestBookEntry,
  addGuestBookEntry,
  subscribeToGuestBook,
  isFirebaseConfigured,
} from '../lib/firebase';
import styles from './GuestBook.module.css';

// 로컬 스토리지 키
const LOCAL_STORAGE_KEY = 'wedding_guestbook';

// 로컬 스토리지에서 방명록 가져오기
function getLocalEntries(): GuestBookEntry[] {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

// 로컬 스토리지에 방명록 저장
function saveLocalEntry(entry: GuestBookEntry): GuestBookEntry[] {
  const entries = getLocalEntries();
  const newEntry = {
    ...entry,
    id: Date.now().toString(),
    createdAt: new Date(),
  };
  const updated = [newEntry, ...entries];
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function GuestBook() {
  const [entries, setEntries] = useState<GuestBookEntry[]>([]);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isFirebaseConfigured) {
      // Firebase 실시간 구독
      const unsubscribe = subscribeToGuestBook(setEntries);
      return () => unsubscribe();
    } else {
      // Firebase 미설정시 로컬 스토리지 사용
      setEntries(getLocalEntries());
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !password.trim() || !message.trim()) {
      alert('모든 항목을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);

    if (isFirebaseConfigured) {
      const success = await addGuestBookEntry({
        name: name.trim(),
        password: password.trim(),
        message: message.trim(),
      });

      if (success) {
        setName('');
        setPassword('');
        setMessage('');
      } else {
        alert('방명록 작성에 실패했습니다. 다시 시도해주세요.');
      }
    } else {
      // 로컬 스토리지에 저장
      const updated = saveLocalEntry({
        name: name.trim(),
        password: password.trim(),
        message: message.trim(),
        createdAt: new Date(),
      });
      setEntries(updated);
      setName('');
      setPassword('');
      setMessage('');
    }

    setIsSubmitting(false);
  };

  const formatDate = (date: Date | { seconds: number }) => {
    const d = 'seconds' in date ? new Date(date.seconds * 1000) : new Date(date);
    return d.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section className={styles.guestbook}>
      <h2 className={styles.sectionTitle}>방명록</h2>

      <p className={styles.description}>
        신랑 신부에게 축하 메시지를 남겨주세요.
      </p>

      {!isFirebaseConfigured && (
        <p className={styles.notice}>
          * Firebase 미설정으로 브라우저에만 저장됩니다.
        </p>
      )}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputRow}>
          <input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            maxLength={20}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            maxLength={20}
          />
        </div>
        <textarea
          placeholder="축하 메시지를 남겨주세요..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={styles.textarea}
          maxLength={200}
          rows={3}
        />
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? '등록 중...' : '등록하기'}
        </button>
      </form>

      <div className={styles.entries}>
        {entries.length === 0 ? (
          <p className={styles.emptyMessage}>
            첫 번째 축하 메시지를 남겨주세요!
          </p>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className={styles.entry}>
              <div className={styles.entryHeader}>
                <span className={styles.entryName}>{entry.name}</span>
                <span className={styles.entryDate}>
                  {formatDate(entry.createdAt as Date | { seconds: number })}
                </span>
              </div>
              <p className={styles.entryMessage}>{entry.message}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
