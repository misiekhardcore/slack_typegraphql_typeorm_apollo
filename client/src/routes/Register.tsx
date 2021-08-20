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
import { isErrorField } from "../utils/isErrorField";

export const Register: React.FC = () => {
  const history = useHistory();
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [register, { data, loading, error }] = useRegisterMutation({
    errorPolicy: "all",
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
  if (data?.register.ok) history.push("/");

  return (
    <Container>
      <Header as="h2">Register</Header>
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
          error={isErrorField(error, "username")}
          label="Username"
          onChange={onChange}
          name="username"
          value={state.username}
          fluid
          placeholder="Username..."
        />
        <FormInput
          error={isErrorField(error, "email")}
          label="Email"
          onChange={onChange}
          name="email"
          value={state.email}
          fluid
          placeholder="Email..."
          type="email"
        />
        <FormInput
          error={isErrorField(error, "password")}
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
