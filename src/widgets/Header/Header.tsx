import Link from 'next/link';
import styles from './Header.module.scss';
import { NAV_ITEMS } from '@/widgets/Header/model';

export function Header() {
  return (
    <div className="flex gap-4">
      {NAV_ITEMS.map(({ title, href }) => (
        <Link
          key={title}
          href={href}
          className={`text-white hover:text-blue-200 hover:underline text-2xl`}
        >
          {title}
        </Link>
      ))}
    </div>
  );
}
