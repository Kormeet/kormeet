import React from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';

const MainContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
`;

export default function MainPage() {
  return (
    <MainContainer>
      <Text>메인페이지</Text>
    </MainContainer>
  );
}
