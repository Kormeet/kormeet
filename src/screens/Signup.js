import React, { useEffect, useState, useContext } from 'react'
import { Alert } from 'react-native'
import styled from 'styled-components/native'
import BasicButton from '../components/BasicButton'
import BasicTextInput from '../components/BasicTextInput'
import { ProgressContext, UserContext } from '../contexts'
import {
  createUser,
  existEmail,
  existNickname,
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

export default function Signup({ navigation }) {
  // 필드 값
  const [phoneNo, setPhoneNo] = useState('')
  const [phoneConfirm, setPhoneConfirm] = useState('')
  const [generatedPhoneConfirm, setGeneratedPhoneConfirm] = useState('')
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')
  const [pwConfirm, setPwConfirm] = useState('')
  const [nickname, setNickname] = useState('')
  const { dispatch } = useContext(UserContext)
  const { spinner } = useContext(ProgressContext)

  // 버튼 활성화 여부
  // const [phoneNoDisabled, setPhoneNoDisabled] = useState(true);
  // const [idDisabled, setIdDisabled] = useState(true);
  // const [nicknameDisabled, setNicknameDisabled] = useState(true);
  const [disabled, setDisabled] = useState(true)
  // 인증 및 중복확인 여부
  const [phoneNoSuccess, setPhoneNoSuccess] = useState(false)
  const [idSuccess, setIdSuccess] = useState(false)
  const [passwordValid, setPasswordValid] = useState(false)
  const [nicknameSuccess, setNicknameSuccess] = useState(false)

  useEffect(() => {
    setDisabled(
      !(
        id &&
        pw &&
        pwConfirm &&
        nickname &&
        phoneNoSuccess &&
        idSuccess &&
        nicknameSuccess &&
        passwordValid
      )
    )
  }, [
    id,
    pw,
    pwConfirm,
    nickname,
    phoneNoSuccess,
    idSuccess,
    nicknameSuccess,
    passwordValid,
  ])

  useEffect(() => {
    setPasswordValid(pw && pw === pwConfirm && pw.length > 5)
  }, [pw, pwConfirm])

  const phoneNoClicked = () => {
    const gen = `${Math.floor(Math.random() * 9000) + 1000}`
    console.log(gen)
    setGeneratedPhoneConfirm(gen)
    console.log(generatedPhoneConfirm)
  }

  const phoneConfirmClicked = () => {
    console.log(phoneConfirm, generatedPhoneConfirm)
    if (phoneConfirm === generatedPhoneConfirm) {
      // 경고 메시지로 수정
      Alert.alert('전화번호 인증', '인증되었습니다')
      setPhoneNoSuccess(true)
    } else {
      // 경고 메시지로 수정
      Alert.alert('전화번호 인증', '인증 실패')
      setPhoneNoSuccess(false)
    }
  }

  const idChanged = (value) => {
    if (idSuccess === true) setIdSuccess(false)
    setId(value)
  }

  const idConfirmClicked = async () => {
    const email = id.trim()
    const exist = await existEmail(email)
    //중복확인 코드
    //만약 (중복없다면)
    // 사용가능한 아이디입니다.(// 경고 메시지로 수정)
    if (exist) {
      setIdSuccess(false)
      Alert.alert('이미 존재하는 이메일입니다.')
    } else {
      setIdSuccess(true)
      Alert.alert('사용 가능한 이메일입니다.')
    }
    // 만약 (중복있다면)
    // 알림메시지 사용할 수 없는 아이디입니다. (// 경고 메시지로 수정)
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
    try {
      spinner.start()
      const email = id.trim()
      const password = pw.trim()
      const user = await signup({
        email,
        password,
        phoneNumber: phoneNo,
        nickname,
      })
      Alert.alert(
        `${nickname ? nickname : email}님! 회원가입이 완료되었습니다. `
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
        </FormView>

        <FormView>
          <StyledLabel>아이디</StyledLabel>
          <RowContainer>
            <BasicTextInput
              placeholder="아이디 입력"
              onChangeText={idChanged}
              width="78%"
              value={id}
            />
            <BasicButton
              title="중복확인"
              onPress={idConfirmClicked}
              isFilled
              width="20%"
              disabled={!id || idSuccess}
            />
          </RowContainer>
        </FormView>

        <FormView>
          <StyledLabel>비밀번호</StyledLabel>
          <BasicTextInput
            placeholder="비밀번호 입력"
            onChangeText={setPw}
            secureTextEntry
            value={pw}
          />
          <StyledLabel>비밀번호 확인</StyledLabel>
          <BasicTextInput
            placeholder="비밀번호 입력"
            onChangeText={setPwConfirm}
            secureTextEntry
            value={pwConfirm}
          />
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
              disabled={!nickname || nicknameSuccess}
            />
          </RowContainer>
        </FormView>
        <BasicButton
          title="회원 가입 버튼"
          onPress={signupClicked}
          isFilled
          disabled={disabled}
        />
      </Container>
    </MainContainer>
  )
}
