import React from 'react'
import { theme } from './theme'
import { ThemeProvider } from 'styled-components'
import { StatusBar } from 'expo-status-bar'
import Navigation from './navigations'
import { ProgressProvider } from './contexts'
import Sample from './components/Sample'

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <ProgressProvider>
        <StatusBar barStyle="dark-content" />
        <Navigation />
      </ProgressProvider>
    </ThemeProvider>
  )
}
