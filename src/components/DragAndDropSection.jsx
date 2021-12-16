import React from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

const DragContainer = styled.div`
  background: white;
  margin: 0px 20px 20px 20px;
  padding: 6px;
  border-radius: 10px;
  z-index: 2;
  background: #fbfbfa;
  border-style: dashed;
  border-width: 2px;
  text-align: center;
  &:hover {
    background-color: #E8E8E8;
    cursor: pointer;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const DragAndDropSection = ({ uploadImageFile }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpg, image/jpeg, image/png',
    multiple: false,
    onDropAccepted: (files) => checkFiles(files),
  });

  const checkFiles = (input) => {
    let file = input[0];
    if (file) {
      uploadImageFile(URL.createObjectURL(file));
    }
  };

  return (
    <DragContainer {...getRootProps({ className: 'dropzone' })}>
      <input {...getInputProps()} />
      <span>Drag 'n' drop images here or click to upload</span><br/>
      <em>(Only .jpg, .png, .jpeg images accepted)</em>
    </DragContainer>
  );
};

export default DragAndDropSection;
