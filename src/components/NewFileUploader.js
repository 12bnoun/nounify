import React, { useRef } from 'react';
import styled from 'styled-components';

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
    width: auto;
    margin-right: 10px;
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
      <UploadWrapper></UploadWrapper>
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
