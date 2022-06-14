import React, { useState } from 'react'
import { Alert } from 'react-native'
import styled from 'styled-components/native'
import BasicButton from '../components/BasicButton'
import BasicTextInput from '../components/BasicTextInput'

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
  justify-content: space-between;
  margin: 0 0 5px 0;
`

const StyledLabel = styled.Text`
  font-size: 20px;
`

export default function ConfirmPw({ navigation }) {
  const [pw, setPw] = useState('')
  const [pwSuccess, setPwSuccess] = useState(false)

  const pwChanged = (value) => {
    if (pwSuccess === true) setPwSuccess(false)
    setPw(value)
  }

  ;() => {
    const gen = `${Math.floor(Math.random() * 9000) + 1000}`
    console.log(gen)
    setGeneratedPhoneConfirm(gen)
    setPhoneNoWT('인증번호가 전송되었습니다.')
  }

  const ConfirmPwClicked = () => {
    // 만약 자신의 정보의 비밀번호가 일치한다면
    if (pw === '1234') {
      Alert.alert('ㅇㅈ', 'ㅇㅈ')
      // 임시로 1234
      setPwSuccess(true)
    } else {
      Alert.alert('ㄴㅇㅈ', 'ㄴㅇㅈ')
    }
  }

  return (
    <MainContainer>
      <Container>
        <StyledLabel>비밀번호</StyledLabel>
        <RowContainer>
          <BasicTextInput
            placeholder="비밀번호 입력"
            width="78%"
            onChangeText={pwChanged}
            secureTextEntry
          />
          <BasicButton
            title="인증"
            onPress={ConfirmPwClicked}
            isFilled
            width="20%"
            disabled={!pw || pwSuccess}
          />
        </RowContainer>
        <BasicButton
          title="개인정보 변경"
          onPress={() => navigation.navigate('ChangeInfo')}
          isFilled
          disabled={!pwSuccess}
        />
      </Container>
    </MainContainer>
  )
}
