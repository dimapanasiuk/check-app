import { gql } from "@apollo/client";

export const GET_ALL_COMMITS_IN_BRANCH = gql`
  {
    repository(name: "todoTs", owner: "dimapanasiuk") {
      ref(qualifiedName: "classComponent") {
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