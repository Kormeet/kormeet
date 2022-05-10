import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import PropTypes from 'prop-types'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Sample({ text }) {
  const [existText, setExistText] = useState('')
  const loadSampleText = async () => {
    try {
      const loadedText = await AsyncStorage.getItem('text')
      setExistText(loadedText)
      await AsyncStorage.setItem('text', text)
    } catch (e) {
      console.error(e)
    }
  }
  useEffect(() => {
    loadSampleText()
  }, [])
  return (
    <View>
      <Text>
        before: {existText} / new: {text}
      </Text>
    </View>
  )
}

Sample.propTypes = {
  text: PropTypes.string.isRequired,
}
