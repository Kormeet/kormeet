import React, { createContext, useState } from 'react'

const UserContext = createContext({
  user: { email: null, id: null, nickname: null },
  dispatch: () => {},
})

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({})
  const dispatch = ({ email, id, nickname }) => {
    setUser({ email, id, nickname })
  }
  const value = { user, dispatch }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export { UserContext, UserProvider }
