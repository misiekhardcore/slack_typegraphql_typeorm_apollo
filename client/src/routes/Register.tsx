import React, { useState } from "react";
import { useHistory } from "react-router";
import {
  Button,
  Container,
  Form,
  FormInput,
  Header,
  Message,
} from "semantic-ui-react";
import { useRegisterMutation } from "../generated/graphql";
import { graphqlErrorToObject } from "../utils/graphqlErrorToObject";

interface RegisterProps {}

export const Register: React.FC<RegisterProps> = () => {
  const history = useHistory();
  const [state, setState] = useState({ username: "", email: "", password: "" });
  const [register, { data, loading, error }] = useRegisterMutation({
    onError: (e) => {},
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register({
      variables: { userInput: state },
    });
  };
  if (data) history.push("/");
  // if (loading) return <p>loading...</p>;
  // if (error) {
  //   return <pre>{JSON.stringify(graphqlErrorToObject(error), null, 2)}</pre>;
  // }
  const isFieldError = (name: string): boolean => {
    return graphqlErrorToObject(error)?.find((a: any) => a.path === name)
      ? true
      : false;
  };

  return (
    <Container>
      <Header as="h2">Register</Header>
      {error && (
        <>
          <Message
            error
            list={graphqlErrorToObject(error)?.map((e: any) => e.message)}
            header="You have errors in your form"
          />
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </>
      )}
      <Form onSubmit={onSubmit} loading={loading}>
        <FormInput
          error={isFieldError("username")}
          label="Username"
          onChange={onChange}
          name="username"
          value={state.username}
          fluid
          placeholder="Username..."
        />
        <FormInput
          error={isFieldError("email")}
          label="Email"
          onChange={onChange}
          name="email"
          value={state.email}
          fluid
          placeholder="Email..."
          type="email"
        />
        <FormInput
          error={isFieldError("password")}
          label="Password"
          onChange={onChange}
          value={state.password}
          name="password"
          fluid
          placeholder="Password..."
          type="password"
        />
        <Button type="submit">Register</Button>
      </Form>
    </Container>
  );
};
