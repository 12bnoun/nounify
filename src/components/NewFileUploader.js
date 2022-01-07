import React, { useRef } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  @media screen and (max-width: 480px) {
    margin-left: 20px;
    margin-bottom: 20px;
  }
  @media (max-width: 768px) {
    background: #4b34dd;
    padding: 10px 20px;
    margin-top: 20px;
    margin-left: 10px;
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
  }
`;

const SearchButton = styled.div`
  width: 160px;
  border-bottom: 5px solid black;
  background: #f0f8ff;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  user-select: none; /* supported by Chrome and Opera */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  @media screen and (max-width: 768px) {
    width: 0px;
  }
`;

const FloatB = styled.div`
  height: 70%;
  background: white;
  border-radius: 5px;
  margin-right: 10px;
  padding: 0px 10px;
  border: 1px solid #e0c3fc;
  box-shadow: rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px,
    rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px,
    rgba(240, 46, 170, 0.05) 25px 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    /*background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);*/
    background: #f6eff7;
  }

  @media screen and (max-width: 768px) {
    margin-right: 0px;
  }
`;

const UploadWrapper = styled.div`
  font-family: 'Space Mono', monospace;
  outline: none;
  font-size: 1rem;
  border: 0px;
  border-bottom: 5px solid black;
  background: #f0f8ff;
  width: 200px;
  padding-left: 10px;
  @media screen and (max-width: 786px) {
    width: 54vw;
    font-size: 21px;
  }
`;

const FileName = styled.p`
  padding: 0px;
  margin: 0px;
  font-size: 1rem;
`;

const acceptedFileTypes = ['image/jpg', 'image/jpeg', 'image/png'];

const NewFileUploader = ({ uploadImageFile }) => {
  const hiddenFileInput = useRef(null);

  const userImage = (e) => {
    let file = e.target.files[0];
    if (file && acceptedFileTypes.includes(file['type'])) {
      uploadImageFile(URL.createObjectURL(file));
    }
  };

  return (
    <>
      {/* <Button onClick={() => hiddenFileInput.current.click()}>
        Upload Image
        <input
          type="file"
          ref={hiddenFileInput}
          onChange={(e) => userImage(e)}
          style={{ display: 'none' }}
          accept="image/*"
        />
      </Button> */}
      <UploadWrapper>
        {/* <FileName>No file selected</FileName> */}
      </UploadWrapper>
      <SearchButton>
        <FloatB onClick={() => hiddenFileInput.current.click()}>
          <i className="gg-software-upload"></i>&nbsp;
          {`Upload`}
          <input
            type="file"
            ref={hiddenFileInput}
            onChange={(e) => userImage(e)}
            style={{ display: 'none' }}
            accept="image/*"
          />
        </FloatB>
      </SearchButton>
    </>
  );
};
export default NewFileUploader;
