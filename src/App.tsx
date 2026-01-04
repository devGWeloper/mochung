import { Hero } from './components/Hero';
import { Greeting } from './components/Greeting';
import { DateTime } from './components/DateTime';
import { Location } from './components/Location';
import { Gallery } from './components/Gallery';
import { Account } from './components/Account';
import { GuestBook } from './components/GuestBook';
import { weddingConfig } from './config/wedding';

function Footer() {
  const { groom, bride } = weddingConfig;

  return (
    <footer
      style={{
        padding: '40px 24px',
        textAlign: 'center',
        backgroundColor: 'var(--color-bg-light)',
        borderTop: '1px solid var(--color-sage-light)',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1rem',
          color: 'var(--color-text)',
          marginBottom: '8px',
        }}
      >
        {groom.name} & {bride.name}
      </p>
      <p
        style={{
          fontSize: '0.8rem',
          color: 'var(--color-text-light)',
        }}
      >
        Thank you for celebrating with us
      </p>
    </footer>
  );
}

function App() {
  return (
    <div className="container">
      <Hero />
      <Greeting />
      <DateTime />
      <Gallery />
      <Location />
      <Account />
      <GuestBook />
      <Footer />
    </div>
  );
}

export default App;
