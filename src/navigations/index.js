import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthStack from '../navigations/AuthStack'
import { ProgressContext, UserContext } from '../contexts'
import Spinner from './Spinner'
import MainStack from './MainStack'

export default function Navigation() {
  const { inProgress } = useContext(ProgressContext)
  const { isLoggedIn } = useContext(UserContext)

  return (
    <NavigationContainer>
      {isLoggedIn() ? <MainStack /> : <AuthStack />}
      {inProgress && <Spinner />}
    </NavigationContainer>
  )
}
