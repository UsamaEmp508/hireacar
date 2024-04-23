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
