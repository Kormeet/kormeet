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

const WarningText = styled.Text`
  color: red;
`;

export default function ChangeInfo({ navigation }) {
  // 필드 값
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [pwConfirm, setPwConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  // 버튼 활성화 여부
  const [disabled, setDisabled] = useState(true);
  // 인증 및 중복확인 여부
  const [idSuccess, setIdSuccess] = useState(false);
  const [nicknameSuccess, setNicknameSuccess] = useState(false);
  // Warning Texts
  const [emailWT, setEmailWT] = useState('');
  const [passwordWT, setPasswordWT] = useState('');

  useEffect(() => {
    setDisabled(
      !(
        id &&
        pw &&
        pwConfirm &&
        nickname &&
        idSuccess &&
        nicknameSuccess &&
        passwordWT === ''
      )
    );
  }, [id, pw, pwConfirm, nickname, idSuccess, nicknameSuccess]);

  useEffect(() => {
    if (!id) setEmailWT('');
    else if (
      !/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/.test(
        id
      )
    )
      setEmailWT('이메일 형식에 맞지 않습니다.');
    else setEmailWT('');
  }, [id]);

  useEffect(() => {
    if (!pw) setPasswordWT('');
    else if (pw.length < 6) setPasswordWT('비밀번호는 6자 이상이어야 합니다.');
    else if (pw !== pwConfirm) setPasswordWT('비밀번호가 일치하지 않습니다.');
    else setPasswordWT('');
  }, [pw, pwConfirm]);

  const idChanged = value => {
    if (idSuccess === true) setIdSuccess(false);
    setId(value);
  };

  const nicknameChanged = value => {
    if (nicknameSuccess === true) setNicknameSuccess(false);
    setNickname(value);
  };

  const nicknameConfirmClicked = () => {
    if (true) {
      // 중복없다고 가정
      Alert.alert('사용 가능한 닉네임입니다.');
      console.log('(미구현) 중복 확인되지 않음');
      setNicknameSuccess(true);
    }
  };

  const idConfirmClicked = () => {
    if (true) {
      // 중복없다고 가정
      Alert.alert('이메일 중복 확인', '사용가능한 이메일입니다.');
      console.log('(미구현) 중복 확인되지 않음');
      setIdSuccess(true);
    }
  };

  const changeInfoClicked = () => {
    Alert.alert(
      '개인정보 변경',
      '회원님의 개인정보가 정상적으로 변경되었습니다.',
      [
        {
          text: '확인',
          onPress: () => {
            navigation.navigate('MyInfo');
            console.log('(미구현) 개인정보 변경되지 않음');
          },
        },
      ]
    );
  };

  return (
    <MainContainer>
      <Container>
        <FormView>
          <StyledLabel>이메일</StyledLabel>
          <RowContainer>
            <BasicTextInput
              placeholder="이메일 입력"
              onChangeText={idChanged}
              width="78%"
            />
            <BasicButton
              title="중복확인"
              onPress={idConfirmClicked}
              isFilled
              width="20%"
              disabled={!id || idSuccess || emailWT !== ''}
            />
          </RowContainer>
          <WarningText>{emailWT}</WarningText>
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
          <WarningText>{passwordWT}</WarningText>
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
          title="개인정보 변경"
          onPress={changeInfoClicked}
          isFilled
          disabled={disabled}
        />
      </Container>
    </MainContainer>
  );
}
