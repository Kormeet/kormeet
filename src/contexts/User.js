import React, { createContext, useState } from 'react'

const UserContext = createContext({
  user: { email: null, uid: null, nickname: null },
  dispatch: () => {},
})

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({})
  const dispatch = ({ email, uid, nickname }) => {
    setUser({ email, uid, nickname })
  }
  const value = { user, dispatch }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export { UserContext, UserProvider }
