import React, { createContext, useState } from 'react'

const UserContext = createContext({
  user: { email: null, id: null, nickname: null },
  dispatch: () => {},
  isLoggedIn: () => {},
})

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({})
  const isLoggedIn = () => user.email && user.id
  const dispatch = ({ email, id, nickname }) => {
    setUser({ email, id, nickname })
  }
  const value = { user, dispatch, isLoggedIn }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export { UserContext, UserProvider }
