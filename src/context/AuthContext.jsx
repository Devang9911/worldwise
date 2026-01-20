import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();
const initialState = {
  user: null,
  isAuthenticated: false,
  isAuthLoading: false,
};

function reducer(state, action) {}

export function AuthProvider({ children }) {
  const [{ user, isAuthenticated, isAuthLoading }, dispatch] = useReducer(
    reducer,
    initialState,
  );
  return (
    <AuthContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
