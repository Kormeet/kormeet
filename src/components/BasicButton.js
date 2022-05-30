import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { theme } from '../theme';

const StyledPressable = styled.Pressable`
  background-color: ${props =>
    props.isFilled ? theme.buttonBackground : 'transparent'};
  border-radius: 5px;
  width: ${props => (props.width ? props.width : 'auto')};
  padding: 5px 0;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  margin: ${props => (props.smargin ? props.smargin : '0')};
`;
const StyledText = styled.Text`
  text-align: center;
  color: ${props => (props.isFilled ? 'white' : theme.buttonBackground)};
  font-size: ${props => {
    switch (props.fontSize) {
      case 'sm':
        return '15px';
      case 'md':
        return '20px';
      case 'lg':
        return '30px';
      default:
        return '15px';
    }
  }};
`;

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
  );
}

BasicButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  isFilled: PropTypes.bool,
  fontSize: PropTypes.oneOf(['sm, md, lg']),
  width: PropTypes.string,
  smargin: PropTypes.string,
  disabled: PropTypes.bool,
};
