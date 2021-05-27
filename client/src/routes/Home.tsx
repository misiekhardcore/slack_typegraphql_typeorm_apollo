import React from "react";
import { useGetUsersQuery } from "../generated/graphql";

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  const { data, loading, error } = useGetUsersQuery();
  if (error) return <h2>{JSON.stringify(error, null, 2)}</h2>;
  else if (loading) return <h2>Loading</h2>;
  else if (data) {
    return (
      <ul>
        {data.getUsers?.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    );
  } else return null;
};
