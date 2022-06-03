import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';
import BasicButton from '../components/BasicButton';
import BasicTextInput from '../components/BasicTextInput';

const MainContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
`;

const Container = styled.View`
  width: 80%;
`;

const StyledLabel = styled.Text`
  font-size: 20px;
`;

export default function ResetPw({ navigation }) {
  const [pw, setPw] = useState('');
  const [pwConfirm, setPwConfirm] = useState('');
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(!(pw && pwConfirm));
  }, [pw, pwConfirm]);

  const resetPwClicked = () => {
    if (pw === pwConfirm) {
      Alert.alert(
        '비밀번호 변경',
        '회원님의 비밀번호가 정상적으로 변경되었습니다.',
        [
          {
            text: '확인',
            onPress: () => {
              navigation.navigate('Login');
            },
          },
        ]
      );
    } else {
      // 경고 메시지로 수정
      Alert.alert('비밀번호 변경', '비밀번호가 일치하지 않습니다', [
        { text: '확인' },
      ]);
    }
  };

  return (
    <MainContainer>
      <Container>
        <StyledLabel>비밀번호</StyledLabel>
        <BasicTextInput
          placeholder="비밀번호 입력"
          onChangeText={setPw}
          smargin="0 0 5px 0"
          secureTextEntry
        />
        <StyledLabel>비밀번호 확인</StyledLabel>
        <BasicTextInput
          placeholder="비밀번호 입력"
          onChangeText={setPwConfirm}
          smargin="0 0 5px 0"
          secureTextEntry
        />
        <BasicButton
          title="확인"
          onPress={resetPwClicked}
          isFilled
          disabled={disabled}
        />
      </Container>
    </MainContainer>
  );
}
