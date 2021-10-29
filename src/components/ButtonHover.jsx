import React from 'react';
import styled from 'styled-components';


const Fill = styled.div`
  font-size: 13px;
  font-weight: 200;
  letter-spacing: 1px;
  padding: 10px 10px 5px;
  outline: 0;
  border: 1px solid #dbb6c8;
  cursor: pointer;
  position: relative;
  background-color: rgba(0, 0, 0, 0);
  display: flex;
  margin-top: 10px;
  width: 180px;

  &:after {
  content: "";
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
`;

class ButtonHover extends React.Component {

  render() {

    const { buttonText } = this.props;
    return (
      <Fill type="button" className="fill">
        <i className="gg-edit-flip-h"></i>&nbsp;{buttonText}
      </Fill>
    );
  }
}

export default ButtonHover;
