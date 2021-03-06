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
  GetTeamMembersDocument,
  GetTeamMembersQuery,
  MeDocument,
  MeQuery,
  useAddMemberMutation,
} from '../generated/graphql';
import errorToFieldError from '../utils/errorToFieldError';

interface InvitePeopleModalProps {
  teamId: number;
  open: boolean;
  onClose: () => void;
}

export const InvitePeopleModal: React.FC<InvitePeopleModalProps> = ({
  teamId,
  open,
  onClose,
}) => {
  const inputRef = useRef<Input | null>(null);

  const [addMember] = useAddMemberMutation();

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
      email: '',
    },
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      if (!values.email) setErrors({ email: 'Field cannot be empty' });
      else {
        const response = await addMember({
          variables: {
            addMemberAddMemberInput: { email: values.email, teamId },
          },
          update: (cache, { data: data2 }) => {
            const { addMember } = data2 || {};

            const meData = cache.readQuery<MeQuery>({
              query: MeDocument,
            });

            const membersData = cache.readQuery<GetTeamMembersQuery>({
              query: GetTeamMembersDocument,
              variables: { teamId },
            });

            const teamIdx = findIndex(meData?.me?.teams, ['id', teamId]);
            if (
              meData?.me?.teams &&
              meData.me.teams[teamIdx]?.members &&
              addMember?.member
            ) {
              const notAlreadyInTeam = meData.me.teams[teamIdx].members.every(
                (member) => member.id !== addMember.member?.id
              );
              if (notAlreadyInTeam) {
                cache.writeFragment({
                  id: `Team:${teamId}`,
                  fragment: gql`
                    fragment Member on Team {
                      members
                    }
                  `,
                  data: {
                    members: [
                      ...meData.me.teams[teamIdx].members,
                      addMember.member,
                    ],
                  },
                });

                if (membersData?.getTeam?.members && addMember.member) {
                  cache.writeQuery({
                    variables: { teamId },
                    query: GetTeamMembersDocument,
                    data: {
                      ...membersData,
                      getTeam: {
                        ...membersData?.getTeam,
                        members: [
                          ...(membersData?.getTeam?.members || []),
                          addMember.member,
                        ],
                      },
                    },
                  });
                }
              }
            }
          },
        });

        const { ok, errors } = response.data?.addMember || {};

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

  useEffect(() => {
    if (!open) resetForm();
  }, [open, resetForm]);

  return (
    <Modal open={open} onClose={onClose} closeOnDimmerClick>
      <Modal.Header>Add member</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <FormField error={touched.email && !!errors.email}>
            <Input
              ref={inputRef}
              fluid
              placeholder="User's email"
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
          </FormField>
          {touched.email && errors.email ? (
            <Message negative content={errors.email} />
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
                Add member
              </Button>
            </FormField>
          </FormGroup>
        </Form>
      </Modal.Content>
    </Modal>
  );
};
