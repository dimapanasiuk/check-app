import { gql } from "@apollo/client";

export const REPOS = gql`
  {
    repositoryOwner(login: "GordeySt") {
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
  query FindBrunches($repo_name: String!) {
    repository(owner: "GordeySt", name: $repo_name) {
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
