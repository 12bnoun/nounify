import React, { forwardRef } from 'react';

const EyedropperTool = (
  { cursorPosition, eyeDropperVisible, customRgbColor },
  ref
) => {
  return (
    <div
      ref={ref}
      className="custom-color-cursor"
      style={{
        left: `${cursorPosition.x}px`,
        top: `${cursorPosition.y}px`,
        visibility: 'hidden',
        position: 'fixed',
        marginLeft: '20px',
        pointerEvents: 'none',
        zIndex: 999999,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
      }}
    >
      {eyeDropperVisible ? 'Click to Select: ' : 'Hover Image to Select'}
      {eyeDropperVisible && (
        <div
          style={{
            display: 'inline-block',
            height: '15px',
            width: '15px',
            backgroundColor: `${customRgbColor}`,
          }}
        />
      )}
    </div>
  );
};

export default forwardRef(EyedropperTool);
