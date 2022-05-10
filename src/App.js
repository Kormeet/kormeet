import React from 'react'
import { theme } from './theme'
import { ThemeProvider } from 'styled-components'
import { StatusBar } from 'expo-status-bar'
import Navigation from './navigations'
import Sample from './components/Sample'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="dark-content" />
      <Navigation />
    </ThemeProvider>
  )
}
