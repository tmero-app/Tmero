'use client';

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

const NavLinks = ({ extraClassName }) => {
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/page-about' },
    { label: 'Courses', href: '/page-courses' },
    { label: 'Pricing', href: '/page-pricing' },
    { label: 'FAQ', href: '/page-faq' },
    { label: 'Contact', href: '/page-contact' },
  ];

  return (
    <ul className={`navigation ${extraClassName}`}>
      {navItems.map(({ label, href }) => (
        <li key={href} className={pathname === href ? 'current' : ''}>
          <Link href={href}>{label}</Link>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
