import React, { useState, useEffect, useRef } from 'react';
import ButtonHover from './ButtonHover';
import styled from 'styled-components';
import { BsEyedropper } from 'react-icons/bs';
import { IoColorPaletteOutline } from 'react-icons/io5';
import { ChromePicker } from 'react-color';

const ColorOptionsContainer = styled.div`
  height: auto;
  width: 180px;
  border-radius: 10px;
  background: white;
  border: 1px solid #dbb6c8;
  margin: 10px 0px 10px 0px;
  padding: 10px;
  @media screen and (max-width: 480px) {
    width: 100%;
    border: 0px;
    border-radius: 0px;
    height: auto;
  }
`;

const ButtonWrapper = styled.div``;

const ColorButton = styled.div`
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
`;

const Cover = styled.div`
      position: fixed,
      top: 0px,
      right: 0px,
      bottom: 0px,
      left: 0px,
`;

const Popover = styled.div`
      position: absolute,
      zIndex: 2,
    `;

function ClickedOutsidePalette(ref, setColorPaletteVisibility) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setColorPaletteVisibility(false);
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, setColorPaletteVisibility]);
}

const ColorSelectors = ({
  canvas,
  activateEyeDropper,
  flipGlasses,
  removeGlasses,
  setCustomRgbColor,
  customRgbColor,
  addCustomGlasses,
}) => {
  const [colorPaletteVisibility, setColorPaletteVisibility] = useState(false);

  const paletteRef = useRef(null);
  ClickedOutsidePalette(paletteRef, setColorPaletteVisibility);

  const setCustomColor = (color) => {
    let newColor = `rgb(${color.rgb.r},${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
    setCustomRgbColor(newColor);
    addCustomGlasses(newColor);
    // setColorPaletteVisibility(false);
  };

  const customColorHover = (color) => {
    let newColor = `rgb(${color.rgb.r},${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
    setCustomRgbColor(newColor);
  };

  return (
    <>
      <ColorOptionsContainer>
        <span>Set Custom Color</span>
        <ButtonWrapper>
          <div onClick={(e) => activateEyeDropper(e)}>
            <ColorButton buttonText="Eyedropper">
              <BsEyedropper />
              <span>EyeDropper</span>
            </ColorButton>
          </div>
          <div onClick={() => setColorPaletteVisibility(true)}>
            <ColorButton buttonText="Color Picker">
              <IoColorPaletteOutline />
              <span>Palette</span>
            </ColorButton>
          </div>
        </ButtonWrapper>
        {colorPaletteVisibility && (
          <Popover ref={paletteRef}>
            {/* <Cover onClick={() => setColorPaletteVisibility(false)} /> */}
            <ChromePicker
              color={customRgbColor}
              disableAlpha={true}
              // onChange={(color) => customColorHover(color)}
              onChangeComplete={(color) => setCustomColor(color)}
            />
          </Popover>
        )}
      </ColorOptionsContainer>

      <div onClick={() => flipGlasses()}>
        <ButtonHover buttonText="Flip Glasses" />
      </div>
      {canvas.getObjects().length > 1 && (
        <div onClick={() => removeGlasses()}>
          <ButtonHover buttonText="Remove Glasses" />
        </div>
      )}
    </>
  );
};

export default ColorSelectors;
