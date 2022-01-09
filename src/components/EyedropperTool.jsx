import React, { forwardRef } from 'react';
import styled from 'styled-components';

const CursorContainer = styled.div`
  visibility: hidden;
  position: fixed;
  margin-left: 15px;
  pointer-events: none;
  z-index: 999999;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 5px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    display: none;
  }
`;

const ColorSwatch = styled.div`
  display: inline-block;
  height: 16px;
  width: 16px;
  margin-left: 5px;
  border-radius: 50%;
`;

const EyedropperTool = (
  { cursorPosition, eyeDropperVisible, customRgbColor },
  ref
) => {
  return (
    <CursorContainer
      ref={ref}
      style={{
        left: `${cursorPosition.x}px`,
        top: `${cursorPosition.y}px`,
      }}
    >
      {eyeDropperVisible && 'Click Image '}
      {eyeDropperVisible && (
        <ColorSwatch
          style={{
            backgroundColor: `${customRgbColor}`,
          }}
        />
      )}
    </CursorContainer>
  );
};

export default forwardRef(EyedropperTool);
