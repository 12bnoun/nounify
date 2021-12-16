import styled from 'styled-components';

const PaintCanvas = styled.canvas`
  border: 1px solid green;
`;

const ButtonFlip = styled.button`
  background: #4B34DD;
  padding: 10px 20px;
  margin-top: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-family: 'Overpass', sans-serif;
  border: 0px;
  padding-right: 20px;
  border-radius: 25px;
  color: white;
  font-weight: bold;
  font-size: 14px;
  /*border: 1px solid props => props.color ? "#e0c3fc" : "#dbb6c8" };*/
  &:hover {
    /*background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);*/
    /*background-image: linear-gradient(120deg, #B2ABF4 50%, #e0c3fc 50%)*/
  }

  @media screen and (max-width:480px) {
    margin-left: 20px;
    margin-bottom: 20px;
  }
`;

const PaintToolWrapper = styled.div`
  display: flex;
  padding: 20px 15px;
  border-radius: 10px;
  margin-top: 20px;
  z-index: 2;
  background: #FBFBFA;
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0px;
    margin-top: 0px;
    padding-bottom: 20px;
  }
`;

const ToolWrapper = styled.div`
  margin-left: 20px;
`;

const PaintCanvasWrapper = styled.div`
  margin: auto;
`;

const CanvasWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ButtonFlipE = styled.div`
  background: #f6eff7;
  background: #4B34DD;
  margin-top: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-family: 'Overpass', sans-serif;
  border: 0px;
  padding-right: 20px;
  border-radius: 5px;
  color: black;
  font-size: 15px;
  width: 140px;
  font-weight: bold;
  font-size: 14px;
  justify-content: center;
  color: white;
  &:hover {
    background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
  }

  @media screen and (max-width:480px) {
    background: #e0c3fc;
  }
`
const ButtonContainer = styled.div`
  display: flex;
`;

const ContentWrapper = styled.div`
  margin-top: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
`;

export {
  PaintCanvas,
  ButtonFlip,
  PaintToolWrapper,
  ToolWrapper,
  PaintCanvasWrapper,
  CanvasWrapper,
  ButtonFlipE,
  ButtonContainer,
  ContentWrapper
}
