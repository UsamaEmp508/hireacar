import React, { createContext, useContext, useReducer } from 'react';


// Define initial state
const initialState = {
  isLoading: false,
  error: null,
  location: {},
  completeAddress: null,
};

// Define actions
const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_LOCATION: 'SET_LOCATION',
  SET_COMPLETE_ADDRESS: 'SET_COMPLETE_ADDRESS',
};

// Define reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload };
    case ACTIONS.SET_LOCATION:
      return { ...state, location: action.payload };
    case ACTIONS.SET_COMPLETE_ADDRESS:
      return { ...state, completeAddress: action.payload };
    default:
      return state;
  }
};

// Create context
const LocationContext = createContext();

// Create provider component
export const LocationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <LocationContext.Provider value={{ state, dispatch }}>
      {children}
    </LocationContext.Provider>
  );
};

// Custom hook to use location context
export const useLocation = () => useContext(LocationContext);

// Usage of actions
export const useLocationActions = () => {
  const { dispatch } = useContext(LocationContext);

  const setLoading = (isLoading) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: isLoading });
  };

  const setLocation = (location) => {
    dispatch({ type: ACTIONS.SET_LOCATION, payload: location });
  };

  const setCompleteAddress = (completeAddress) => {
    dispatch({ type: ACTIONS.SET_COMPLETE_ADDRESS, payload: completeAddress });
  };

  return { setLoading, setLocation, setCompleteAddress };
};
