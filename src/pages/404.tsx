import React from 'react';
import Link from 'next/link';

const Custom404 = () => (
  <div className="container">
    <h3 className="text-center my-5">Page not found.</h3>
    <div className="text-center">
      <Link href="/users">
        <a>トップページへ</a>
      </Link>
    </div>
  </div>
);
export default Custom404;
