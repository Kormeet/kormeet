import React from 'react';
import styled from 'styled-components/native';
import { Text, Button } from 'react-native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
`;

const StyledTextInput = styled.TextInput`
  background-color: ${({ theme }) => theme.textInput};
  margin-bottom: 5px;
  padding: 5px;
  width: 200px;
`;

export default function ResetPw() {
  return (
    <Container>
      <Text>비밀번호</Text>
      <StyledTextInput placeholder="비밀번호 입력" />
      <Text>비밀번호 확인</Text>
      <StyledTextInput placeholder="비밀번호 입력" />
      <Button title="확인" />
    </Container>
  );
}
