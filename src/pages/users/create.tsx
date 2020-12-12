import React, { useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import firebase, { db } from '../../plugins/firebase';

const Create: React.FC = () => {
  const router = useRouter();
  const handleOnSubmit = useCallback((values) => {
    const docId = db.collection('members').doc().id;
    db.collection('members').doc(docId).set({
      docId: docId,
      name: values.name,
      email: values.email,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    router.push('/users');
  }, []);

  return (
    <div className="container">
      <h3 className="text-center my-5">新規作成</h3>
      <div className="text-right my-3">
        <Link href="/">一覧へ戻る</Link>
      </div>
      <Formik
        initialValues={{ name: '', email: '' }}
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
            <Button type="submit">登録</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Create;
