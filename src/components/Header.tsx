import React from 'react';
import Link from 'next/link';

type Props = {
  pathname?: string;
};

const Header: React.FC<Props> = ({ pathname }) => (
  <header>
    <Link href="/users">
      <a className={pathname === '/' ? 'is-active' : ''}>Home</a>
    </Link>
  </header>
);

export default Header;
