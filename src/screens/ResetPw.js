import React from 'react';
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

export default function ResetPw() {
  return (
    <MainContainer>
      <Container>
        <StyledLabel>비밀번호</StyledLabel>
        <BasicTextInput placeholder="비밀번호 입력" smargin="0 0 5px 0" />
        <StyledLabel>비밀번호 확인</StyledLabel>
        <BasicTextInput placeholder="비밀번호 입력" smargin="0 0 5px 0" />
        <BasicButton title="확인" isFilled />
      </Container>
    </MainContainer>
  );
}
