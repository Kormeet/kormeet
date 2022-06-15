import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components/native'
import { Text } from 'react-native'
import ArticleButton from '../components/ArticleButton'
import { findAllArticles } from '../utils/firebase'
import { ProgressContext } from '../contexts'

const MainContainer = styled.View`
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  height: 100%;
`

const Container = styled.ScrollView`
  height: 100%;
  width: 80%;
  margin-top: 20px;
  margin-bottom: 30px;
`

const BlankContainer = styled.View`
  height: 20px;
`

export default function MainPage({ navigation }) {
  const { spinner } = useContext(ProgressContext)

  const [bulletins, setBulletins] = useState([])
  const [fleas, setFleas] = useState([])
  const [jobSearchs, setJobSearchs] = useState([])

  const loadBulletins = async () => {
    setBulletins(await findAllArticles({ type: 'BULLETIN', limit: 3 }))
  }
  const loadFleas = async () => {
    setFleas(await findAllArticles({ type: 'FLEA_MARKET', limit: 3 }))
  }
  const loadJobSearchs = async () => {
    setJobSearchs(await findAllArticles({ type: 'JOB_SEARCH', limit: 3 }))
  }

  const loadArticles = async () => {
    await loadBulletins()
    await loadFleas()
    await loadJobSearchs()
  }

  const onMounted = async () => {
    spinner.start()
    await loadArticles()
    spinner.stop()
  }

  useEffect(() => {
    onMounted()
  }, [])
  useEffect(() => {
    return navigation.addListener('focus', loadArticles)
  }, [navigation])

  const listArticleButtons = (articleScreen, articles) => {
    return articles.length > 0 ? (
      articles.map((article) => (
        <ArticleButton
          key={article.id}
          title={article.title}
          content={article.content}
          reply={article.repliesCount}
          onPress={() => {
            navigation.navigate(articleScreen, {
              articleId: article.id,
            })
          }}
        />
      ))
    ) : (
      <Text>게시물이 없습니다.</Text>
    )
  }

  return (
    <MainContainer>
      <Container showsVerticalScrollIndicator={false}>
        <Text>최근 게시글</Text>
        {listArticleButtons('BulletinBoardArticle', bulletins)}
        <BlankContainer />
        <Text>최근 중고장터</Text>
        {listArticleButtons('FleaMarketArticle', fleas)}
        <BlankContainer />
        <Text>최근 구인구직</Text>
        {listArticleButtons('JobSearchArticle', jobSearchs)}
      </Container>
    </MainContainer>
  )
}
