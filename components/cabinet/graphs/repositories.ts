import { gql } from "@apollo/client";

export const GET_ALL_REPOS = gql`
  query FindRepos($login: String!) {
    repositoryOwner(login: $login) {
      login
      repositories(first: 100, orderBy: { field: NAME, direction: ASC }) {
        nodes {
          name
          isPrivate
          owner {
            login
          }
          defaultBranchRef {
            name
          }
        }
      }
    }
  }
`;
