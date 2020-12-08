import React from 'react';
import Link from 'next/link';

const Home: React.FC = () => (
  <div className="container">
    <h3 className="text-center my-5">一覧表示</h3>
    <div className="my-3">
      <Link href="/create">
        <a>新規登録</a>
      </Link>
    </div>
  </div>
);

export default Home;
