import { initializeApp, FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  Firestore,
  Timestamp,
} from 'firebase/firestore';

// Firebase 설정 - 실제 사용시 본인의 Firebase 프로젝트 설정으로 변경
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

// Firebase 초기화 (설정이 유효한 경우에만)
const isFirebaseConfigured = !firebaseConfig.apiKey.startsWith('YOUR_');

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  } catch (error) {
    console.error('Firebase 초기화 실패:', error);
  }
}

export interface GuestBookEntry {
  id?: string;
  name: string;
  password: string;
  message: string;
  createdAt: Timestamp | Date;
}

// 방명록 메시지 추가
export async function addGuestBookEntry(
  entry: Omit<GuestBookEntry, 'id' | 'createdAt'>
): Promise<boolean> {
  if (!db) {
    console.warn('Firebase가 설정되지 않았습니다.');
    return false;
  }

  try {
    await addDoc(collection(db, 'guestbook'), {
      ...entry,
      createdAt: Timestamp.now(),
    });
    return true;
  } catch (error) {
    console.error('방명록 작성 실패:', error);
    return false;
  }
}

// 방명록 실시간 구독
export function subscribeToGuestBook(
  callback: (entries: GuestBookEntry[]) => void
): () => void {
  if (!db) {
    console.warn('Firebase가 설정되지 않았습니다.');
    callback([]);
    return () => {};
  }

  const q = query(collection(db, 'guestbook'), orderBy('createdAt', 'desc'));

  return onSnapshot(q, (snapshot) => {
    const entries: GuestBookEntry[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as GuestBookEntry[];
    callback(entries);
  });
}

export { db, isFirebaseConfigured };
