import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { BsEyedropper } from 'react-icons/bs';
import { IoColorPaletteOutline } from 'react-icons/io5';
import { BsTrash } from 'react-icons/bs';
import { CgEditFlipH } from 'react-icons/cg';
import { ChromePicker } from 'react-color';
import IconButton from './IconButton';

const ButtonText = styled.p`
  margin: 0px;
  padding: 0px;
  text-align: center;
  margin-left: 5px;
`;

const ColorButton = styled.button`
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
  activeSelectedItem,
  eyeDropperVisible,
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

  return (
    <>
      {window.innerWidth > 768 ? (
        <IconButton
          ButtonIcon={BsEyedropper}
          buttonText={'EyeDropper'}
          clickEvent={activateEyeDropper}
          disabled={activeSelectedItem ? false : true}
        />
      ) : (
        <IconButton
          ButtonIcon={BsEyedropper}
          buttonText={eyeDropperVisible ? 'Tap Image to Select' : 'EyeDropper'}
          clickEvent={activateEyeDropper}
          disabled={activeSelectedItem ? false : true}
        />
      )}

      {!colorPaletteVisibility && (
        <ColorButton
          disabled={activeSelectedItem ? false : true}
          onClick={() => setColorPaletteVisibility(true)}
        >
          <IoColorPaletteOutline size={20} />
          <ButtonText>Palette</ButtonText>
        </ColorButton>
      )}

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

      <IconButton
        ButtonIcon={CgEditFlipH}
        buttonText={'Flip Glasses'}
        clickEvent={flipGlasses}
        disabled={activeSelectedItem ? false : true}
      />
      {canvas && canvas.getObjects().length > 1 && (
        <IconButton
          ButtonIcon={BsTrash}
          buttonText={'Remove Glasses'}
          clickEvent={removeGlasses}
          disabled={activeSelectedItem ? false : true}
        />
      )}
    </>
  );
};

export default ColorSelectors;
