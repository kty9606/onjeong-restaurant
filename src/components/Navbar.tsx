'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Utensils, MessageSquareHeart, Home, Phone, Menu as MenuIcon, X } from 'lucide-react';
import { useState } from 'react';
import { restaurantInfo } from '@/data/restaurant';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: '홈', icon: Home },
    { href: '/menu', label: '메뉴 안내', icon: Utensils },
    { href: '/reviews', label: '방문 후기', icon: MessageSquareHeart },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#faf8f5]/95 backdrop-blur-md border-b border-[#e8dfd5] transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <span className="w-10 h-10 rounded-full bg-[#8c5a3c] text-[#faf8f5] flex items-center justify-center font-serif text-xl font-bold shadow-sm transition-transform group-hover:scale-105">
              溫
            </span>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-[#2b241f] leading-none">
                {restaurantInfo.name}
              </span>
              <span className="text-xs text-[#8c5a3c] tracking-widest mt-1 font-medium">
                KOREAN DINING
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#8c5a3c] text-white shadow-sm'
                      : 'text-[#594d46] hover:text-[#2b241f] hover:bg-[#ede5dc]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Call / Action */}
          <div className="hidden sm:flex items-center space-x-3">
            <a
              href={`tel:${restaurantInfo.phone}`}
              className="inline-flex items-center space-x-2 text-xs font-medium text-[#8c5a3c] bg-[#f4ece4] hover:bg-[#ede2d6] border border-[#dfd2c4] px-3.5 py-2 rounded-full transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#8c5a3c]" />
              <span>{restaurantInfo.phone}</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#594d46] hover:bg-[#ede5dc] transition-colors"
            aria-label="메뉴 열기"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#e8dfd5] bg-[#faf8f5] px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-[#8c5a3c] text-white'
                    : 'text-[#594d46] hover:bg-[#ede5dc] hover:text-[#2b241f]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{link.label}</span>
              </Link>
            );
          })}
          <div className="pt-3 border-t border-[#e8dfd5]">
            <a
              href={`tel:${restaurantInfo.phone}`}
              className="flex items-center justify-center space-x-2 w-full py-2.5 rounded-xl text-sm font-medium text-[#8c5a3c] bg-[#f4ece4] border border-[#dfd2c4]"
            >
              <Phone className="w-4 h-4" />
              <span>매장 전화 연결 ({restaurantInfo.phone})</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
