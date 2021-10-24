import Downshift from "downshift";
import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router";
import {
  Button,
  Form,
  FormField,
  FormGroup,
  Input,
  Modal,
} from "semantic-ui-react";
import styled from "styled-components";
import { useGetTeamMembersQuery } from "../generated/graphql";

const MembersList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  height: 100px;
  overflow-y: auto;
`;

interface DirectMessageModalProps {
  teamId: number;
  open: boolean;
  onClose: () => void;
}

export const DirectMessageModal: React.FC<DirectMessageModalProps> = ({
  teamId,
  open,
  onClose,
}) => {
  const inputRef = useRef<Input | null>(null);
  const history = useHistory();
  const { loading, error, data } = useGetTeamMembersQuery({
    variables: { teamId },
  });

  const handleSubmit = () => {};

  useEffect(() => {
    if (open && inputRef) inputRef.current?.focus();
  }, [open]);

  if (loading || error || !data?.getTeam?.members) return null;

  const { members } = data.getTeam;
  const filteredMembers = members.filter((m) => m.id !== 1);

  return (
    <Modal open={open} onClose={onClose} closeOnDimmerClick>
      <Modal.Header>Find user to chat</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <FormField>
            {/* <Input
              ref={inputRef}
              fluid
              placeholder="Username"
              type="text"
              name="username"
              onChange={handleChange}
              value={value}
            /> */}
            <Downshift
              onChange={(selection) => {
                const memberId = members.filter(
                  ({ username }) => username === selection.username
                )[0].id;
                history.push(`/view-team/user/${teamId}/${memberId}`);
              }}
              itemToString={(item) => (item ? item.username : "")}
            >
              {({
                getInputProps,
                getItemProps,
                getLabelProps,
                getMenuProps,
                isOpen,
                inputValue,
                highlightedIndex,
                selectedItem,
                getRootProps,
              }) => (
                <div>
                  <div
                    {...getRootProps(undefined, {
                      suppressRefError: true,
                    })}
                  >
                    <Input {...getInputProps()} />
                  </div>
                  <MembersList {...getMenuProps()}>
                    {isOpen
                      ? filteredMembers
                          .filter(
                            (item) =>
                              !inputValue ||
                              item.username.includes(inputValue)
                          )
                          .map((item, index) => (
                            <li
                              {...getItemProps({
                                key: item.username,
                                index,
                                item,
                                style: {
                                  backgroundColor:
                                    highlightedIndex === index
                                      ? "lightgray"
                                      : "white",
                                  fontWeight:
                                    selectedItem === item
                                      ? "bold"
                                      : "normal",
                                },
                              })}
                            >
                              {item.username}
                            </li>
                          ))
                      : null}
                  </MembersList>
                </div>
              )}
            </Downshift>
          </FormField>
          <FormGroup widths="one">
            <FormField>
              <Button
                type="button"
                onClick={() => {
                  onClose();
                }}
                fluid
              >
                Cancel
              </Button>
            </FormField>
          </FormGroup>
        </Form>
      </Modal.Content>
    </Modal>
  );
};
