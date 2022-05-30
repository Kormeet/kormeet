import React from 'react';
import styled from 'styled-components/native';
import { Image } from 'react-native';
import BasicButton from '../components/BasicButton';
import BasicTextInput from '../components/BasicTextInput';
import Logo from '../../assets/images/logo.png';

const MainContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  align-items: center;
  justify-content: center;
`;

const Container = styled.View`
  width: 250px;
  justify-content: space-between;
`;

const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

export default function Login({ navigation }) {
  return (
    <MainContainer>
      <Container>
        <Image
          source={Logo}
          style={{
            width: '100%',
            resizeMode: 'contain',
          }}
        />
        <BasicTextInput placeholder="아이디" width="100%" smargin="0 0 5px 0" />
        <BasicTextInput
          placeholder="비밀번호"
          width="100%"
          smargin="0 0 5px 0"
        />
        <BasicButton
          title="Login"
          onPress={() => navigation.navigate('Login')}
          width="100%"
          smargin="0 0 5px 0"
          isFilled
        />
        <RowContainer>
          <BasicButton
            title="회원가입"
            onPress={() => navigation.navigate('Signup')}
            smargin="0 0 5px 0"
          />
          <BasicButton
            title="아이디, 비밀번호 찾기"
            onPress={() => navigation.navigate('FindInfo')}
            smargin="0 0 5px 0"
          />
        </RowContainer>
      </Container>
    </MainContainer>
  );
}
