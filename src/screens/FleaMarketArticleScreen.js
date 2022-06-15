import React, { useEffect, useState } from 'react'
import {
  deleteFleaMarketArticleInfo,
  findFleaMarketArticleInfoByArticleId,
} from '../utils/firebase'
import ArticleScreen from './ArticleScreen'

export default function FleaMarketArticleScreen({ navigation, route }) {
  const [info, setInfo] = useState({})
  const { articleId } = route.params

  const loadData = async () => {
    const info = await findFleaMarketArticleInfoByArticleId(articleId)
    setInfo(info)
  }

  useEffect(() => {
    loadData()
  }, [])

  const onDelete = (id) => () => {
    deleteFleaMarketArticleInfo(id)
  }

  return (
    <ArticleScreen
      navigation={navigation}
      route={route}
      info={info}
      onDelete={onDelete(info.id)}
    />
  )
}
