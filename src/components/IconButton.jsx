import React from 'react';
import styled from 'styled-components';

const ContentsHolder = styled.button`
  font-size: 13px;
  font-weight: 200;
  letter-spacing: 1px;
  padding: 10px 10px 5px;
  outline: 0;
  border: 1px solid #dbb6c8;
  cursor: pointer;
  position: relative;
  background-color: rgb(0, 0, 0, 0);
  display: flex;
  margin-top: 10px;
  align-items: center;
  &:after {
    content: '';
    background-color: #f6eff7;
    width: 100%;
    z-index: -1;
    position: absolute;
    height: 100%;
    top: 7px;
    left: 7px;
    transition: 0.2s;
  }

  &:hover::after {
    top: 0px;
    left: 0px;
  }
  &:hover {
    background-color: #f6eff7;
  }
  &:disabled {
    pointer-events: none;
  }
`;

const ButtonText = styled.p`
  margin: 0px;
  padding: 0px;
  text-align: center;
  margin-left: 7px;
`;

const IconButton = ({ ButtonIcon, buttonText, clickEvent, disabled }) => {
  return (
    <ContentsHolder
      disabled={disabled}
      onClick={() => (disabled ? null : clickEvent())}
    >
      <ButtonIcon size={20} />
      <ButtonText>{buttonText}</ButtonText>
    </ContentsHolder>
  );
};

export default IconButton;
