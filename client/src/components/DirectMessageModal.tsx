import { useFormik } from 'formik';
import gql from 'graphql-tag';
import { findIndex } from 'lodash';
import React, { useEffect, useRef } from 'react';
import {
  Button,
  Form,
  FormField,
  FormGroup,
  Input,
  Message,
  Modal,
} from 'semantic-ui-react';
import {
  MeDocument,
  MeQuery,
  useCreateDmChannelMutation,
} from '../generated/graphql';
import errorToFieldError from '../utils/errorToFieldError';
import { MultiSelectUsers } from './MultiSelectUsers';

interface DirectMessageModalProps {
  teamId: number;
  userId: number;
  open: boolean;
  onClose: () => void;
}

export const DirectMessageModal: React.FC<DirectMessageModalProps> = ({
  teamId,
  userId,
  open,
  onClose,
}) => {
  const inputRef = useRef<Input | null>(null);

  const [createDMChannel] = useCreateDmChannelMutation();

  useEffect(() => {
    if (open && inputRef) inputRef.current?.focus();
  }, [open]);

  const {
    isSubmitting,
    handleSubmit,
    handleBlur,
    resetForm,
    values,
    errors,
    touched,
    setFieldValue,
    setErrors,
  } = useFormik({
    initialValues: {
      members: [],
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      if (!values.members.length) {
        setErrors({ members: 'Please select at least one member to chat' });
      }

      const response = await createDMChannel({
        variables: {
          createChannelChannelInput: {
            name: '',
            teamId,
            membersIds: values.members,
          },
        },
        update: (cache, { data: data2 }) => {
          const { createDMChannel } = data2 || {};

          const data = cache.readQuery<MeQuery>({
            query: MeDocument,
          });

          const teamIdx = findIndex(data?.me?.teams, ['id', teamId]);

          if (
            data?.me?.teams &&
            data?.me?.teams[teamIdx]?.channels &&
            createDMChannel?.channel
          ) {
            cache.writeFragment({
              id: `Team:${teamId}`,
              fragment: gql`
                fragment Channel on Team {
                  channels
                }
              `,
              data: {
                channels: [
                  ...data.me.teams[teamIdx].channels,
                  createDMChannel.channel,
                ],
              },
            });
          }
        },
      });

      const { ok, errors } = response.data?.createDMChannel || {};

      if (ok) {
        onClose();
        resetForm();
      }
      if (errors) {
        setErrors(errorToFieldError(errors));
      }
      setSubmitting(false);

      setSubmitting(false);
    },
  });

  return (
    <Modal open={open} onClose={onClose} closeOnDimmerClick>
      <Modal.Header>Find user to chat</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <FormField error={touched.members && !!errors.members}>
            <MultiSelectUsers
              handleBlur={handleBlur}
              userId={userId}
              placeholder="Select members to message"
              value={values.members}
              handleChange={(_e, { value }) => setFieldValue('members', value)}
              teamId={teamId}
            />
          </FormField>
          {touched.members && errors.members ? (
            <Message negative content={errors.members} />
          ) : null}
          <FormGroup widths="equal">
            <FormField>
              <Button
                disabled={isSubmitting}
                type="button"
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
              <Button disabled={isSubmitting} type="submit" fluid>
                Start Messaging
              </Button>
            </FormField>
          </FormGroup>
        </Form>
      </Modal.Content>
    </Modal>
  );
};
