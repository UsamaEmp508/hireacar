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
    
      cnic
    
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




export const ADD_NEW_CAR = gql`
mutation AddCars($newCarData: NewCarInput!) {
  addNewCar(
    newCarData: $newCarData
  ) {
    id
    name
    photos
    carType
    monthlyPrice
    dailyPrice
    hourlyPrice
    City
    year
    thumbnailUrl
  gearType
    color
   isAvailable
   owner{id}
   location{id}
  }
}
`;


export const UPDATE_CAR = gql`
  mutation UpdateCar($id: String!, $updateCarData: updateCarInput!) {
    updateCar(id: $id, updateCarData: $updateCarData) {
      id
      monthlyPrice
      dailyPrice
      hourlyPrice
      photos
      features
      isAvailable
    }
  }
`;

export const deleteCar = gql`
mutation deleteCar($id: String!) {
  deleteCar(id: $id)
}


`

export const ACCESS_CHAT = gql`
  mutation AccessChat($id: String!, $currentUser: String!) {
    accessChat(id: $id, currentUser: $currentUser) {
      id
      chatName
      users {
        id
        displayName
      }

      latestMessage
      {
      content
      }
    
      
      createdAt
    }
  }
`;