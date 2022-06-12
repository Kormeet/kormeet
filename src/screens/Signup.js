import React, { useEffect, useState, useContext } from 'react'
import { Alert } from 'react-native'
import styled from 'styled-components/native'
import BasicButton from '../components/BasicButton'
import BasicTextInput from '../components/BasicTextInput'
import { ProgressContext, UserContext } from '../contexts'
import {
  existEmail,
  existNickname,
  existPhoneNumber,
  signup,
} from '../utils/firebase'

const MainContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
`

const Container = styled.View`
  width: 80%;
`

const FormView = styled.View`
  margin: 0 0 20px 0;
`

const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 0 0 5px 0;
`

const StyledLabel = styled.Text`
  font-size: 20px;
`

const WarningText = styled.Text`
  color: red;
`

export default function Signup({ navigation }) {
  // 필드 값
  const [phoneNo, setPhoneNo] = useState('')
  const [phoneConfirm, setPhoneConfirm] = useState('')
  const [generatedPhoneConfirm, setGeneratedPhoneConfirm] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [nickname, setNickname] = useState('')

  // Warning Texts
  const [emailWT, setEmailWT] = useState('')
  const [passwordWT, setPasswordWT] = useState('')
  const [phoneNoWT, setPhoneNoWT] = useState('')

  // Context
  const { dispatch } = useContext(UserContext)
  const { spinner } = useContext(ProgressContext)

  // 버튼 활성화 여부
  const [disabled, setDisabled] = useState(true)
  // 인증 및 중복확인 여부
  const [phoneNoSuccess, setPhoneNoSuccess] = useState(false)
  const [idSuccess, setIdSuccess] = useState(false)
  const [passwordValid, setPasswordValid] = useState(false)
  const [emailValid, setEmailValid] = useState(false)
  const [phoneNoValid, setPhoneNoValid] = useState(false)
  const [nicknameSuccess, setNicknameSuccess] = useState(false)

  useEffect(() => {
    setDisabled(
      !(
        email &&
        password &&
        passwordConfirm &&
        nickname &&
        phoneNoSuccess &&
        idSuccess &&
        nicknameSuccess &&
        passwordValid &&
        emailValid &&
        phoneNoValid
      )
    )
  }, [
    email,
    password,
    passwordConfirm,
    nickname,
    phoneNoSuccess,
    idSuccess,
    nicknameSuccess,
    passwordValid,
    emailValid,
    phoneNoValid,
  ])

  useEffect(() => {
    setPasswordValid(
      password &&
        passwordConfirm &&
        password === passwordConfirm &&
        password.length > 5
    )
    if (!password) setPasswordWT('')
    else if (password.length < 6)
      setPasswordWT('비밀번호는 6자 이상이어야 합니다.')
    else if (password !== passwordConfirm)
      setPasswordWT('비밀번호가 일치하지 않습니다.')
    else setPasswordWT('')
  }, [password, passwordConfirm])

  useEffect(() => {
    setEmailValid(
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(
        email
      )
    )
    if (!email) setEmailWT('')
    else if (
      !/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(
        email
      )
    )
      setEmailWT('이메일 형식에 맞지 않습니다.')
    else setEmailWT('')
  }, [email])

  useEffect(() => {
    setPhoneNoValid(
      /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/.test(phoneNo)
    )
  }, [phoneNo])

  const phoneNoClicked = async () => {
    if (!/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/.test(phoneNo)) {
      setPhoneNoWT('전화번호 형식에 맞지 않습니다.')
      return
    } else if (await existPhoneNumber(phoneNo)) {
      setPhoneNoWT('이미 사용중인 전화번호입니다.')
      return
    }
    const gen = `${Math.floor(Math.random() * 9000) + 1000}`
    console.log(gen)
    setGeneratedPhoneConfirm(gen)
    setPhoneNoWT('인증번호가 전송되었습니다.')
  }

  const phoneConfirmClicked = () => {
    if (phoneConfirm === generatedPhoneConfirm) {
      // 경고 메시지로 수정
      Alert.alert('전화번호 인증', '인증되었습니다')
      setPhoneNoSuccess(true)
      setPhoneNoWT('')
    } else {
      // 경고 메시지로 수정
      Alert.alert('전화번호 인증', '인증 실패')
      setPhoneNoSuccess(false)
      setPhoneNoWT('인증에 실패하였습니다.')
    }
  }

  const idChanged = (value) => {
    if (idSuccess === true) setIdSuccess(false)
    setEmail(value)
  }

  const emailConfirmClicked = async () => {
    if (!emailValid) {
      Alert.alert('이메일이 형식에 맞지 않습니다.')
      return
    }

    const _email = email.trim()
    const exist = await existEmail(_email)
    if (exist) {
      setIdSuccess(false)
      setEmailWT('이미 사용중인 이메일입니다.')
    } else {
      setIdSuccess(true)
      Alert.alert('사용 가능한 이메일입니다.')
      setEmailWT('')
    }
  }

  const nicknameChanged = (value) => {
    if (nicknameSuccess === true) setNicknameSuccess(false)
    setNickname(value)
  }

  const nicknameConfirmClicked = async () => {
    const _nickname = nickname.trim()
    const exist = await existNickname(_nickname)
    if (exist) {
      setNicknameSuccess(false)
      Alert.alert('이미 존재하는 닉네임입니다.')
    } else {
      setNicknameSuccess(true)
      Alert.alert('사용 가능한 닉네임입니다.')
    }
  }

  const signupClicked = async () => {
    if (!emailValid) Alert.alert('이메일이 형식에 맞지 않습니다.')
    if (!passwordValid) Alert.alert('비밀번호가 일치하지 않습니다.')
    try {
      spinner.start()
      const _email = email.trim()
      const _password = password.trim()
      const user = await signup({
        email: _email,
        password: _password,
        phoneNumber: phoneNo,
        nickname,
      })
      Alert.alert(
        `${nickname ? nickname : _email}님! 회원가입이 완료되었습니다. `
      )
      dispatch({ email: user.email, uid: user.uid, nickname: user.nickname })
    } catch (e) {
      Alert.alert('SignUp Error', e.message)
    } finally {
      spinner.stop()
    }
  }

  return (
    <MainContainer>
      <Container>
        <FormView>
          <StyledLabel>전화번호</StyledLabel>
          <RowContainer>
            <BasicTextInput
              placeholder="전화번호 입력"
              onChangeText={setPhoneNo}
              width="78%"
              disabled={phoneNoSuccess}
              keyboardType="decimal-pad"
              value={phoneNo}
            />
            <BasicButton
              title="인증"
              onPress={phoneNoClicked}
              isFilled
              width="20%"
              disabled={!phoneNo || phoneNoSuccess}
            />
          </RowContainer>

          <RowContainer>
            <BasicTextInput
              placeholder="인증번호 입력"
              onChangeText={setPhoneConfirm}
              width="78%"
              disabled={phoneNoSuccess}
              keyboardType="decimal-pad"
              value={phoneConfirm}
            />
            <BasicButton
              title="확인"
              onPress={phoneConfirmClicked}
              isFilled
              width="20%"
              disabled={!phoneConfirm || phoneNoSuccess}
            />
          </RowContainer>
          <WarningText>{phoneNoWT}</WarningText>
        </FormView>

        <FormView>
          <StyledLabel>이메일</StyledLabel>
          <RowContainer>
            <BasicTextInput
              placeholder="이메일 입력"
              onChangeText={idChanged}
              width="78%"
              value={email}
            />
            <BasicButton
              title="중복확인"
              onPress={emailConfirmClicked}
              isFilled
              width="20%"
              disabled={!email || idSuccess || !emailValid}
              fontSize={'15px'}
            />
          </RowContainer>
          <WarningText>{emailWT}</WarningText>
        </FormView>

        <FormView>
          <StyledLabel>비밀번호</StyledLabel>
          <BasicTextInput
            placeholder="비밀번호 입력"
            onChangeText={setPassword}
            secureTextEntry
            value={password}
          />
          <StyledLabel>비밀번호 확인</StyledLabel>
          <BasicTextInput
            placeholder="비밀번호 입력"
            onChangeText={setPasswordConfirm}
            secureTextEntry
            value={passwordConfirm}
          />
          <WarningText>{passwordWT}</WarningText>
        </FormView>

        <FormView>
          <StyledLabel>닉네임</StyledLabel>
          <RowContainer>
            <BasicTextInput
              placeholder="닉네임 입력"
              onChangeText={nicknameChanged}
              width="78%"
              value={nickname}
            />
            <BasicButton
              title="중복확인"
              onPress={nicknameConfirmClicked}
              isFilled
              width="20%"
              fontSize={'15px'}
              disabled={!nickname || nicknameSuccess}
            />
          </RowContainer>
        </FormView>
        <BasicButton
          title="회원 가입"
          onPress={signupClicked}
          isFilled
          disabled={disabled}
        />
      </Container>
    </MainContainer>
  )
}
