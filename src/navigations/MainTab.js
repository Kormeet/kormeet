import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ChannelList } from '../screens'

const Tab = createBottomTabNavigator()

export default function MainTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Channel List" component={ChannelList} />
    </Tab.Navigator>
  )
}
