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
import { useCreateTeamMutation } from "../generated/graphql";
import { graphqlErrorToObject } from "../utils/graphqlErrorToObject";
import { isAuthError } from "../utils/isAuthError";
import { isErrorField } from "../utils/isErrorField";

export const CreateTeam: React.FC = () => {
  const history = useHistory();
  const [state, setState] = useState({ name: "" });
  const [createTeam, { loading, data, error }] = useCreateTeamMutation({
    errorPolicy: "all",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createTeam({ variables: { createTeamInput: state } });
  };

  if (data?.createTeam.ok) history.push("/");

  if (isAuthError(error)) history.push("/login");

  return (
    <Container>
      <Header as="h2">Create team</Header>
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
          error={isErrorField(error, "name")}
          label="Team name"
          onChange={onChange}
          name="name"
          value={state.name}
          fluid
          placeholder="Team name..."
          type="text"
        />
        <Button type="submit">Create Team</Button>
      </Form>
    </Container>
  );
};
