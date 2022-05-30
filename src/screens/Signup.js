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

const FormView = styled.View`
  margin: 0 0 20px 0;
`;

const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 0 0 5px 0;
`;

const StyledLabel = styled.Text`
  font-size: 20px;
`;

export default function Signup() {
  return (
    <MainContainer>
      <Container>
        <FormView>
          <StyledLabel>전화번호</StyledLabel>
          <RowContainer>
            <BasicTextInput placeholder="전화번호 입력" width="78%" />
            <BasicButton title="인증" isFilled width="20%" />
          </RowContainer>
          <RowContainer>
            <BasicTextInput
              placeholder="인증번호 입력"
              width="78
            %"
            />
            <BasicButton title="확인" isFilled width="20%" />
          </RowContainer>
        </FormView>

        <FormView>
          <StyledLabel>아이디</StyledLabel>
          <RowContainer>
            <BasicTextInput
              placeholder="아이디 입력"
              width="78
            %"
            />
            <BasicButton title="중복확인" isFilled width="20%" />
          </RowContainer>
        </FormView>

        <FormView>
          <StyledLabel>비밀번호</StyledLabel>
          <BasicTextInput placeholder="비밀번호 입력" />
          <StyledLabel>비밀번호 확인</StyledLabel>
          <BasicTextInput placeholder="비밀번호 입력" />
        </FormView>

        <FormView>
          <StyledLabel>닉네임</StyledLabel>
          <RowContainer>
            <BasicTextInput
              placeholder="닉네임 입력"
              width="78
            %"
            />
            <BasicButton title="중복확인" isFilled width="20%" />
          </RowContainer>
        </FormView>
        <BasicButton title="회원 가입 버튼" isFilled />
      </Container>
    </MainContainer>
  );
}
