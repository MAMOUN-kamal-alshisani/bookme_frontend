import { createContext, useReducer,useEffect } from "react";


const initialState = {
  username:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  loading: false,
  error: "",
};
export const AuthContext = createContext(initialState);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        username: "",
        loading: true,
        error: "",
      };

    case "LOGIN_SUCCESS":
      return {
        username: action.payload,
        loading: false,
        error: null,
      };

    case "LOGIN_FAIL":
      return {
        username: null,
        loading: false,
        error: action.payload,
      };

    case "LOGOUT":
      return initialState;

    default:
      return state;
  }
};

export const AuthContextProvider = ({ child }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

useEffect(()=>{
localStorage.setItem('user',JSON.stringify(state.username))
},[state.username])

  return (
    <AuthContext.Provider
      value={{
        username: state.username,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {child}
    </AuthContext.Provider>
  );
};
