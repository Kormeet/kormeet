import React from 'react'
import styled from 'styled-components/native'
import { Text } from 'react-native'
import BasicButton from '../components/BasicButton'
import { theme } from '../theme'

const Container = styled.View`
  flex: 1;
  background-color: ${theme.background};
`

export default function ChannelList({ navigation }) {
  return (
    <Container>
      <Text style={{ fontSize: 24 }}>Channel List</Text>
      <BasicButton
        title="Channel List"
        onPress={() => navigation.navigate('Channel List')}
      />
    </Container>
  )
}
