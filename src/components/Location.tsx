import { useEffect, useRef } from 'react';
import { weddingConfig } from '../config/wedding';
import styles from './Location.module.css';

declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        Map: new (container: HTMLElement, options: object) => unknown;
        LatLng: new (lat: number, lng: number) => unknown;
        Marker: new (options: object) => unknown;
      };
    };
  }
}

export function Location() {
  const { location } = weddingConfig;
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_KAKAO_APP_KEY&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        if (!mapRef.current) return;

        const position = new window.kakao.maps.LatLng(location.lat, location.lng);
        const map = new window.kakao.maps.Map(mapRef.current, {
          center: position,
          level: 3,
        });

        new window.kakao.maps.Marker({
          map,
          position,
        });
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [location.lat, location.lng]);

  const openKakaoMap = () => {
    window.open(
      `https://map.kakao.com/link/map/${encodeURIComponent(location.name)},${location.lat},${location.lng}`,
      '_blank'
    );
  };

  const openNaverMap = () => {
    window.open(
      `https://map.naver.com/v5/search/${encodeURIComponent(location.address)}`,
      '_blank'
    );
  };

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(location.address);
      alert('주소가 복사되었습니다.');
    } catch {
      alert('주소 복사에 실패했습니다.');
    }
  };

  return (
    <section className={styles.location}>
      <h2 className={styles.sectionTitle}>오시는 길</h2>

      <div className={styles.venueInfo}>
        <h3 className={styles.venueName}>{location.name}</h3>
        <p className={styles.venueHall}>{location.hall}</p>
        <p className={styles.address}>{location.address}</p>
        {location.addressDetail && (
          <p className={styles.addressDetail}>{location.addressDetail}</p>
        )}
        <p className={styles.tel}>Tel. {location.tel}</p>
      </div>

      <div ref={mapRef} className={styles.map}>
        <div className={styles.mapPlaceholder}>
          <p>지도를 표시하려면</p>
          <p>카카오맵 API 키를 설정해주세요</p>
        </div>
      </div>

      <div className={styles.mapButtons}>
        <button className={styles.mapButton} onClick={openKakaoMap}>
          카카오맵
        </button>
        <button className={styles.mapButton} onClick={openNaverMap}>
          네이버지도
        </button>
        <button className={styles.mapButton} onClick={copyAddress}>
          주소복사
        </button>
      </div>

      <div className={styles.transport}>
        {location.subway && (
          <div className={styles.transportItem}>
            <span className={styles.transportIcon}>🚇</span>
            <div className={styles.transportInfo}>
              <span className={styles.transportLabel}>지하철</span>
              <span className={styles.transportDetail}>{location.subway}</span>
            </div>
          </div>
        )}
        {location.bus && (
          <div className={styles.transportItem}>
            <span className={styles.transportIcon}>🚌</span>
            <div className={styles.transportInfo}>
              <span className={styles.transportLabel}>버스</span>
              <span className={styles.transportDetail}>{location.bus}</span>
            </div>
          </div>
        )}
        {location.parking && (
          <div className={styles.transportItem}>
            <span className={styles.transportIcon}>🚗</span>
            <div className={styles.transportInfo}>
              <span className={styles.transportLabel}>주차</span>
              <span className={styles.transportDetail}>{location.parking}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
