import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { theme } from '../theme';

const StyledTextInput = styled.TextInput`
  background-color: ${theme.textInputBackground};
  font-size: ${props => (props.fontSize ? props.fontSize : '20px')};
  width: ${props => (props.width ? props.width : 'auto')};
  margin: ${props => (props.smargin ? props.smargin : '0')};
  padding: 5px;
`;

export default function BasicTextInput({
  placeholder,
  onChangeText,
  fontSize,
  width,
  smargin,
  value,
}) {
  return (
    <StyledTextInput
      placeholder={placeholder}
      onChangeText={onChangeText}
      fontSize={fontSize}
      width={width}
      smargin={smargin}
      value={value}
    />
  );
}

BasicTextInput.propTypes = {
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
  fontSize: PropTypes.string,
  width: PropTypes.string,
  smargin: PropTypes.string,
  value: PropTypes.string.isRequired,
};
