import { createContext, useState } from "react";


// create a global context to log user to protected routes
const AuthContext = createContext({"name":"wed"});

// provide authcontext to all react components, see "../../index.jsx"
const AuthProvider = ({children}) => {
  const [auth, setAuth] = useState({});

  return(
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export {AuthProvider, AuthContext};