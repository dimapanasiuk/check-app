import { gql } from "@apollo/client";

export const GET_ALL_COMMITS_IN_BRANCH = gql`
  query FindCommit($repo_name: String!, $login: String!, $branch: String!) {
    repository(name: $repo_name, owner: $login) {
      ref(qualifiedName: $branch) {
        target {
          ... on Commit {
            id
            history(first: 100) {
              pageInfo {
                hasNextPage
              }
              edges {
                node {
                  messageHeadline
                }
              }
            }
          }
        }
      }
    }
  }
`;
