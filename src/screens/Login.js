import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Image } from 'react-native';
import BasicButton from '../components/BasicButton';
import BasicTextInput from '../components/BasicTextInput';
import Logo from '../../assets/images/logo.png';

const MainContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
`;

const Container = styled.View`
  width: 70%;
`;

const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

export default function Login({ navigation }) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

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
        <BasicTextInput
          onChangeText={setId}
          placeholder="아이디"
          fontSize="30px"
          width="100%"
          smargin="0 0 5px 0"
        />
        <BasicTextInput
          onChangeText={setPassword}
          placeholder="비밀번호"
          fontSize="30px"
          width="100%"
          smargin="0 0 5px 0"
        />
        <BasicButton
          title="Login"
          onPress={() => navigation.navigate('Login')}
          fontSize="30px"
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
