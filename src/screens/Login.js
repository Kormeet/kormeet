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
      const user = await login({ email, password })
      dispatch({
        email: user.email,
        id: user.id,
        nickname: user.nickname,
      })
    } catch (e) {
      const errorCode = e.code
      switch (errorCode) {
        case 'auth/wrong-password':
          Alert.alert(
            '로그인 실패',
            '비밀번호가 일치하지 않습니다. 비밀번호는 6자 이상이어야 합니다.'
          )
          break
        case 'auth/user-disabled':
          Alert.alert('로그인 실패', '사용이 정지된 계정입니다..')
          break
        case 'auth/user-not-found':
          Alert.alert(
            '로그인 실패',
            '해당하는 이메일의 계정을 찾을 수 없습니다.'
          )
          break
        case 'auth/invalid-email':
          Alert.alert(
            '로그인 실패',
            '아이디 입력이 이메일 형식에 맞지 않습니다.'
          )
          break
      }
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
      </Container>
    </MainContainer>
  )
}
