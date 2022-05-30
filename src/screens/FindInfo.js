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

const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin: 0 0 5px 0;
`;

const StyledLabel = styled.Text`
  font-size: 20px;
`;

export default function FindInfo({ navigation }) {
  return (
    <MainContainer>
      <Container>
        <StyledLabel>인증하기</StyledLabel>
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
        <RowContainer>
          <BasicButton title="아이디 찾기" />
          <BasicButton
            title="비밀번호 재설정"
            onPress={() => navigation.navigate('ResetPw')}
          />
        </RowContainer>
      </Container>
    </MainContainer>
  );
}
