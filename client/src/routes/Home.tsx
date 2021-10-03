import React from "react";
import { useGetUsersQuery } from "../generated/graphql";

const Home: React.FC = () => {
  const { data, loading, error } = useGetUsersQuery();
  if (error) return <h2>{JSON.stringify(error, null, 2)}</h2>;
  if (loading) return <h2>Loading</h2>;
  return data ? (
    <ul>
      {data.getUsers?.map((user) => (
        <li key={user.id}>{user.username}</li>
      ))}
    </ul>
  ) : null;
};

export default Home;
