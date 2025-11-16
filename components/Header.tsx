'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';

const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navLinkClasses =
    'px-4 py-2 rounded-lg text-sm font-bold transition-colors duration-300 cursor-pointer';
  const activeLinkClasses = 'bg-[#A3B18A]/20 text-[#EAEAEA]';
  const inactiveLinkClasses = 'text-[#EAEAEA]/60 hover:text-[#EAEAEA] hover:bg-[#A3B18A]/10';

  const isHome = pathname === '/';
  const isCanvas = pathname === '/canvas';

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between backdrop-blur-md bg-[#1C1C1E]/70 border-b border-[#A3B18A]/10"
      aria-label="Site Navigation"
    >
      {/* Logo / Brand */}
      <button
        onClick={() => router.push('/')}
        className="text-xl font-medium text-[#EAEAEA] tracking-wide hover:text-[#A3B18A] transition-colors duration-300 rounded-lg px-2 py-1"
        style={{ fontFamily: 'var(--font-inter)' }}
      >
        Echo Canvas
      </button>

      {/* Navigation */}
      <nav>
        <ul className="flex items-center gap-2">
          <li>
            <button
              onClick={() => router.push('/')}
              className={`${navLinkClasses} ${isHome ? activeLinkClasses : inactiveLinkClasses}`}
              aria-current={isHome ? 'page' : undefined}
              style={{ fontFamily: 'var(--font-source-sans)' }}
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => router.push('/canvas')}
              className={`${navLinkClasses} ${isCanvas ? activeLinkClasses : inactiveLinkClasses}`}
              aria-current={isCanvas ? 'page' : undefined}
              style={{ fontFamily: 'var(--font-source-sans)' }}
            >
              The Canvas
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
