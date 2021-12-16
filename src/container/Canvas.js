import React from 'react';
import styled from 'styled-components';
import Paint from '../components/Paint';

import bg from '../components/bg.png';

const Nouns = styled.div`
  overflow-x: hidden;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  @media (max-width: 768px) {
    height: auto;
  }
`;

const Bg = styled.div`
  background-image: url(${bg});
  background-size: cover;
  height: 100vh;
  width: 100vw;
  position: absolute;
  opacity: 0.1;
  z-index: -1;
`;

class Canvas extends React.Component {

  render() {
    return (
      <div>
        <Nouns>
          <Bg />
          <Paint />
        </Nouns>
      </div>
    );
  }
}

export default Canvas;
