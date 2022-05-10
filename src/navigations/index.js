import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthStack from '../screens/AuthStack'
import { ProgressContext } from '../contexts'
import Spinner from './Spinner'
export default function Navigation() {
  const { inProgress } = useContext(ProgressContext)
  return (
    <NavigationContainer>
      <AuthStack />
      {inProgress && <Spinner />}
    </NavigationContainer>
  )
}
