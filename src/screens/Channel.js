import React from 'react'
import styled from 'styled-components/native'
import { Text } from 'react-native'
import { theme } from '../theme'

const Container = styled.View`
  flex: 1;
  background-color: ${theme.background};
`

export default function Channel() {
  return (
    <Container>
      <Text style={{ fontSize: 24 }}>Channel</Text>
    </Container>
  )
}
