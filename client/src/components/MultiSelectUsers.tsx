import Downshift from "downshift";
import React from "react";
import { useHistory } from "react-router";
import { Input } from "semantic-ui-react";
import styled from "styled-components";
import { useGetTeamMembersQuery } from "../generated/graphql";

const MembersList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  height: 100px;
  overflow-y: auto;
`;

interface MultiSelectUsersProps {
  teamId: number;
}

export const MultiSelectUsers: React.FC<MultiSelectUsersProps> = ({
  teamId,
}) => {
  const history = useHistory();
  const { loading, error, data } = useGetTeamMembersQuery({
    variables: { teamId },
  });

  if (loading || error || !data?.getTeam?.members) return null;

  const { members } = data.getTeam;
  const filteredMembers = members.filter((m) => m.id !== 1);

  return (
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
                      !inputValue || item.username.includes(inputValue)
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
                            selectedItem === item ? "bold" : "normal",
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
  );
};
