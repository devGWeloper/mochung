export const weddingConfig = {
  // 신랑 정보
  groom: {
    name: '김철수',
    englishName: 'Cheolsu',
    phone: '010-1234-5678',
    father: { name: '김아버지', phone: '010-0000-0000' },
    mother: { name: '김어머니', phone: '010-0000-0000' },
    account: {
      bank: '신한은행',
      number: '110-123-456789',
      holder: '김철수',
    },
  },

  // 신부 정보
  bride: {
    name: '이영희',
    englishName: 'Younghee',
    phone: '010-8765-4321',
    father: { name: '이아버지', phone: '010-0000-0000' },
    mother: { name: '이어머니', phone: '010-0000-0000' },
    account: {
      bank: '국민은행',
      number: '123-45-6789012',
      holder: '이영희',
    },
  },

  // 결혼식 정보
  wedding: {
    date: '2025-05-10',
    time: '14:00',
    calendar: {
      year: 2025,
      month: 5,
      day: 10,
      dayOfWeek: '토요일',
    },
  },

  // 예식장 정보
  location: {
    name: '더채플앳청담',
    hall: '그랜드볼룸 3층',
    address: '서울특별시 강남구 청담동 123-45',
    addressDetail: '청담역 2번 출구에서 도보 5분',
    lat: 37.5234,
    lng: 127.0474,
    tel: '02-1234-5678',
    parking: '건물 지하 주차장 이용 가능 (2시간 무료)',
    bus: '146, 301, 472번',
    subway: '7호선 청담역 2번 출구',
  },

  // 인사말
  greeting: {
    title: '소중한 분들을 초대합니다',
    message: `서로 다른 길을 걸어온 저희 두 사람이
만나 사랑으로 하나가 되려 합니다.

함께하는 기쁨과 따뜻한 마음으로
새로운 시작을 축복해 주시면
더없는 기쁨으로 간직하겠습니다.`,
  },

  // 갤러리 이미지
  gallery: [
    '/images/gallery-1.jpg',
    '/images/gallery-2.jpg',
    '/images/gallery-3.jpg',
    '/images/gallery-4.jpg',
    '/images/gallery-5.jpg',
    '/images/gallery-6.jpg',
  ],

  // 메인 이미지
  mainImage: '/images/main.jpg',

  // 카카오 공유 정보
  kakaoShare: {
    title: '철수 ♥ 영희 결혼합니다',
    description: '2025년 5월 10일 토요일 오후 2시\n더채플앳청담',
  },
};

export type WeddingConfig = typeof weddingConfig;
