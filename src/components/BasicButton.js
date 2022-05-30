import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { theme } from '../theme'

const StyledPressable = styled.Pressable`
  background-color: ${(props) =>
    props.isFilled ? theme.buttonBackground : 'transparent'};
  border-radius: 5px;
  width: ${(props) => (props.width ? `${props.width}px` : 'auto')};
  padding: 5px 0;
  /* box-shadow: 5px 5px gray; */
`
const StyledText = styled.Text`
  text-align: center;
  color: ${theme.buttonBackground};
  font-size: ${(props) => {
    switch (props.fontSize) {
      case 'sm':
        return '15px'
      case 'md':
        return '20px'
      case 'lg':
        return '30px'
      default:
        return '15px'
    }
  }};
`

export default function BasicButton({
  title,
  onPress,
  isFilled,
  fontSize,
  width,
}) {
  return (
    <StyledPressable onPress={onPress} isFilled={isFilled} width={width}>
      <StyledText fontSize={fontSize}>{title}</StyledText>
    </StyledPressable>
  )
}

BasicButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  isFilled: PropTypes.bool,
  fontSize: PropTypes.oneOf(['sm, md, lg']),
  width: PropTypes.number,
}
