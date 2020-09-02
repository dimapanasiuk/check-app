import { gql } from "@apollo/client";

export const REPOS = gql`
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

export const GET_ALL_BRANCHES_IN_REPO = gql`
  query FindBrunches($repo_name: String!, $login: String!) {
    repository(owner: $login, name: $repo_name) {
      refs(
        refPrefix: "refs/heads/"
        orderBy: { direction: DESC, field: TAG_COMMIT_DATE }
        first: 20
      ) {
        edges {
          node {
            name
          }
        }
      }
    }
  }
`;
