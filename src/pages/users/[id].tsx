import React, { useCallback, useEffect, useState } from 'react';
import { Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import Link from 'next/link';
import { Formik } from 'formik';
import * as Yup from 'yup';
import firebase, { db } from '../../plugins/firebase';
import { useRouter } from 'next/router';

const DESIRED_JOB = ['職種1', '職種2', '職種3', 'その他'];
const STATUS = ['受付', '承認済'];

const Detail: React.FC = () => {
  const [user, setUsre] = useState<any>();
  const { push, query } = useRouter();

  const handleOnSubmit = useCallback((values) => {
    db.collection('users').doc(String(query.id)).update({
      username: values.username,
      email: values.email,
      age: values.age,
      desired_job: values.desired_job,
      desired_reason: values.desired_reason,
      status: values.status,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    window.alert('編集内容更新しました');
  }, []);

  const getMember = async (uid) => {
    const docRef = db.collection('users').doc(uid);
    const doc = await docRef.get();
    if (!doc.exists) return;
    setUsre(doc.data());
  };

  const handleDelete = useCallback((uid) => {
    if (window.confirm('削除しますか？')) {
      db.collection('users').doc(uid).delete();
      push('/users');
    }
  }, []);

  useEffect(() => {
    getMember(query.id);
  }, [query]);

  return (
    <div className="container">
      <h3 className="text-center my-5">詳細・編集</h3>
      <div className="text-right my-3">
        <Link href="/users">一覧へ戻る</Link>
      </div>
      <Formik
        enableReinitialize
        initialValues={{
          username: user?.username ?? '',
          email: user?.email ?? '',
          age: user?.age ?? '',
          desired_job: user?.desired_job ?? '',
          desired_reason: user?.desired_reason ?? '',
          status: user?.status ?? '受付',
        }}
        onSubmit={(values) => handleOnSubmit(values)}
        validationSchema={Yup.object().shape({
          username: Yup.string().required('氏名は必須です。'),
          email: Yup.string()
            .email('メールアドレスの形式ではありません。')
            .required('メールアドレスは必須です。'),
        })}
      >
        {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="username">氏名</Label>
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
            <FormGroup>
              <Label for="status">ステータス</Label>
              <Input type="select" name="status" value={values.status} onChange={handleChange}>
                {STATUS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <Button color="primary" type="submit">
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
