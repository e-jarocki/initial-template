'use client';

import Link from 'next/link';
import { NAV_ITEMS } from '@/widgets/Header/model';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();

  return (
    <div className="flex gap-4">
      {NAV_ITEMS.map(({ title, href }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={title}
            href={href}
            className={`text-2xl ${
              isActive
                ? 'text-blue-400 underline'
                : 'text-white hover:text-blue-200 hover:underline'
            }`}
          >
            {title}
          </Link>
        );
      })}
    </div>
  );
}
