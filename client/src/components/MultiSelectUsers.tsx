import React from 'react';
import { Dropdown, DropdownProps } from 'semantic-ui-react';
import { useGetTeamMembersQuery } from '../generated/graphql';

interface MultiSelectUsersProps {
  teamId: number;
  placeholder: string;
  value: string | number | boolean | (string | number | boolean)[] | undefined;
  userId: number;
  handleBlur: (e: React.FocusEvent<unknown, Element>) => void;
  handleChange: (
    event: React.SyntheticEvent<HTMLElement, Event>,
    data: DropdownProps
  ) => void;
}

export const MultiSelectUsers: React.FC<MultiSelectUsersProps> = ({
  teamId,
  placeholder,
  value,
  userId,
  handleBlur,
  handleChange,
}) => {
  const { loading, error, data } = useGetTeamMembersQuery({
    variables: { teamId },
  });

  if (loading || error || !data?.getTeam?.members) return null;

  const { members } = data.getTeam;
  const filteredMembers = members.filter((m) => m.id !== userId);

  return (
    <Dropdown
      onBlur={handleBlur}
      name="members"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      fluid
      multiple
      search
      selection
      options={filteredMembers.map((m) => ({
        key: m.id,
        value: m.id,
        text: m.username,
      }))}
    />
  );
};
