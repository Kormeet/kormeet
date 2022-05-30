import React from 'react';
import styled from 'styled-components/native';
import { Text, Button } from 'react-native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
`;

const RowContainer = styled.View`
  flex-direction: row;
`;

const StyledTextInput = styled.TextInput`
  background-color: ${({ theme }) => theme.textInput};
  margin-bottom: 5px;
  padding: 5px;
  width: 200px;
`;

export default function FindInfo({ navigation }) {
  return (
    <Container>
      <Text>인증하기</Text>
      <RowContainer>
        <StyledTextInput placeholder="전화번호 입력" />
        <Button title="인증" />
      </RowContainer>
      <RowContainer>
        <StyledTextInput placeholder="인증번호 입력" />
        <Button title="확인" />
      </RowContainer>
      <Button title="아이디 찾기" />
      <Button
        title="비밀번호 재설정"
        onPress={() => navigation.navigate('ResetPw')}
      />
    </Container>
  );
}
