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

const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 0 0 5px 0;
`;

const StyledLabel = styled.Text`
  font-size: 20px;
`;

const WarningText = styled.Text`
  color: red;
`;

export default function ConfirmPw({ navigation }) {
  const [pw, setPw] = useState('');
  const [pwSuccess, setPwSuccess] = useState(false);
  // Warning Texts
  const [passwordWT, setPasswordWT] = useState('');

  useEffect(() => {
    if (!pw) setPasswordWT('');
    else if (pw.length < 6) setPasswordWT('비밀번호는 6자 이상이어야 합니다.');
    else setPasswordWT('');
  }, [pw]);

  const pwChanged = value => {
    if (pwSuccess) setPwSuccess(false);
    setPw(value);
  };

  const ConfirmPwClicked = () => {
    if (pw === '123456') {
      // 임시로 123456
      Alert.alert('인증 성공.');
      console.log('(미구현) 접속한 비밀번호 확인 기능 X');
      setPasswordWT('');
      setPwSuccess(true);
    } else {
      setPasswordWT('비밀번호가 일치하지 않습니다.');
      console.log('(미구현) 접속한 비밀번호 확인 기능 X');
    }
  };

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
            disabled={!pw || pwSuccess || passwordWT !== ''}
          />
        </RowContainer>
        <WarningText>{passwordWT}</WarningText>
        <BasicButton
          title="개인정보 변경"
          onPress={() => navigation.navigate('ChangeInfo')}
          isFilled
          disabled={!pwSuccess || passwordWT !== '' || !pw}
        />
      </Container>
    </MainContainer>
  );
}
