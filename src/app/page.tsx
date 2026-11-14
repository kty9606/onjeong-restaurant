import Link from 'next/link';
import { restaurantInfo, menuItems } from '@/data/restaurant';
import {
  UtensilsCrossed,
  ArrowRight,
  Clock,
  MapPin,
  Phone,
  Sparkles,
  Heart,
  Star,
  Award,
  Sprout,
  Home as HomeIcon,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Sprout,
  UtensilsCrossed,
  Award,
  Home: HomeIcon,
};

export default function HomePage() {
  const signatureMenus = menuItems.filter((item) => item.isSignature).slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative h-[85vh] min-h-[560px] max-h-[780px] flex items-center justify-center text-center overflow-hidden">
        {/* Background Image with warm overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1920&q=85')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#1b1512]/75 via-[#2b241f]/70 to-[#1b1512]/90 backdrop-blur-[1px]" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-white space-y-6">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#8c5a3c]/70 border border-[#c49a7a]/40 text-xs tracking-widest text-[#f5ede4] uppercase backdrop-blur-sm animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-[#e6b98e]" />
            <span>Modern Korean Dining</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#faf8f5] leading-tight">
            따뜻한 뜰에서 피어나는
            <br />
            <span className="text-[#e2b793] font-serif">정갈한 한국의 맛</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#ded3c7] leading-relaxed font-light">
            {restaurantInfo.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/menu"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-full bg-[#8c5a3c] hover:bg-[#72452b] text-white text-sm font-semibold tracking-wide shadow-lg hover:shadow-xl transition-all"
            >
              <span>메뉴 둘러보기</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/reviews"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-[#faf8f5] border border-white/20 text-sm font-semibold tracking-wide backdrop-blur-sm transition-all"
            >
              <Heart className="w-4 h-4 text-[#e2b793]" />
              <span>방문 후기 작성하기</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Brand Story & Values */}
      <section className="py-20 lg:py-28 bg-[#faf8f5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-semibold tracking-widest text-[#8c5a3c] uppercase">
              Brand Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2b241f]">
              정성과 마음을 담아 차려낸 한 상
            </h2>
            <div className="w-12 h-0.5 bg-[#8c5a3c] mx-auto my-3" />
            <p className="text-[#695d55] text-sm sm:text-base leading-relaxed">
              {restaurantInfo.story}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {restaurantInfo.features.map((feat, idx) => {
              const IconComponent = iconMap[feat.icon] || Award;
              return (
                <div
                  key={idx}
                  className="bg-white p-7 rounded-2xl border border-[#ede5dc] shadow-sm hover:shadow-md transition-shadow space-y-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#f4ece4] flex items-center justify-center text-[#8c5a3c]">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#2b241f]">{feat.title}</h3>
                  <p className="text-xs sm:text-sm text-[#73665c] leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Signature Menus Preview */}
      <section className="py-20 bg-[#f5ede4]/50 border-y border-[#e8dfd5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-semibold tracking-widest text-[#8c5a3c] uppercase">
                Signature Selection
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2b241f] mt-1">
                온정의 대표 시그니처 메뉴
              </h2>
            </div>
            <Link
              href="/menu"
              className="inline-flex items-center space-x-1.5 text-sm font-semibold text-[#8c5a3c] hover:text-[#5e3b25] mt-4 md:mt-0 group"
            >
              <span>전체 메뉴 보러가기</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {signatureMenus.map((menu) => (
              <div
                key={menu.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#e8dfd5] shadow-sm hover:shadow-lg transition-all group flex flex-col"
              >
                <div className="relative h-56 overflow-hidden bg-stone-100">
                  <img
                    src={menu.image}
                    alt={menu.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-[#8c5a3c] text-white text-xs px-3 py-1 rounded-full font-medium shadow-sm">
                    대표 메뉴
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-start justify-between">
                      <h3 className="font-serif text-lg font-bold text-[#2b241f] group-hover:text-[#8c5a3c] transition-colors">
                        {menu.name}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-[#73665c] mt-2 line-clamp-2 leading-relaxed">
                      {menu.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#f0e7dd] flex items-center justify-between">
                    <span className="text-xs text-[#8c5a3c] font-medium">1인 반상 기준</span>
                    <span className="font-bold text-lg text-[#2b241f]">
                      {menu.price.toLocaleString()}원
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Location & Business Hours Info */}
      <section className="py-20 lg:py-28 bg-[#faf8f5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-[#ede5dc] p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold tracking-widest text-[#8c5a3c] uppercase">
                  Visit Us
                </span>
                <h2 className="font-serif text-3xl font-bold text-[#2b241f] mt-1">
                  온정 찾아오시는 길
                </h2>
                <p className="text-sm text-[#73665c] mt-2">
                  정갈한 휴식과 따뜻한 밥상이 준비되어 있습니다. 편안하게 걸음해 주세요.
                </p>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-start space-x-3.5">
                  <MapPin className="w-5 h-5 text-[#8c5a3c] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#2b241f]">{restaurantInfo.address}</p>
                    <p className="text-xs text-[#73665c] mt-0.5">{restaurantInfo.addressDetail}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5">
                  <Clock className="w-5 h-5 text-[#8c5a3c] shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-semibold text-[#2b241f]">
                      평일 {restaurantInfo.businessHours.weekday} / 주말 {restaurantInfo.businessHours.weekend}
                    </p>
                    <p className="text-xs text-[#73665c]">
                      브레이크타임: {restaurantInfo.businessHours.breakTime} (라스트오더: {restaurantInfo.businessHours.lastOrder})
                    </p>
                    <p className="text-xs text-rose-500 font-medium">
                      {restaurantInfo.businessHours.closed}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3.5">
                  <Phone className="w-5 h-5 text-[#8c5a3c] shrink-0" />
                  <p className="font-semibold text-[#2b241f]">
                    문의 전화:{' '}
                    <a href={`tel:${restaurantInfo.phone}`} className="text-[#8c5a3c] hover:underline">
                      {restaurantInfo.phone}
                    </a>
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={`tel:${restaurantInfo.phone}`}
                  className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-[#8c5a3c] text-white text-xs font-semibold hover:bg-[#72452b] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>전화 문의 및 단체 예약</span>
                </a>
                <Link
                  href="/reviews"
                  className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-[#f4ece4] text-[#8c5a3c] text-xs font-semibold hover:bg-[#ebdccf] transition-colors"
                >
                  <Star className="w-3.5 h-3.5 fill-[#8c5a3c]" />
                  <span>손님 후기 보기</span>
                </Link>
              </div>
            </div>

            {/* Visual Photo Card */}
            <div className="relative rounded-2xl overflow-hidden shadow-md aspect-[4/3] bg-stone-100">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80"
                alt="온정 매장 인테리어"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                <p className="text-white text-xs sm:text-sm font-light">
                  &quot;정갈하고 아늑한 분위기 속에서 즐기는 편안한 한 끼 식사&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
