import { gql } from "@apollo/client";

export const GET_ALL_COMMITS_IN_BRANCH = gql`
  query FindCommit($repo_name: String!, $login: String!, $brunch: String!) {
    repository(name: $repo_name, owner: $login) {
      ref(qualifiedName: $brunch) {
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
