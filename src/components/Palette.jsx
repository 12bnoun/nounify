import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import paletteMap from './PaletteMap.js';

const PaletteWrapper = styled.div`
  height: auto;
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
  height: auto;
  text-align: center;
  padding: 5px 0px 5px 0px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background: #f6eff7;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
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

const InactiveOverlay = styled.div`
  position: absolute;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.2);
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
  const [dimOverlayHeight, setDimOverlayHeight] = useState({
    width: 0,
    height: 0,
  });

  const dimOverlayRef = useRef();
  const paletteRef = useRef();

  useEffect(() => {
    if (paletteRef) {
      setDimOverlayHeight({
        height: paletteRef.current.clientHeight,
        width: paletteRef.current.clientWidth,
      });
    }
  }, [paletteRef]);

  return (
    <div>
      <PaletteWrapper>
        <PaletteHeader>{'Edit Glasses'}</PaletteHeader>
        {!activeSelectedItem && (
          <InactiveOverlay
            ref={dimOverlayRef}
            dimensions={dimOverlayHeight}
            style={{
              height: dimOverlayHeight.height,
              width: dimOverlayHeight.width,
            }}
          />
        )}
        <PaletteBody ref={paletteRef}>
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
      {/* )} */}
    </div>
  );
};

export default Palette;
