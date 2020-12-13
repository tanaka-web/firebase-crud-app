import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { db } from '../../plugins/firebase';

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

  const EmailSearch = useCallback(async (email) => {
    if (email === '') return getData();
    const snapshots = await db.collection('users').where('email', '==', email).get();
    const _docs = await snapshots.docs?.map((doc) => ({ id: doc.id, data: doc.data() }));
    setList(_docs);
  }, []);

  return (
    <div className="container pb-5">
      <h3 className="text-center my-5">一覧表示</h3>
      <div className="my-3">
        <Link href="/users/form">新規登録</Link>
        <div className="mb-3"> </div>
        <a href="https://us-central1-fir-crud-app-2a3a9.cloudfunctions.net/exportUsers">CSV出力</a>
      </div>
      <SearchWrapper>
        <Formik
          initialValues={{ email: '' }}
          onSubmit={(values) => EmailSearch(values.email)}
          validationSchema={Yup.object().shape({
            email: Yup.string().email('メールアドレスの形式ではありません。'),
          })}
        >
          {({ handleSubmit, handleChange, values }) => (
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  bsSize="sm"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="メールアドレス検索"
                />
              </FormGroup>
              <Button size="sm" color="primary" type="submit">
                検索
              </Button>
            </Form>
          )}
        </Formik>
      </SearchWrapper>
      <div>
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
    margin: 0;
    padding: 12px;
    align-items: center;
    &:first-child {
      font-weight: bold;
    }
    &:nth-child(2n) {
      background-color: #f6f6f6;
    }

    > p {
      width: 25%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-left: 8px;
      margin-bottom: 0;

      &:last-child {
        display: flex;
        min-width: 88px;
        justify-content: flex-end;
      }
    }
  }
`;

const PageButtons = styled.div`
  margin-top: 32px;
  padding: 12px 12px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-between;
`;

const SearchWrapper = styled.div`
  margin-bottom: 42px;
  form {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
  }
  .form-control {
    margin-right: 12px;
  }
  .form-group {
    width: 280px;
    display: flex;
    align-items: center;
    margin: 0;
  }
`;
