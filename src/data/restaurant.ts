export interface MenuItem {
  id: string;
  name: string;
  category: 'meal' | 'side' | 'drink';
  price: number;
  description: string;
  image: string;
  isSignature?: boolean;
  isPopular?: boolean;
}

export interface RestaurantInfo {
  name: string;
  subName: string;
  slogan: string;
  description: string;
  story: string;
  address: string;
  addressDetail: string;
  phone: string;
  businessHours: {
    weekday: string;
    weekend: string;
    breakTime: string;
    lastOrder: string;
    closed: string;
  };
  features: {
    title: string;
    description: string;
    icon: string;
  }[];
}

export const restaurantInfo: RestaurantInfo = {
  name: '온정 (溫庭)',
  subName: '따뜻한 온기를 나누는 모던 한식 다이닝',
  slogan: '자연에서 온 정직한 식재료, 정성을 담은 따스한 한 상',
  description:
    '온정은 매일 아침 엄선한 제철 식재료와 직접 달인 비법 양념으로 정갈한 한국의 맛을 현대적인 감각으로 재해석하여 선보입니다.',
  story:
    '바쁜 일상 속, 따뜻한 밥 한 끼가 주는 위로는 무엇보다 큽니다. 온정(溫庭)은 "따뜻한 정원"이라는 뜻으로, 소중한 사람들과 편안하게 마주 앉아 정성 가득한 온기를 나누실 수 있도록 공간과 요리를 빚어냅니다.',
  address: '서울특별시 종로구 삼청로 88-1',
  addressDetail: '안국역 1번 출구 도보 8분 (매장 앞 전용 주차 발렛 가능)',
  phone: '02-738-2026',
  businessHours: {
    weekday: '11:30 - 21:30',
    weekend: '11:00 - 22:00',
    breakTime: '15:00 - 17:00 (주말 브레이크타임 없음)',
    lastOrder: '20:45',
    closed: '매주 월요일 정기 휴무',
  },
  features: [
    {
      title: '산지 직송 제철 식재료',
      description: '전국 각지의 산지에서 직접 엄선한 제철 채소와 청정 식재료만을 고집합니다.',
      icon: 'Sprout',
    },
    {
      title: '당일 도정한 햅쌀 솥밥',
      description: '주문 즉시 지어내는 갓 지은 솥밥으로 고슬고슬한 밥맛의 본질을 살립니다.',
      icon: 'UtensilsCrossed',
    },
    {
      title: '전통 비법과 현대적 재해석',
      description: '3대째 내려오는 천연 발효장과 현대적인 조리 기법의 조화로운 미식 경험을 전합니다.',
      icon: 'Award',
    },
    {
      title: '아늑하고 정갈한 공간',
      description: '원목과 한지 조명의 따스한 무드 속에서 프라이빗하고 편안한 식사를 즐기실 수 있습니다.',
      icon: 'Home',
    },
  ],
};

export const menuCategories = [
  { id: 'all', label: '전체 메뉴' },
  { id: 'meal', label: '식사 반상' },
  { id: 'side', label: '일품 & 곁들임' },
  { id: 'drink', label: '전통주 & 음료' },
] as const;

export const menuItems: MenuItem[] = [
  {
    id: 'm1',
    name: '온정 영양 갈비찜 솥밥 반상',
    category: 'meal',
    price: 26000,
    description: '특제 배즙 간장 양념으로 48시간 숙성하여 부드러운 소갈비찜과 유기농 영양 솥밥 반상',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    isSignature: true,
    isPopular: true,
  },
  {
    id: 'm2',
    name: '자연송이 전복 솥밥 한 상',
    category: 'meal',
    price: 24000,
    description: '완도산 활전복과 은은한 향의 자연산 송이버섯을 통째로 얹어 지은 보양 솥밥',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    isSignature: true,
  },
  {
    id: 'm3',
    name: '제주 흑돼지 직화 제육 반상',
    category: 'meal',
    price: 18000,
    description: '제주 흑돼지를 참숯 직화로 불향 가득 구워낸 감칠맛 넘치는 시그니처 밥도둑 반상',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
  },
  {
    id: 'm4',
    name: '한우 차돌 달래 된장 뚝배기',
    category: 'meal',
    price: 17000,
    description: '구수한 전통 재래 된장에 고소한 1++ 한우 차돌박이와 향긋한 제철 달래를 듬뿍 넣은 뚝배기',
    image: 'https://images.unsplash.com/photo-1547496502-affa22d38842?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 's1',
    name: '한우 육전과 미나리 무침',
    category: 'side',
    price: 22000,
    description: '부드러운 한우 우둔살에 얇게 계란 옷을 입혀 부쳐내고 아삭한 청도 미나리를 곁들인 별미',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80',
    isSignature: true,
    isPopular: true,
  },
  {
    id: 's2',
    name: '해물 가득 바삭 파전',
    category: 'side',
    price: 20000,
    description: '신선한 통오징어, 새우, 조갯살과 알싸한 쪽파를 겉은 바삭하고 속은 촉촉하게 부쳐낸 전',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
  },
  {
    id: 's3',
    name: '들기름 명란 감자채전',
    category: 'side',
    price: 16000,
    description: '고소한 저온 압착 들기름에 곱게 채 썬 햇감자와 저염 백명란을 올려 노릇하게 구워낸 전',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 's4',
    name: '수제 숯불 떡갈비 구이 (2pcs)',
    category: 'side',
    price: 19000,
    description: '국내산 소고기와 돼지고기를 굵게 다져 숯불에 정성스레 구워 육즙이 가득한 전통 떡갈비',
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'd1',
    name: '나루 생막걸리 (6%)',
    category: 'drink',
    price: 9000,
    description: '서울 한강주조의 대표 프리미엄 탁주. 부드러운 목넘김과 자연스러운 단맛이 일품입니다.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
  },
  {
    id: 'd2',
    name: '함양 솔송주 (13%)',
    category: 'drink',
    price: 15000,
    description: '하동 정씨 가문의 500년 전통주. 송순과 솔잎 향이 깃든 맑고 그윽한 약주입니다.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'd3',
    name: '수제 문경 오미자 & 매실 에이드',
    category: 'drink',
    price: 6000,
    description: '문경 오미자 청과 광양 유기농 매실 원액에 탄산수를 더해 상큼하고 깔끔한 청량음료',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'd4',
    name: '전통 엿기름 수제 식혜',
    category: 'drink',
    price: 5000,
    description: '국산 엿기름으로 10시간 이상 정성껏 삭혀 은은하고 깊은 단맛을 살린 전통 음료',
    image: 'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?auto=format&fit=crop&w=800&q=80',
  },
];
