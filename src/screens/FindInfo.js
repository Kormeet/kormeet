import React, { useState } from 'react';
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
  justify-content: space-around;
  margin: 0 0 5px 0;
`;

const StyledLabel = styled.Text`
  font-size: 20px;
`;

export default function FindInfo({ navigation }) {
  // 필드 값
  const [phoneNo, setPhoneNo] = useState('');
  const [phoneConfirm, setPhoneConfirm] = useState('');
  // 인증 및 중복확인 여부
  const [phoneNoSuccess, setPhoneNoSuccess] = useState(false);

  const phoneNoClicked = () => {
    Alert.alert('인증번호', '(임시 랜덤 숫자 - 인증번호 구현 어떻게?) 1234');
  };

  const phoneConfirmClicked = () => {
    if (phoneConfirm === '1234') {
      // 경고 메시지로 수정
      Alert.alert('전화번호 인증', '인증되었습니다');
      setPhoneNoSuccess(true);
    } else {
      // 경고 메시지로 수정
      Alert.alert('전화번호 인증', '인증 실패');
      setPhoneNoSuccess(false);
    }
  };

  const findIdClicked = () => {
    Alert.alert(
      '아이디 찾기',
      '회원님의 아이디는 [(임시) id를 받아와야 함]입니다',
      [{ text: '확인' }]
    );
  };

  return (
    <MainContainer>
      <Container>
        <StyledLabel>인증하기</StyledLabel>
        <RowContainer>
          <BasicTextInput
            placeholder="전화번호 입력"
            onChangeText={setPhoneNo}
            width="78%"
            disabled={phoneNoSuccess}
          />
          <BasicButton
            title="인증"
            onPress={phoneNoClicked}
            isFilled
            width="20%"
            disabled={!phoneNo || phoneNoSuccess}
          />
        </RowContainer>
        <RowContainer>
          <BasicTextInput
            placeholder="인증번호 입력"
            onChangeText={setPhoneConfirm}
            width="78%"
            disabled={phoneNoSuccess}
          />
          <BasicButton
            title="확인"
            onPress={phoneConfirmClicked}
            isFilled
            width="20%"
            disabled={!phoneConfirm || phoneNoSuccess}
          />
        </RowContainer>
        <BasicButton
          title="아이디 찾기"
          onPress={findIdClicked}
          isFilled
          smargin="0 0 5px 0"
          disabled={!phoneNoSuccess}
        />
        <BasicButton
          title="비밀번호 재설정"
          onPress={() => navigation.navigate('ResetPw')}
          isFilled
          disabled={!phoneNoSuccess}
        />
      </Container>
    </MainContainer>
  );
}
