import React from 'react';
import styled from 'styled-components';
import paletteMap from './PaletteMap.js';

const PaletteWrapper = styled.div`
  height: 200px;
  width: 200px;
  border-radius: 10px;
  background: white;
  border: 1px solid #dbb6c8;

  @media screen and (max-width:480px) {
    width: 100%;
    border: 0px;
    border-radius: 0px;
    height: auto;
  }
`;

const Color = styled.div`
  border-radius: 50%;
  width: 18px;
  height: 18px;
  box-sizing: border-box;
  border-width: 7px;
  border-style: solid;
  border-color: ${props => `${props.first} ${props.second} ${props.third} ${props.fourth}`};
  transform: rotate(45deg);
  cursor: pointer;
`;

const ColorCover = styled.div`
  width: 27px;
  height: 27px;
  border-radius: 50%;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  margin-bottom: 5px;
  border: 2px solid #f6eff7;
  cursor: pointer;
  &:hover {
    border: 2px solid #dbb6c8;
  }
`;

const PaletteHeader = styled.div`
  height: 40px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background: #f6eff7;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width:480px) {
    justify-content: flex-start;
    padding-left: 20px;
    border-radius: 0px;
  }
`;

const PaletteBody = styled.div`
  display: flex;
  padding: 10px;
  flex-wrap: wrap;
`;

function ColorCovered({ chooseColor }) {
  return (
      paletteMap.map(({fileName, first, second, third, fourth}) => {
        return (
          <ColorCover key={fileName} onClick={() => chooseColor(fileName)}>
            <Color key={fileName} first={first} second={second} third={third} fourth={fourth}></Color>
          </ColorCover>
        )
      })
  )
}

class Palette extends React.Component {

  render() {

    const { chooseColor } = this.props;
    return (
      <div>
        <PaletteWrapper>
          <PaletteHeader>Select glasses</PaletteHeader>
          <PaletteBody>
            <ColorCovered chooseColor={chooseColor} />
          </PaletteBody>
        </PaletteWrapper>
      </div>
    );
  }
}

export default Palette;
