import { gql } from "@apollo/client";

export const GET_ALL_PR = gql`
  query FindPullRequests($repo_name: String!, $login: String!) {
    repository(name: $repo_name, owner: $login) {
      pullRequests(last: 25) {
        nodes {
          id
          title
          createdAt
        }
      }
    }
  }
`;
