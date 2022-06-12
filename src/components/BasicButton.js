import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { theme } from '../theme'

const StyledPressable = styled.Pressable`
  background-color: ${(props) =>
    props.isFilled ? theme.buttonBackground : 'transparent'};
  border-radius: 5px;
  width: ${(props) => (props.width ? props.width : 'auto')};
  padding: 5px 5px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  margin: ${(props) => (props.smargin ? props.smargin : '0')};
  justify-content: center;
  align-items: center;
`
const StyledText = styled.Text`
  text-align: center;
  color: ${(props) => (props.isFilled ? 'white' : theme.buttonBackground)};
  font-size: ${(props) => (props.fontSize ? props.fontSize : '20px')};
`

export default function BasicButton({
  title,
  onPress,
  isFilled,
  fontSize,
  width,
  smargin,
  disabled,
}) {
  return (
    <StyledPressable
      onPress={onPress}
      isFilled={isFilled}
      width={width}
      smargin={smargin}
      disabled={disabled}
    >
      <StyledText fontSize={fontSize} isFilled={isFilled}>
        {title}
      </StyledText>
    </StyledPressable>
  )
}

BasicButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  isFilled: PropTypes.bool,
  fontSize: PropTypes.string,
  width: PropTypes.string,
  smargin: PropTypes.string,
  disabled: PropTypes.bool,
}
