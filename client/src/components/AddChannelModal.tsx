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
  Modal,
} from "semantic-ui-react";
import {
  GetTeamsDocument,
  GetTeamsQuery,
  useCreateChannelMutation,
} from "../generated/graphql";

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

  const formik = useFormik({
    initialValues: {
      channelName: "",
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      await createChannel({
        variables: {
          createChannelChannelInput: {
            name: values.channelName,
            teamId,
          },
        },
        update: (cache, { data: data2 }) => {
          const { createChannel } = data2 || {};
          const data = cache.readQuery<GetTeamsQuery>({
            query: GetTeamsDocument,
          });
          const teamIdx = findIndex(data?.getTeams, ["id", teamId]);
          if (
            data?.getTeams[teamIdx]?.channels &&
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
                  ...data.getTeams[teamIdx].channels,
                  createChannel.channel,
                ],
              },
            });
          }
        },
      });

      onClose();
      resetForm();
      setSubmitting(false);
    },
  });

  useEffect(() => {
    if (open && inputRef) inputRef.current?.focus();
  }, [open]);

  return (
    <Modal open={open} onClose={onClose} closeOnDimmerClick>
      <Modal.Header>Add channel</Modal.Header>
      <Modal.Content>
        <Form onSubmit={formik.handleSubmit}>
          <FormField>
            <Input
              ref={inputRef}
              fluid
              placeholder="Channel name"
              type="text"
              name="channelName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.channelName}
            />
          </FormField>
          <FormGroup widths="equal">
            <FormField>
              <Button
                type="button"
                disabled={formik.isSubmitting}
                onClick={() => {
                  formik.resetForm();
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
