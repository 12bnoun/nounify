import React, { useRef } from 'react';
import styled from 'styled-components';

const Button = styled.button`
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

  @media screen and (max-width: 480px) {
    margin-left: 20px;
    margin-bottom: 20px;
  }
`;

const acceptedFileTypes = ['image/jpg', 'image/jpeg', 'image/png'];

const FileUploader = ({ uploadImageFile }) => {
  const hiddenFileInput = useRef(null);

  const userImage = (e) => {
    let file = e.target.files[0];
    if (file && acceptedFileTypes.includes(file['type'])) {
      uploadImageFile(URL.createObjectURL(file));
    }
  };

  return (
    <>
      <Button onClick={() => hiddenFileInput.current.click()}>
        Upload Image
        <input
          type="file"
          ref={hiddenFileInput}
          onChange={(e) => userImage(e)}
          style={{ display: 'none' }}
          accept="image/*"
        />
      </Button>
    </>
  );
};
export default FileUploader;
