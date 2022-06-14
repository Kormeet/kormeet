import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import styled from 'styled-components/native'
import BasicTextInput from '../components/BasicTextInput'
import BasicButton from '../components/BasicButton'
import { Text } from 'react-native';

const MainContainer = styled.View`
align-items: center;
background-color: ${({ theme }) => theme.background};
padding-top: 50px;
height: 100%;
`

const Container = styled.View`
  width: 80%;
`

const BlankContainer = styled.View`
  height: 15%
`

const BlankContainerTitle = styled.View`
  height: 5%
`

export default function BulletinBoardWrite({ navigation, route }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

      return (
        <MainContainer>
          <Container>
          <BasicTextInput
          onChangeText={setTitle}
          placeholder="제목"
          fontSize="20px"
          width="100%"
          smargin="0 0 5px 0"
          value={title}/>
          <BlankContainerTitle/>
          <BasicTextInput
          onChangeText={setContent}
          placeholder="내용"
          fontSize="20px"
          smargin="0 0 5px 0"
          value={content}
          height="50%"
          multiline={true}/>
          <BlankContainer/>
          <BasicButton
          title="작성하기"
          onPress={() => {
            console.log('글 작성')
          }}
          fontSize="30px"
          width="100%"
          smargin="0 0 5px 0"
          isFilled
        />
          </Container>
        </MainContainer>
      );
  
}
