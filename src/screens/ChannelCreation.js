import React from 'react'
import styled from 'styled-components/native'
import { Text } from 'react-native'
import BasicButton from '../components/BasicButton'
import { theme } from '../theme'

const Container = styled.View`
  flex: 1;
  background-color: ${theme.background};
`

export default function ChannelCreation({ navigation }) {
  return (
    <Container>
      <Text style={{ fontSize: 24 }}>Channel Creation</Text>
      <BasicButton
        title="Channel"
        onPress={() => navigation.navigate('Channel')}
      />
    </Container>
  )
}
