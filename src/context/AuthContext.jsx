import axios from "axios";
import { createContext, useContext, useReducer } from "react";

const USERS_API =
  "https://692091ad31e684d7bfcd839c.mockapi.io/contact-application/users";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  isAuthLoading: false,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return { ...state, isAuthLoading: true, error: "" };

    case "REGISTER":
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isAuthLoading: false,
      };

    case "LOGOUT":
      return initialState;

    case "REJECTED":
      return {
        ...state,
        isAuthLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [{ user, isAuthenticated, isAuthLoading, error }, dispatch] =
    useReducer(reducer, initialState);

  async function registerUser(newUser) {
    dispatch({ type: "LOADING" });

    try {
      let res;
      try {
        res = await axios.get(`${USERS_API}?email=${newUser.email}`);
      } catch (err) {
        // Only proceed if 404 (user not found)
        if (err.response?.status === 404) {
          res = { data: [] }; // treat as no user exists
        } else {
          throw err; // real error
        }
      }

      if (res.data.length > 0) {
        alert("Email already exists ❌");
        dispatch({ type: "REJECTED", payload: "Email already exists" });
        return;
      }

      // Create user
      const createdUser = await axios.post(USERS_API, newUser);
      dispatch({ type: "REGISTER", payload: createdUser.data });
    } catch (error) {
      dispatch({ type: "REJECTED", payload: error.message });
    }
  }

  async function loginUser(email, password) {
    dispatch({ type: "LOADING" });

    try {
      const res = await axios.get(`${USERS_API}?email=${email}`);

      // Email not found
      if (res.data.length === 0) {
        alert("Email not registered ❌");
        dispatch({
          type: "REJECTED",
          payload: "Email not registered",
        });
        return;
      }

      const user = res.data[0];

      // Password mismatch
      if (user.password !== password) {
        alert("Invalid password ❌");
        dispatch({
          type: "REJECTED",
          payload: "Invalid password",
        });
        return;
      }

      // Success login
      dispatch({
        type: "LOGIN",
        payload: user,
      });
    } catch (error) {
      dispatch({
        type: "REJECTED",
        payload: error.message,
      });
    }
  }

  function logout() {
    dispatch({ type: "LOGOUT" });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAuthLoading,
        error,
        registerUser,
        loginUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
