import React, { useState } from 'react';
import styled from 'styled-components';
import paletteMap from './PaletteMap.js';

const PaletteWrapper = styled.div`
  height: 200px;
  width: 200px;
  border-radius: 10px;
  background: white;
  border: 1px solid #dbb6c8;

  @media screen and (max-width: 480px) {
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
  border-color: ${(props) =>
    `${props.first} ${props.second} ${props.third} ${props.fourth}`};
  transform: rotate(45deg);
  cursor: pointer;
`;

const CustomColor = styled.div`
  border-radius: 50%;
  width: 18px;
  height: 18px;
  box-sizing: border-box;
  border-width: 7px;
  border-style: solid;
  border-color: ${(props) => `${props.color}`};
  transform: rotate(45deg);
  cursor: pointer;
  margin-left: 5px;
`;

const CustomColorContainer = styled.div`
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  margin-bottom: 5px;
  border: 2px solid #f6eff7;
  border-radius: 8px;
  cursor: pointer;
  padding: 2px 5px 2px 5px;
  &:hover {
    border: 2px solid #dbb6c8;
  }
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

const CustomSection = styled.div`
  display: block;
`;

const PaletteHeader = styled.div`
  height: 40px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background: #f6eff7;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 480px) {
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

const ButtonFlip = styled.button`
  background: #4b34dd;
  padding: 5px 10px 5px 10px;
  margin-left: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-family: 'Overpass', sans-serif;
  border: 0px;
  border-radius: 25px;
  color: white;
  font-weight: bold;
  font-size: 12px;
  /*border: 1px solid props => props.color ? "#e0c3fc" : "#dbb6c8" };*/
  &:hover {
    /*background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);*/
    /*background-image: linear-gradient(120deg, #B2ABF4 50%, #e0c3fc 50%)*/
  }
`;

const DimOverlay = styled.div`
  position: absolute;
  height: 160px;
  width: 200px;
  display: block;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: 0px 0px 10px 10px;
  @media screen and (max-width: 768px) {
    position: absolute;
    height: 100px;
    width: 100vw;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.25);
    border-radius: 0px 0px 10px 10px;
  }
`;

function ColorCovered({ chooseColor }) {
  return paletteMap.map(({ fileName, first, second, third, fourth }) => {
    return (
      <ColorCover key={fileName} onClick={() => chooseColor(fileName)}>
        <Color
          key={fileName}
          first={first}
          second={second}
          third={third}
          fourth={fourth}
        ></Color>
      </ColorCover>
    );
  });
}

const Palette = ({
  activeSelectedItem,
  canvas,
  chooseColor,
  resetGlassesPosition,
  addCustomGlasses,
  customRgbColor,
}) => {
  const customColorSelector = (e) => {
    // let ctx = canvas.getContext("2d");
    // // get the current mouse position
    // var mouse = canvas.getPointer(e.e);
    // var x = parseInt(mouse.x);
    // var y = parseInt(mouse.y);
    // // get the color array for the pixel under the mouse
    // var px = ctx.getImageData(x, y, 1, 1).data;
    // // report that pixel data
    // console.log('Pixel color: At [' + x + ' / ' + y + ']: Red/Green/Blue/Alpha = [' + px[0] + ' / ' + px[1] + ' / ' + px[2] + ' / ' + px[3] + ']')
    // const eyeDropper = new window.EyeDropper();
    // let controller = new AbortController();
    // try {
    //   const result = await eyeDropper.open({ signal: controller.signal });
    //   setCustomRgbColor(result.sRGBHex);
    //   return result.sRGBHex;
    // } catch (e) {
    //   return null;
    // }
  };

  return (
    <div>
      {!activeSelectedItem && (
        <PaletteWrapper>
          <PaletteHeader>{'Select Glasses to Edit'}</PaletteHeader>
          <DimOverlay />
          <PaletteBody>
            <ColorCovered chooseColor={chooseColor} />
            <CustomSection>
              <CustomColorContainer
                key={9999}
                onClick={() => addCustomGlasses(customRgbColor)}
              >
                {`Custom`}
                <CustomColor color={customRgbColor} />
              </CustomColorContainer>
            </CustomSection>
          </PaletteBody>
        </PaletteWrapper>
      )}
      {activeSelectedItem && (
        <PaletteWrapper>
          <PaletteHeader>{'Edit Glasses'}</PaletteHeader>
          <PaletteBody>
            <ColorCovered chooseColor={chooseColor} />
            <CustomSection>
              <CustomColorContainer
                key={9999}
                onClick={() => addCustomGlasses(customRgbColor)}
              >
                {`Custom`}
                <CustomColor color={customRgbColor} />
              </CustomColorContainer>
            </CustomSection>
          </PaletteBody>
          {/* <ButtonFlip onClick={() => resetGlassesPosition()}>Reset</ButtonFlip> */}
        </PaletteWrapper>
      )}
    </div>
  );
};

export default Palette;
