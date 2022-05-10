import react, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { createStackNavigator } from '@react-navigation/stack'
import { Login } from '../screens'

const Stack = createStackNavigator()

export default function AuthStack() {
  const theme = useContext(ThemeContext)
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerTitleAlign: 'center',
        cardStyle: { backgroundColor: theme.backgroundColor },
      }}
    >
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  )
}
