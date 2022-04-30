import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Form,
  FormInput,
  Header,
  Message,
} from 'semantic-ui-react';
import { useLoginMutation } from '../generated/graphql';
import { graphqlErrorToObject } from '../utils/graphqlErrorToObject';
import { isErrorField } from '../utils/isErrorField';
import { wsClient } from '../apollo';

const Login: React.FC = () => {
  const [state, setState] = useState({ email: '', password: '' });
  const [login, { loading, data, error }] = useLoginMutation({
    errorPolicy: 'all',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ variables: { loginUserInput: state } });
  };

  if (data?.login.ok) {
    const { token, refreshToken } = data.login;
    if (token) localStorage.setItem('token', token);
    if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
    wsClient.close();
    return <Redirect to="/view-team" />;
  }

  return (
    <Container>
      <Header as="h2">Login</Header>
      {error && (
        <>
          <Message
            error
            list={graphqlErrorToObject(error)?.map((e) => e.message)}
            header="You have errors in your form"
          />
        </>
      )}
      <Form onSubmit={onSubmit} loading={loading}>
        <FormInput
          error={isErrorField(error, 'email')}
          label="Email"
          onChange={onChange}
          name="email"
          value={state.email}
          fluid
          placeholder="Email..."
          type="email"
        />
        <FormInput
          error={isErrorField(error, 'password')}
          label="Password"
          onChange={onChange}
          name="password"
          value={state.password}
          fluid
          placeholder="Password..."
          type="password"
        />
        <Button type="submit">Login</Button>
      </Form>
      <Link to="/register">Don&apos;t have an account yet? Register</Link>
    </Container>
  );
};

export default Login;
