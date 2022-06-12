import React, { useState } from 'react'
import { Alert } from 'react-native'
import styled from 'styled-components/native'
import BasicButton from '../components/BasicButton'
import BasicTextInput from '../components/BasicTextInput'
import {
  existPhoneNumber,
  findEmailByPhoneNumber,
  sendPasswordResetEmail,
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

const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin: 0 0 5px 0;
`

const StyledLabel = styled.Text`
  font-size: 20px;
`

const WarningText = styled.Text`
  color: red;
`

export default function FindInfo({ navigation }) {
  // 필드 값
  const [phoneNo, setPhoneNo] = useState('')
  const [phoneConfirm, setPhoneConfirm] = useState('')
  const [generatedPhoneConfirm, setGeneratedPhoneConfirm] = useState('')
  const [email, setEmail] = useState('')

  // WT
  const [warningText, setWarningText] = useState('')

  // 인증 및 중복확인 여부
  const [phoneNoSuccess, setPhoneNoSuccess] = useState(false)

  const phoneNoClicked = async () => {
    if (!(await existPhoneNumber(phoneNo))) {
      setWarningText('가입되지 않은 휴대폰 번호입니다.')
      return
    }
    const gen = `${Math.floor(Math.random() * 9000) + 1000}`
    console.log(gen)
    setGeneratedPhoneConfirm(gen)
    setWarningText('인증번호가 전송되었습니다.')
  }

  const phoneConfirmClicked = () => {
    if (phoneConfirm === generatedPhoneConfirm) {
      // 경고 메시지로 수정
      Alert.alert('전화번호 인증', '인증되었습니다')
      setPhoneNoSuccess(true)
      setWarningText('')
    } else {
      // 경고 메시지로 수정
      Alert.alert(
        '전화번호 인증',
        '인증번호가 일치하지 않습니다. 다시 시도해 주세요'
      )
      setPhoneNoSuccess(false)
      setWarningText('다시 시도해 주세요.')
    }
  }

  const findIdClicked = async () => {
    try {
      const foundEmail = await findEmailByPhoneNumber(phoneNo)
      setEmail(foundEmail)
      Alert.alert('아이디 찾기', `회원님의 아이디는 ${foundEmail}입니다`, [
        { text: '확인' },
      ])
    } catch (e) {
      Alert.alert('아이디 찾기', '아이디 찾기에 실패하였습니다.')
    }
  }

  const passwordResetClicked = async () => {
    await sendPasswordResetEmail(email)
    Alert.alert(
      '비밀번호 재설정',
      `${email} 이메일에서 비밀번호 재설정 링크를 클릭하여 비밀번호 재설정을 진행해주세요.`
    )
  }

  return (
    <MainContainer>
      <Container>
        <StyledLabel>인증하기</StyledLabel>
        <RowContainer>
          <BasicTextInput
            placeholder="전화번호 입력"
            onChangeText={setPhoneNo}
            width="78%"
            disabled={phoneNoSuccess}
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
          />
          <BasicButton
            title="확인"
            onPress={phoneConfirmClicked}
            isFilled
            width="20%"
            disabled={!phoneConfirm || phoneNoSuccess}
          />
        </RowContainer>
        <WarningText>{warningText}</WarningText>
        <BasicButton
          title="아이디 찾기"
          onPress={findIdClicked}
          isFilled
          smargin="0 0 5px 0"
          disabled={!phoneNoSuccess}
        />
        <BasicButton
          title="비밀번호 재설정"
          // onPress={() => navigation.navigate('ResetPw', {})}
          onPress={passwordResetClicked}
          isFilled
          disabled={!phoneNoSuccess}
        />
      </Container>
    </MainContainer>
  )
}
