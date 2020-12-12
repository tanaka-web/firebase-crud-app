import React, { useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Form, FormGroup, Label, Input, Button, FormFeedback, Col } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import firebase, { db } from '../../plugins/firebase';

const DESIRED_JOB = ['ディレクター', 'デザイナー', 'エンジニア', 'その他'];

const Create: React.FC = () => {
  const router = useRouter();
  const handleOnSubmit = useCallback((values) => {
    const docId = db.collection('users').doc().id;
    db.collection('users').doc(docId).set({
      docId: docId,
      username: values.username,
      email: values.email,
      age: values.age,
      desired_job: values.desired_job,
      desired_reason: values.desired_reason,
      status: '受付',
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    router.push('/users');
  }, []);

  return (
    <div className="container">
      <h3 className="text-center my-5">新規作成</h3>
      <div className="text-right my-3">
        <Link href="/users">一覧へ戻る</Link>
      </div>
      <Formik
        initialValues={{ username: '', email: '', age: '', desired_job: '', desired_reason: '' }}
        onSubmit={(values) => handleOnSubmit(values)}
        validationSchema={Yup.object().shape({
          username: Yup.string().required('氏名は必須です。'),
          email: Yup.string().email('emailの形式ではありません。').required('Emailは必須です。'),
        })}
      >
        {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name">氏名</Label>
              <Input
                type="text"
                id="username"
                name="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                invalid={Boolean(touched.username && errors.username)}
              />
              <FormFeedback>{errors.username}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                invalid={Boolean(touched.email && errors.email)}
              />
              <FormFeedback>{errors.email}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="age">年齢</Label>
              <Input
                type="number"
                id="age"
                name="age"
                value={values.age}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FormGroup>
            <FormGroup>
              <Label for="desired_job">希望職種</Label>
              <Input
                type="select"
                id="desired_job"
                name="desired_job"
                value={values.desired_job}
                onChange={handleChange}
              >
                {DESIRED_JOB.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="desired_reason">希望理由</Label>
              <Input
                type="textarea"
                id="desired_reason"
                name="desired_reason"
                value={values.desired_reason}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </FormGroup>
            <Button type="submit">登録</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Create;
