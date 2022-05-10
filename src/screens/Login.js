import react from 'react'
import styled from 'styled-components'
import { Text, Button } from 'react-native'

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
`
export default function Login({ navigation }) {
  return (
    <Container>
      <Text style={{ fontSize: 30 }}>Login Screen</Text>
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
    </Container>
  )
}
