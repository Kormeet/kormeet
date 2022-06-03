import React, { useEffect, useState } from 'react';
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

export default function Signup({ navigation }) {
  // 필드 값
  const [phoneNo, setPhoneNo] = useState('');
  const [phoneConfirm, setPhoneConfirm] = useState('');
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [pwConfirm, setPwConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  // 버튼 활성화 여부
  // const [phoneNoDisabled, setPhoneNoDisabled] = useState(true);
  // const [idDisabled, setIdDisabled] = useState(true);
  // const [nicknameDisabled, setNicknameDisabled] = useState(true);
  const [disabled, setDisabled] = useState(true);
  // 인증 및 중복확인 여부
  const [phoneNoSuccess, setPhoneNoSuccess] = useState(false);
  const [idSuccess, setIdSuccess] = useState(false);
  const [nicknameSuccess, setNicknameSuccess] = useState(false);

  useEffect(() => {
    setDisabled(
      !(
        id &&
        pw &&
        pwConfirm &&
        nickname &&
        phoneNoSuccess &&
        idSuccess &&
        nicknameSuccess
      )
    );
  }, [id, pw, pwConfirm, nickname, phoneNoSuccess, idSuccess, nicknameSuccess]);

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

  const idChanged = value => {
    if (idSuccess === true) setIdSuccess(false);
    setId(value);
  };

  const idConfirmClicked = () => {
    //중복확인 코드
    //만약 (중복없다면)
    // 사용가능한 아이디입니다.(// 경고 메시지로 수정)
    Alert.alert('ㅇㅈ', 'ㅇㅈ');
    setIdSuccess(true);
    // 만약 (중복있다면)
    // 알림메시지 사용할 수 없는 아이디입니다. (// 경고 메시지로 수정)
  };

  const nicknameChanged = value => {
    if (nicknameSuccess === true) setNicknameSuccess(false);
    setNickname(value);
  };

  const nicknameConfirmClicked = () => {
    //중복확인 코드
    //만약 (중복없다면)
    // 사용가능한 닉네임입니다. (// 경고 메시지로 수정)
    Alert.alert('', 'ㅇㅈ');
    setNicknameSuccess(true);
    // 만약 (중복있다면)
    // 알림메시지 사용할 수 없는 닉네임입니다. (// 경고 메시지로 수정)
  };

  const signupClicked = () => {
    if (pw === pwConfirm) {
      Alert.alert('회원가입', '가입해주셔서 감사합니다. {누구누구}님!', [
        {
          text: '확인',
          onPress: () => {
            navigation.navigate('Login');
          },
        },
      ]);
    } else {
      // 경고 메시지로 수정
      Alert.alert('회원가입', '비밀번호가 일치하지 않습니다', [
        { text: '확인' },
      ]);
    }
  };

  return (
    <MainContainer>
      <Container>
        <FormView>
          <StyledLabel>전화번호</StyledLabel>
          <RowContainer>
            <BasicTextInput
              placeholder="전화번호 입력"
              onChangeText={setPhoneNo}
              width="78%"
              disabled={phoneNoSuccess}
              keyboardType="decimal-pad"
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
              keyboardType="decimal-pad"
            />
            <BasicButton
              title="확인"
              onPress={phoneConfirmClicked}
              isFilled
              width="20%"
              disabled={!phoneConfirm || phoneNoSuccess}
            />
          </RowContainer>
        </FormView>

        <FormView>
          <StyledLabel>아이디</StyledLabel>
          <RowContainer>
            <BasicTextInput
              placeholder="아이디 입력"
              onChangeText={idChanged}
              width="78%"
            />
            <BasicButton
              title="중복확인"
              onPress={idConfirmClicked}
              isFilled
              width="20%"
              disabled={!id || idSuccess}
            />
          </RowContainer>
        </FormView>

        <FormView>
          <StyledLabel>비밀번호</StyledLabel>
          <BasicTextInput
            placeholder="비밀번호 입력"
            onChangeText={setPw}
            secureTextEntry
          />
          <StyledLabel>비밀번호 확인</StyledLabel>
          <BasicTextInput
            placeholder="비밀번호 입력"
            onChangeText={setPwConfirm}
            secureTextEntry
          />
        </FormView>

        <FormView>
          <StyledLabel>닉네임</StyledLabel>
          <RowContainer>
            <BasicTextInput
              placeholder="닉네임 입력"
              onChangeText={nicknameChanged}
              width="78%"
            />
            <BasicButton
              title="중복확인"
              onPress={nicknameConfirmClicked}
              isFilled
              width="20%"
              disabled={!nickname || nicknameSuccess}
            />
          </RowContainer>
        </FormView>
        <BasicButton
          title="회원 가입 버튼"
          onPress={signupClicked}
          isFilled
          disabled={disabled}
        />
      </Container>
    </MainContainer>
  );
}
