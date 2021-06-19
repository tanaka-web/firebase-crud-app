import React from 'react';
import { Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import useAuth from '../../hooks/auth';

const Login: React.FC = () => {
  const { handleLogin } = useAuth();

  return (
    <div className="container pb-5">
      <h3 className="text-center my-5">ログイン</h3>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={handleLogin}
        validationSchema={Yup.object().shape({
          // @ts-ignore
          email: Yup.string()
            .email('メールアドレスの形式ではありません。')
            .required('メールアドレスは必須です。'),
          // @ts-ignore
          password: Yup.string()
            .min(6, 'パスワードは6文字以上です')
            .required('パスワードは必須です。'),
        })}
      >
        {({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
          <Form onSubmit={(values) => handleSubmit(values)}>
            <FormGroup>
              <Label for="email">メールアドレス</Label>
              <Input
                type="text"
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
              <Label for="password">パスワード</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                invalid={Boolean(touched.password && errors.password)}
              />
              <FormFeedback>{errors.password}</FormFeedback>
            </FormGroup>
            <Button type="submit" className="primary">
              ログイン
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
