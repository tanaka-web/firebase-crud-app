import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';

import { db } from '../../plugins/firebase';

const Index: React.FC = () => {
  const [list, setList] = useState<any>();

  const getData = useCallback(() => {
    const getDocs = async () => {
      const snapshots = await db.collection('members').get();
      const _docs = await snapshots.docs?.map((doc) => ({ id: doc.id, data: doc.data() }));
      setList(_docs);
    };
    getDocs();
  }, []);

  const onCollectionUpdate = useCallback((querySnapshot) => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      <h3 className="text-center my-5">一覧表示</h3>
      <div className="my-3">
        <Link href="/users/create">新規登録</Link>
      </div>
      <div className="table">
        <ul>
          {list?.map((item) => (
            <li key={item.id}>
              <p>{item.data.name}</p>
              <p>{item.data.email}</p>
              <p>
                <Link href={`/users/${item.id}`}>詳細</Link>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Index;
