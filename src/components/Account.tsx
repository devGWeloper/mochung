import { useState } from 'react';
import { weddingConfig } from '../config/wedding';
import styles from './Account.module.css';

interface AccountInfoProps {
  title: string;
  account: {
    bank: string;
    number: string;
    holder: string;
  };
}

function AccountInfo({ title, account }: AccountInfoProps) {
  const [copied, setCopied] = useState(false);

  const copyAccount = async () => {
    try {
      await navigator.clipboard.writeText(account.number);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      alert('복사에 실패했습니다.');
    }
  };

  return (
    <div className={styles.accountCard}>
      <p className={styles.accountTitle}>{title}</p>
      <p className={styles.accountHolder}>{account.holder}</p>
      <p className={styles.accountNumber}>
        {account.bank} {account.number}
      </p>
      <button
        className={`${styles.copyButton} ${copied ? styles.copied : ''}`}
        onClick={copyAccount}
      >
        {copied ? '복사됨!' : '복사하기'}
      </button>
    </div>
  );
}

export function Account() {
  const { groom, bride } = weddingConfig;
  const [activeTab, setActiveTab] = useState<'groom' | 'bride'>('groom');

  return (
    <section className={styles.account}>
      <h2 className={styles.sectionTitle}>마음 전하실 곳</h2>

      <p className={styles.description}>
        축하의 마음을 담아 축의금을 전달해 주시면
        <br />
        소중히 간직하겠습니다.
      </p>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'groom' ? styles.active : ''}`}
          onClick={() => setActiveTab('groom')}
        >
          신랑측
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'bride' ? styles.active : ''}`}
          onClick={() => setActiveTab('bride')}
        >
          신부측
        </button>
      </div>

      <div className={styles.accountContent}>
        {activeTab === 'groom' && (
          <AccountInfo title="신랑" account={groom.account} />
        )}
        {activeTab === 'bride' && (
          <AccountInfo title="신부" account={bride.account} />
        )}
      </div>
    </section>
  );
}
