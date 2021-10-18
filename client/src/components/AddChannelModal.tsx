import { useFormik } from "formik";
import gql from "graphql-tag";
import { findIndex } from "lodash";
import React, { useEffect, useRef } from "react";
import {
  Button,
  Form,
  FormField,
  FormGroup,
  Input,
  Message,
  Modal,
} from "semantic-ui-react";
import {
  MeDocument,
  MeQuery,
  useCreateChannelMutation,
} from "../generated/graphql";
import errorToFieldError from "../utils/errorToFieldError";

interface AddChannelModalProps {
  teamId: number;
  open: boolean;
  onClose: () => void;
}

export const AddChannelModal: React.FC<AddChannelModalProps> = ({
  teamId,
  open,
  onClose,
}) => {
  const inputRef = useRef<Input | null>(null);

  const [createChannel] = useCreateChannelMutation();

  const {
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
    values,
    touched,
    errors,
  } = useFormik({
    initialValues: {
      channelName: "",
    },
    onSubmit: async (
      values,
      { setSubmitting, resetForm, setErrors }
    ) => {
      if (!values.channelName)
        setErrors({ channelName: "Field cannot be empty" });
      else {
        const response = await createChannel({
          variables: {
            createChannelChannelInput: {
              name: values.channelName,
              teamId,
            },
          },
          update: (cache, { data: data2 }) => {
            const { createChannel } = data2 || {};

            const data = cache.readQuery<MeQuery>({
              query: MeDocument,
            });

            const teamIdx = findIndex(data?.me?.teams, ["id", teamId]);

            if (
              data?.me?.teams &&
              data?.me?.teams[teamIdx]?.channels &&
              createChannel?.channel
            ) {
              cache.writeFragment({
                id: "Team:" + teamId,
                fragment: gql`
                  fragment Channel on Team {
                    channels
                  }
                `,
                data: {
                  channels: [
                    ...data.me.teams[teamIdx].channels,
                    createChannel.channel,
                  ],
                },
              });
            }
          },
        });

        const { ok, errors } = response.data?.createChannel || {};

        if (ok) {
          onClose();
          resetForm();
        }
        if (errors) {
          setErrors(errorToFieldError(errors));
        }
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (open && inputRef) inputRef.current?.focus();
  }, [open]);

  return (
    <Modal open={open} onClose={onClose} closeOnDimmerClick>
      <Modal.Header>Add channel</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <FormField
            error={touched.channelName && !!errors.channelName}
          >
            <Input
              ref={inputRef}
              fluid
              placeholder="Channel name"
              type="text"
              name="channelName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.channelName}
            />
          </FormField>
          {touched.channelName && errors.channelName ? (
            <Message negative content={errors.channelName} />
          ) : null}
          <FormGroup widths="equal">
            <FormField>
              <Button
                type="button"
                disabled={isSubmitting}
                onClick={() => {
                  resetForm();
                  onClose();
                }}
                fluid
              >
                Cancel
              </Button>
            </FormField>
            <FormField>
              <Button type="submit" fluid>
                Create channel
              </Button>
            </FormField>
          </FormGroup>
        </Form>
      </Modal.Content>
    </Modal>
  );
};
