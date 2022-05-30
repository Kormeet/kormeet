import React from 'react'
import styled from 'styled-components/native'
import PropTypes from 'prop-types'
import { theme } from '../theme'

const StyledTextInput = styled.TextInput`
  background-color: ${theme.textInputBackground};
  width: ${(props) => (props.width ? `${props.width}px` : 'auto')};
  padding: 5px;
`

export default function BasicTextInput({
  placeholder,
  onChangeText,
  width,
  value,
}) {
  return (
    <StyledTextInput
      placeholder={placeholder}
      onChangeText={onChangeText}
      width={width}
      value={value}
    />
  )
}

BasicTextInput.propTypes = {
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
  width: PropTypes.number,
  value: PropTypes.string.isRequired,
}
