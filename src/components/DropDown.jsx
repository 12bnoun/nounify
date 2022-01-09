import React, { useState } from 'react';
import styled from 'styled-components';

const Main = styled('div')`
  font-family: sans-serif;
`;

const DropDownContainer = styled('div')`
  width: 8em;
  margin: 0 auto;
  cursor: pointer;
  user-select: none; /* supported by Chrome and Opera */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
`;

const DropDownHeader = styled('div')`
  padding: 0.8em 1em 0.8em 1em;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  font-size: 0.9rem;
  font-family: 'Space Mono', monospace;
  display: flex;
`;

const DropDownListContainer = styled('div')`
  position: absolute;
  z-index: 100;
  width: 8em;
  font-family: 'Space Mono', monospace;
`;

const DropDownList = styled('ul')`
  padding: 0;
  margin: 0;
  /*padding-left: 1em;*/
  background: #ffffff;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  font-size: 0.8rem;
  font-weight: 500;
  font-family: 'Space Mono', monospace;
  &:first-child {
    padding-top: 0.8em;
  }
`;

const ListItem = styled('li')`
  list-style: none;
  padding-left: 1em;
  padding-top: 0.4em;
  padding-bottom: 0.4em;
  font-size: 0.9rem;
  font-family: 'Space Mono', monospace;
  &:hover {
    background: #e0c3fc;
  }
`;

export default function DropDown({
  onCollectionChange,
  options,
  selectedOption,
  setSelectedOption,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);
    onCollectionChange(value);
  };

  return (
    <Main>
      <DropDownContainer>
        <DropDownHeader onClick={toggling}>
          {selectedOption}
          <i className="gg-chevron-down"></i>
        </DropDownHeader>
        {isOpen && (
          <DropDownListContainer>
            <DropDownList>
              {options.map((option, index) => (
                <ListItem onClick={onOptionClicked(option)} key={index}>
                  {option}
                </ListItem>
              ))}
            </DropDownList>
          </DropDownListContainer>
        )}
      </DropDownContainer>
    </Main>
  );
}
