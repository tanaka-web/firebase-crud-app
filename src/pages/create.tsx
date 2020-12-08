import React from 'react';
import Link from 'next/link';

class Create extends React.Component {
  render() {
    return (
      <div className="container">
        <h3 className="text-center my-5">新規作成</h3>
        <div className="text-right my-3">
          <Link href="/">
            <a>一覧へ戻る</a>
          </Link>
        </div>
      </div>
    );
  }
}

export default Create;
