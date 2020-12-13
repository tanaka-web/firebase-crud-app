import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';

import { db } from '../../plugins/firebase';
import { Button } from 'reactstrap';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const Index: React.FC = () => {
  const [list, setList] = useState<any>();
  const [nextDoc, setNextDoc] = useState<any>();
  const [prevDoc, setPrevDoc] = useState<any>();
  const { push } = useRouter();
  const usersRef = db.collection('users').orderBy('createdAt');

  const getData = useCallback(
    async (type?: 'prev' | 'next') => {
      let snapshots;
      try {
        if (type === 'prev') {
          snapshots = await usersRef.endBefore(prevDoc).limit(10).get();
        }
        if (type === 'next') {
          snapshots = await usersRef.startAfter(nextDoc).limit(10).get();
        }
        if (!type) {
          snapshots = await usersRef.limit(10).get();
        }
      } catch {
        return;
      }
      if (snapshots.docs.length > 0) {
        const _docs = await snapshots.docs?.map((doc) => ({ id: doc.id, data: doc.data() }));
        setList(_docs);
        const lastDoc = snapshots.docs[snapshots.docs.length - 1];
        const firstDoc = snapshots.docs[0];
        setNextDoc(lastDoc);
        setPrevDoc(firstDoc);
      }
    },
    [list, nextDoc, prevDoc, usersRef],
  );

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
        <PageButtons>
          <Button
            outline
            onClick={() => {
              getData('prev');
            }}
          >
            前へ
          </Button>
          <Button
            outline
            onClick={() => {
              getData('next');
            }}
          >
            次へ
          </Button>
        </PageButtons>
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
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-left: 8px;

      &:last-child {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
`;

const PageButtons = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
`;
