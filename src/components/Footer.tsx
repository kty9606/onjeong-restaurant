import Link from 'next/link';
import { restaurantInfo } from '@/data/restaurant';
import { MapPin, Phone, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#241e1b] text-[#c7bcaf] border-t border-[#3d342f] mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="w-9 h-9 rounded-full bg-[#8c5a3c] text-[#faf8f5] flex items-center justify-center font-serif text-lg font-bold">
                溫
              </span>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#faf8f5]">
                {restaurantInfo.name}
              </span>
            </div>
            <p className="text-sm text-[#a89b8d] leading-relaxed">
              {restaurantInfo.subName}
              <br />
              {restaurantInfo.slogan}
            </p>
            <p className="text-xs text-[#7d7164]">
              사업자등록번호: 120-88-00000 | 대표: 김온정
            </p>
          </div>

          {/* Business Hours */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-[#faf8f5] tracking-wider uppercase flex items-center space-x-2">
              <Clock className="w-4 h-4 text-[#c49a7a]" />
              <span>영업 시간</span>
            </h4>
            <ul className="text-sm space-y-1.5 text-[#a89b8d]">
              <li>
                <span className="text-[#faf8f5] font-medium">평일:</span> {restaurantInfo.businessHours.weekday}
              </li>
              <li>
                <span className="text-[#faf8f5] font-medium">주말/공휴일:</span> {restaurantInfo.businessHours.weekend}
              </li>
              <li className="text-xs text-[#c49a7a]">
                브레이크타임: {restaurantInfo.businessHours.breakTime}
              </li>
              <li className="text-xs text-[#c49a7a]">
                라스트오더: {restaurantInfo.businessHours.lastOrder}
              </li>
              <li className="text-xs text-rose-300">
                {restaurantInfo.businessHours.closed}
              </li>
            </ul>
          </div>

          {/* Location & Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-[#faf8f5] tracking-wider uppercase flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-[#c49a7a]" />
              <span>오시는 길 & 문의</span>
            </h4>
            <div className="text-sm text-[#a89b8d] space-y-2">
              <p>
                <span className="text-[#faf8f5] font-medium">{restaurantInfo.address}</span>
                <br />
                <span className="text-xs text-[#7d7164]">{restaurantInfo.addressDetail}</span>
              </p>
              <p className="flex items-center space-x-2 pt-2 text-[#faf8f5]">
                <Phone className="w-4 h-4 text-[#c49a7a]" />
                <a href={`tel:${restaurantInfo.phone}`} className="hover:text-[#c49a7a] transition-colors">
                  {restaurantInfo.phone}
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#3d342f] flex flex-col sm:flex-row items-center justify-between text-xs text-[#7d7164]">
          <p>© 2026 {restaurantInfo.name}. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link href="/" className="hover:text-[#c7bcaf] transition-colors">홈</Link>
            <Link href="/menu" className="hover:text-[#c7bcaf] transition-colors">메뉴</Link>
            <Link href="/reviews" className="hover:text-[#c7bcaf] transition-colors">후기</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
