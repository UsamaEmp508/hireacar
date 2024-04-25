import gql from "graphql-tag";





export const SEND_MESSAGE = gql`
mutation SendMessage($content: String!, $chatId: String!, $userId: String!) {
  sendMessage(content: $content, chatId: $chatId, userId: $userId) {
    content
      id   
    
      chat
      {
        id
  chatName
  
        users
        {
  displayName
          id
        }

      }
      createdAt

      sender
      {
  id
  displayName
  photoLink
      }
    
  }
}
`;





export const UPDATE_USER = gql`
  mutation UpdateUser($id: String!, $user: NewUserInput!) {
    updateUser(id: $id, user: $user) {
      id
      googleId
      displayName
      email
      photoLink
      contactNumber
      isVerified
      cnic
      # other car fields
      # cars {
      #   id
      # }
      # other booking fields
      # bookings {
      #   id
      # }
      # # other review fields
      # reviews {
      #   id
      # }
    }
  }
`;






export const CREATE_USER_MUTATION = gql`

mutation CreateUser($newUserData: NewUserInput!) {
  createUser(newUserData: $newUserData) {
      id
      displayName
      email
      googleId
      photoLink
      contactNumber
     isVerified
      cnic
  }
}
`;