import React, { useState } from "react";
import {
  Button,
  Container,
  Form,
  FormField,
  Header,
  Input,
} from "semantic-ui-react";
import { useRegisterMutation } from "../generated/graphql";

interface RegisterProps {}

export const Register: React.FC<RegisterProps> = () => {
  const [state, setState] = useState({ username: "", email: "", password: "" });
  const [register, { data, loading, error }] = useRegisterMutation();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = () => {
    register({
      variables: { userInput: state },
    });
  };

  return (
    <Container>
      {loading && <p>loading</p>}
      {error && <p>error</p>}
      <Header as="h2">Register</Header>
      <Form>
        <FormField>
          <Input
            onChange={onChange}
            name="username"
            value={state.username}
            fluid
            placeholder="Username..."
          />
        </FormField>
        <FormField>
          <Input
            onChange={onChange}
            name="email"
            value={state.email}
            fluid
            placeholder="Email..."
            type="email"
          />
        </FormField>
        <FormField>
          <Input
            onChange={onChange}
            value={state.password}
            name="password"
            fluid
            placeholder="Password..."
            type="password"
          />
        </FormField>
        <Button onClick={onSubmit}>Register</Button>
      </Form>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </Container>
  );
};
