import axios from "axios";

describe("User resolvers", () => {
  test("getUsers", async () => {
    const response = await axios.post("http://localhost:4000/graphql", {
      query: `
      query{
        getUsers{
          id
          username
        }
      }
      `,
    });

    const { data } = response;
    expect(data).toMatchObject({
      data: {
        getUsers: [],
      },
    });
  });

  test("createUser", async () => {
    const response = await axios.post("http://localhost:4000/graphql", {
      query: `mutation RegisterMutation($userInput: CreateUserInput!) {
  register(userInput: $userInput) {
    ok
    errors{
      path
      msg
    }
    user {
      email
      username
    }
  }
}`,
      variables: {
        userInput: {
          password: "password",
          email: "email@email.com",
          username: "username",
        },
      },
    });

    const { data } = response;

    expect(data).toMatchObject({
      data: {
        register: {
          ok: true,
          user: {
            email: "email@email.com",
            username: "username",
          },
        },
      },
    });

    const loginResponse = await axios.post(
      "http://localhost:4000/graphql",
      {
        query: `mutation LoginMutation($userInput: LoginUserInput!) {
  login(userInput: $userInput) {
    ok
  }
}`,
        variables: {
          userInput: {
            email: "email@email.com",
            password: "password",
          },
        },
      }
    );

    const {
      data: { token, refreshToken },
    } = loginResponse;
  });
});
