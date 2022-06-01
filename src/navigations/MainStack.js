import { createStackNavigator } from '@react-navigation/stack'
import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components/native'
import { Channel, ChannelCreation } from '../screens'
import Logo from '../../assets/images/logo.png'
import { Image } from 'react-native'
import MainTab from './MainTab'

const Stack = createStackNavigator()

export default function MainStack() {
  const theme = useContext(ThemeContext)
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        cardStyle: { backgroundColor: theme.backgroundColor },
        headerRight: () => (
          <Image
            source={Logo}
            style={{
              width: 70,
              resizeMode: 'contain',
              marginRight: 11,
            }}
          />
        ),
      }}
    >
      <Stack.Screen name="Main" component={MainTab} />
      <Stack.Screen name="Channel Creation" component={ChannelCreation} />
      <Stack.Screen name="Channel" component={Channel} />
    </Stack.Navigator>
  )
}
