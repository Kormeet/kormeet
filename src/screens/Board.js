import React, { useContext, useEffect, useState } from 'react'
import { Dimensions, Text } from 'react-native'
import styled from 'styled-components/native'
import BasicButton from '../components/BasicButton'
import BasicTextInput from '../components/BasicTextInput'
import ArticleButton from '../components/ArticleButton'
import { findAllArticles, searchBulletinArticles } from '../utils/firebase'
import { ProgressContext } from '../contexts'

const windowHeight = Dimensions.get('window').height

const MainContainer = styled.View`
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  background-color: ${({ theme }) => theme.background};
`

const Container = styled.View`
  width: 75%;
`

const List = styled.ScrollView`
  width: 100%;
  height: ${windowHeight - 250}px;
  margin-top: 15px;
`

const ButtonView = styled.View`
  position: absolute;
  bottom: 25px;
  align-items: flex-end;
`

const EmptyView = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  margin-top: 30px;
`

export default function Board({ navigation, route }) {
  // contexts
  const { spinner } = useContext(ProgressContext)

  // params
  const { articleType } = route.params

  // states
  const [search, setSearch] = useState('')
  const [articles, setArticles] = useState([])
  const [isEmpty, setIsEmpty] = useState(true)
  const [loadingMessage, setLoadingMessage] = useState('loading...')
  const loadArticles = async () => {
    spinner.start()
    setLoadingMessage('loading...')
    const _articles = await findAllArticles({ type: articleType })
    setArticles(_articles)
    if (_articles.length > 0) setIsEmpty(false)
    else {
      setLoadingMessage('게시물이 없습니다.')
      setIsEmpty(true)
    }
    spinner.stop()
  }
  useEffect(() => {
    loadArticles()
  }, [])

  const searchArticle = async () => {
    spinner.start()
    setArticles(await searchBulletinArticles(search))
    spinner.stop()
  }
  return (
    <MainContainer>
      <Container>
        <BasicTextInput
          placeholder="게시물 검색"
          onChangeText={setSearch}
          width="100%"
          value={search}
          smargin="30px 0 0 0"
          onSubmitEditing={searchArticle}
        />
        {isEmpty ? (
          <EmptyView>
            <Text>{loadingMessage}</Text>
          </EmptyView>
        ) : (
          <List showsVerticalScrollIndicator={false}>
            {articles.map((article) => (
              <ArticleButton
                key={article.id}
                title={article.title}
                content={article.content}
                reply={1}
                onPress={() => {
                  navigation.navigate('BulletinBoardArticle', {
                    articleId: article.id,
                  })
                }}
              />
            ))}
          </List>
        )}
      </Container>
      <ButtonView>
        <BasicButton
          title="게시글 작성"
          onPress={() => {
            console.log('게시글 작성 화면으로!!')
          }}
          width="100px"
          isFilled
          fontSize="15px"
        />
      </ButtonView>
    </MainContainer>
  )
}
