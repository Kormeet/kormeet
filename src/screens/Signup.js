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

export default function Signup() {
  return (
    <Container>
      <Text>전화번호</Text>
      <RowContainer>
        <StyledTextInput placeholder="전화번호 입력" />
        <Button title="인증" />
      </RowContainer>
      <RowContainer>
        <StyledTextInput placeholder="인증번호 입력" />
        <Button title="확인" />
      </RowContainer>
      <Text>아이디</Text>
      <RowContainer>
        <StyledTextInput placeholder="아이디 입력" />
        <Button title="중복확인" />
      </RowContainer>
      <Text>비밀번호</Text>
      <StyledTextInput placeholder="비밀번호 입력" />
      <Text>비밀번호 확인</Text>
      <StyledTextInput placeholder="비밀번호 입력" />
      <Text>닉네임</Text>
      <RowContainer>
        <StyledTextInput placeholder="닉네임 입력" />
        <Button title="중복확인" />
      </RowContainer>
      <Button title="회원 가입 버튼" />
    </Container>
  );
}
