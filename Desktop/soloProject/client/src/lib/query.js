import { gql } from "@apollo/client";

export const GET_ASSOCIATIONS = gql`
  query { 

    associations {
      theme
      name
    }
    
  }
`;



