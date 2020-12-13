import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';

import { db } from '../../plugins/firebase';
import { Button } from 'reactstrap';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const Index: React.FC = () => {
  const [list, setList] = useState<any>();
  const { push } = useRouter();

  const getData = useCallback(() => {
    const getDocs = async () => {
      const snapshots = await db.collection('users').get();
      const _docs = await snapshots.docs?.map((doc) => ({ id: doc.id, data: doc.data() }));
      setList(_docs);
    };
    getDocs();
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      <h3 className="text-center my-5">一覧表示</h3>
      <div className="my-3">
        <Link href="/users/form">新規登録</Link>
      </div>
      <div className="table">
        <UserList>
          <li>
            <p>ID</p>
            <p>ユーザ名</p>
            <p>メールアドレス</p>
            <p></p>
          </li>
          {list?.map((item) => (
            <li key={item.id}>
              <p>{item.id}</p>
              <p>{item.data.username}</p>
              <p>{item.data.email}</p>
              <p>
                <Button
                  outline
                  size="sm"
                  color="primary"
                  onClick={() => {
                    push(`/users/${item.id}`);
                  }}
                >
                  詳細・編集
                </Button>
              </p>
            </li>
          ))}
        </UserList>
      </div>
    </div>
  );
};

export default Index;

const UserList = styled.div`
  > li {
    display: flex;

    > p {
      width: 25%;
      &:last-child {
        display: flex;
        justify-content: center;
      }
    }
  }
`;
