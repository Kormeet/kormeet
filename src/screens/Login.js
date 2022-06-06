import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { Alert, Image } from 'react-native'
import BasicButton from '../components/BasicButton'
import BasicTextInput from '../components/BasicTextInput'
import Logo from '../../assets/images/logo.png'
import { ProgressContext, UserContext } from '../contexts'
import { login } from '../utils/firebase'

const MainContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
`

const Container = styled.View`
  width: 70%;
`

const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
`

export default function Login({ navigation }) {
  const { dispatch } = useContext(UserContext)
  const { spinner } = useContext(ProgressContext)
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    setDisabled(!(id && pw))
  }, [id, pw])

  const onLoginButtonPressed = async () => {
    try {
      spinner.start()
      const email = id.trim()
      const password = pw.trim()
      const response = await login({ email, password })
      dispatch({
        email: response.user.email,
        uid: response.user.uid,
        nickname: response.user.nickname,
      })
    } catch (e) {
      Alert.alert('Login Error', e.message)
    } finally {
      spinner.stop()
    }
  }

  return (
    <MainContainer>
      <Container>
        <Image
          source={Logo}
          style={{
            width: '100%',
            resizeMode: 'contain',
          }}
        />
        <BasicTextInput
          onChangeText={setId}
          placeholder="아이디"
          fontSize="30px"
          width="100%"
          smargin="0 0 5px 0"
          value={id}
        />
        <BasicTextInput
          onChangeText={setPw}
          placeholder="비밀번호"
          fontSize="30px"
          width="100%"
          smargin="0 0 5px 0"
          value={pw}
          secureTextEntry
        />
        <BasicButton
          title="Login"
          onPress={onLoginButtonPressed}
          fontSize="30px"
          width="100%"
          smargin="0 0 5px 0"
          disabled={disabled}
          isFilled
        />
        <RowContainer>
          <BasicButton
            title="회원가입"
            onPress={() => navigation.navigate('Signup')}
            smargin="0 0 5px 0"
          />
          <BasicButton
            title="아이디, 비밀번호 찾기"
            onPress={() => navigation.navigate('FindInfo')}
            smargin="0 0 5px 0"
          />
        </RowContainer>

        <BasicButton
          title="(네비게이션 놔둘 곳이 없어서 임시로 놔둔) 내정보"
          onPress={() => {
            navigation.navigate('MyInfo')
          }}
          smargin="0 0 5px 0"
        />
      </Container>
    </MainContainer>
  )
}
