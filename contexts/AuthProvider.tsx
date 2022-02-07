import { createContext, ReactElement, useState } from "react";

import { User } from "prisma/prisma-client";

interface IAuthContext {
  user: User,
  updateUser: (newUser: User) => void
}

const defaultState: IAuthContext = {
  user: null,
  updateUser: () => {}
}

export const AuthContext = createContext<IAuthContext>(defaultState);

const AuthProvider = ({children} : { children: ReactElement }) => {
  const [user, setUser] = useState(defaultState.user);

  const updateUser = (newUser: User) => {
    setUser(newUser);
  }

  return (
    <AuthContext.Provider value={{user, updateUser}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
