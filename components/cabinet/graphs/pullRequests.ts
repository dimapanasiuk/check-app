import { gql } from "@apollo/client";

export const GET_ALL_PR = gql`
  {
    repository(name: "songbird", owner: "dimapanasiuk") {
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