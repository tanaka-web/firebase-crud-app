import React, { useCallback, useEffect, useState } from 'react';
import { Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import Link from 'next/link';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { db } from '../../plugins/firebase';
import { useRouter } from 'next/router';

const Detail: React.FC = () => {
  const [user, setUsre] = useState<any>();
  const { push, query } = useRouter();

  const handleOnSubmit = useCallback((values) => {
    db.collection('members').doc(String(query.id)).update({
      name: values.name,
      email: values.email,
    });
    push('/');
  }, []);

  const getMember = async (uid) => {
    const docRef = db.collection('members').doc(uid);
    const doc = await docRef.get();
    if (!doc.exists) return;
    setUsre(doc.data());
  };

  const handleDelete = useCallback((uid) => {
    if (window.confirm('削除しますか？')) {
      db.collection('members').doc(uid).delete();
      push('/');
    }
  }, []);

  useEffect(() => {
    getMember(query.id);
  }, [query]);

  return (
    <div className="container">
      <h3 className="text-center my-5">詳細・編集</h3>
      <div className="text-right my-3">
        <Link href="/">一覧へ戻る</Link>
      </div>
      <Formik
        enableReinitialize
        initialValues={{ name: user?.name, email: user?.email }}
        onSubmit={(values) => handleOnSubmit(values)}
        // validationSchema={Yup.object().shape({
        //   name: Yup.string().required('氏名は必須です。'),
        //   email: Yup.string().email('emailの形式ではありません。').required('Emailは必須です。'),
        // })}
      >
        {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name">氏名</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                invalid={Boolean(touched.name && errors.name)}
              />
              <FormFeedback>{errors.name}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                email="email"
                id="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                invalid={Boolean(touched.email && errors.email)}
              />
              <FormFeedback>{errors.email}</FormFeedback>
            </FormGroup>
            <Button type="submit" color="success">
              更新
            </Button>
          </Form>
        )}
      </Formik>
      <div className="my-3">
        <Button color="danger" onClick={() => handleDelete(query.id)}>
          削除
        </Button>
      </div>
    </div>
  );
};

export default Detail;
