import Link from 'next/link';
import React from 'react';

const NavLinks = ({ extraClassName }) => {
    return (
        <ul className={`navigation ${extraClassName}`}>
            <li className="current"><Link href="/">Home</Link></li>
            <li><Link href="/page-about">About</Link></li>
            <li><Link href="/page-courses">Courses</Link></li>
            <li><Link href="/page-pricing">Pricing</Link></li>
            <li><Link href="/page-faq">FAQ</Link></li>
            <li><Link href="/page-contact">Contact</Link></li>
        </ul>
    );
};

export default NavLinks;