'use client';

import { useState } from 'react';
import { menuItems, menuCategories, MenuItem } from '@/data/restaurant';
import { Sparkles, Flame, Info } from 'lucide-react';

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredItems =
    selectedCategory === 'all'
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="py-12 sm:py-16 lg:py-20 bg-[#faf8f5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-semibold tracking-widest text-[#8c5a3c] uppercase">
            Our Menu
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2b241f]">
            정성을 담은 온정의 차림표
          </h1>
          <div className="w-12 h-0.5 bg-[#8c5a3c] mx-auto my-3" />
          <p className="text-sm sm:text-base text-[#73665c] leading-relaxed">
            신선한 제철 식재료와 직접 달인 천연 양념으로 빚어내는 모던 한식 차림입니다.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {menuCategories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  isSelected
                    ? 'bg-[#8c5a3c] text-white shadow-md'
                    : 'bg-white text-[#594d46] hover:bg-[#ede5dc] border border-[#e8dfd5]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item: MenuItem) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#e8dfd5] shadow-sm hover:shadow-md transition-all flex flex-col group"
            >
              {/* Image */}
              <div className="relative h-60 overflow-hidden bg-stone-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  {item.isSignature && (
                    <span className="inline-flex items-center space-x-1 bg-[#8c5a3c] text-white text-xs px-2.5 py-1 rounded-full font-medium shadow-sm">
                      <Sparkles className="w-3 h-3" />
                      <span>시그니처</span>
                    </span>
                  )}
                  {item.isPopular && (
                    <span className="inline-flex items-center space-x-1 bg-amber-600 text-white text-xs px-2.5 py-1 rounded-full font-medium shadow-sm">
                      <Flame className="w-3 h-3" />
                      <span>인기</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-serif text-lg font-bold text-[#2b241f] group-hover:text-[#8c5a3c] transition-colors">
                      {item.name}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#73665c] mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#f0e7dd] flex items-center justify-between">
                  <span className="text-xs text-[#9c8e82]">
                    {item.category === 'meal'
                      ? '기본 솥밥 및 찬 4종 포함'
                      : item.category === 'drink'
                      ? '전통주 / 음료'
                      : '단품 요리'}
                  </span>
                  <span className="font-bold text-lg text-[#2b241f]">
                    {item.price.toLocaleString()}원
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Origin & Notice Banner */}
        <div className="mt-16 bg-[#f4ece4] border border-[#e2d5c7] rounded-2xl p-6 sm:p-8 flex items-start space-x-4">
          <Info className="w-5 h-5 text-[#8c5a3c] shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-[#665a50] space-y-1.5 leading-relaxed">
            <p className="font-semibold text-[#2b241f]">원산지 및 식재료 안내</p>
            <p>
              • 쌀: 국내산 (당일 도정 유기농 햅쌀) | 소고기(갈비찜, 차돌): 국내산 한우(1++) 및 호주산 청정우
            </p>
            <p>
              • 돼지고기: 제주 흑돼지 (국내산) | 닭고기: 국내산 | 배추/고춧가루: 국내산 영양초
            </p>
            <p className="text-xs text-[#8c5a3c]">
              * 특정 식재료에 대한 알레르기가 있으신 경우 주문 전 직원에게 미리 말씀해 주시면 대체 조리해 드립니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
