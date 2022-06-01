import React from 'react'
import { theme } from './theme'
import { ThemeProvider } from 'styled-components'
import { StatusBar } from 'expo-status-bar'
import Navigation from './navigations'
import { ProgressProvider, UserProvider } from './contexts'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <ProgressProvider>
          <StatusBar barStyle="dark-content" />
          <Navigation />
        </ProgressProvider>
      </UserProvider>
    </ThemeProvider>
  )
}
