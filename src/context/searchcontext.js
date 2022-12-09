import { createContext, useReducer } from "react";

const intitialState = {
    destination: '',
  date: [],
  person: {
    adult: '',
    child: '',
    room: '',
  },
};

export const SearchContext = createContext(intitialState);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;

    case "RESET":
      return intitialState;

    default:
      return state;
  }
};

export const SearchContextProvider = ({ child }) => {
  const [state, dispatch] = useReducer(SearchReducer, intitialState);

  return (
    <SearchContext.Provider
      value={{
        destination: state.destination,
        date: state.date,
        person: state.person,
        dispatch,
      }}
    >
      {child}
    </SearchContext.Provider>
  );
};
