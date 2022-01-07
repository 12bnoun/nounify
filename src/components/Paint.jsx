import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { fabric } from 'fabric';
import PFPService from '../services/PFPService.js';

import glassMap from './glasses/GetGlasses.js';

import Palette from './Palette';
import Search from './SearchGroup';

import ButtonHover from './ButtonHover';

import notfound from './notfound.png';
import default_lastpunk from './9999.png';
import default_background from './default.png';

import FileUploader from './FileUploader.jsx';
import GlassesSvgString from './GlassesSvgString.jsx';

import DragAndDropSection from './DragAndDropSection.jsx';

import { calculateAspectRatioFit, ConvertRGBtoHex } from '../utils/utils';
import ColorSelectors from './ColorSelectors';
import EyedropperTool from './EyedropperTool';

import {
  PaintCanvas,
  ButtonFlip,
  PaintToolWrapper,
  ToolWrapper,
  PaintCanvasWrapper,
  CanvasWrapper,
  ButtonFlipE,
  ButtonContainer,
  ContentWrapper,
  CanvasContainer,
} from '../styles/PaintStyles';

const ZDiv = styled.div`
  z-index: 3;
`;

const FlipWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const IconWrapper = styled.div`
  background: pink;
  padding: 10px 10px;
`;

const MOBILE_MAX_WIDTH = 738;

const glassesEditOptions = {
  borderColor: 'red',
  cornerColor: 'red',
  cornerSize: 10,
  transparentCorners: true,
};

const Paint = () => {
  const [bgFlip, setBgFlip] = useState(false);
  const [canvas, setCanvas] = useState(null);
  const [glassFlip, setGlassesFlip] = useState(false);
  const [collection, setCollection] = useState('UPLOAD');
  const [id, setId] = useState('9999');
  const [bgUrl, setBgUrl] = useState(default_background);
  const [downloadPng, setDownloadPng] = useState(false);
  const [canvasDataURL, setCanvasDataURL] = useState(null);
  const [uploadedImageFile, setUploadedImageFile] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [activeSelectedItem, setActiveSelectedItem] = useState(null);
  const [eyeDropperVisible, setEyeDropperVisible] = useState(false);

  const [cursorContent, setCursorContent] = useState('Hover image');
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const [customRgbColor, setCustomRgbColor] = useState('rgb(0, 0, 0)');

  const colorCursorRef = useRef();

  const switchGlasses = (fileName) => {
    // this.renderGlasses(glassMap.get(fileName));

    let activeGlasses = canvas.getActiveObjects();

    if (canvas.getObjects().length === 1) {
      renderGlasses(glassMap.get(fileName));
    } else if (canvas.getActiveObjects().length > 0) {
      let obj = activeGlasses[0];
      const {
        top,
        left,
        height,
        width,
        scaleX,
        scaleY,
        flipX,
        aCoords,
        angle,
      } = obj;
      //  canvas.remove(obj);

      fabric.Image.fromURL(glassMap.get(fileName), (oImg) => {
        let item = oImg;
        item = oImg.set({
          flipX: flipX,
          top: top,
          left: left,
          height: height,
          width: width,
          scaleX: scaleX,
          scaleY: scaleY,
          aCoords: aCoords,
          angle: angle,
          ...glassesEditOptions,
        });
        canvas.remove(obj);

        canvas.add(item);
        canvas.setActiveObject(item);
        canvas.renderAll();
      });
    }

    // activeGlasses.forEach((obj) => {
    //   let huh = '';
    //   let item = obj;
    //   const { top, left, height, width } = obj;
    //   //  canvas.remove(obj);
    //   fabric.Image.fromURL(glassMap.get(fileName), (oImg) => {
    //     item = oImg.set({
    //       flipX: glassFlip,
    //       top: top,
    //       left: left,
    //       height: height,
    //       width: width,
    //     });
    //     canvas.remove(obj);
    //     canvas.add(item);
    //   });
    // });
  };

  const onIdChange = (value) => {
    setId(value);
  };

  const onCollectionChange = (collection) => {
    setCollection(collection);
    setUploadedImageFile(null);

    if (collection !== 'UPLOAD') {
      updateBg(collection, id);
    }
  };

  const flipBg = () => {
    // const { bgFlip, canvas, bgUrl, uploadedImageFile } = this.state;
    const { width, height } = window.screen;
    fabric.Image.fromURL(
      bgUrl,
      (img, isError) => {
        setBgFlip(!bgFlip);

        /* Flip img and update background */
        img.set({ flipX: !bgFlip });

        // If flipping user image background, must resize
        if (uploadedImageFile) {
          let resizeRatio;

          if (isMobile()) {
            resizeRatio = calculateAspectRatioFit(
              img.width,
              img.height,
              width,
              height * 0.6
            );
            img.set({
              top: 0,
              left: 0,
              scaleX: resizeRatio,
              scaleY: resizeRatio,
            });

            canvas.setDimensions({
              width: resizeRatio * img.width,
              height: resizeRatio * img.height,
            });
          } else {
            resizeRatio = calculateAspectRatioFit(
              img.width,
              img.height,
              width * 0.6,
              height * 0.6
            );
            img.set({
              top: 0,
              left: 0,
              scaleX: resizeRatio,
              scaleY: resizeRatio,
            });
            canvas.setDimensions({
              width: resizeRatio * img.width,
              height: resizeRatio * img.height,
            });
          }
        } else {
          //  flipping NFT picture
          if (isMobile()) {
            img.set({
              top: 0,
              left: 0,
              scaleX: width / img.width,
              scaleY: width / img.height,
            });
          }
        }

        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
      },
      { crossOrigin: 'anonymous' }
    );
  };

  const renderGlasses = (fileName) => {
    fabric.Image.fromURL(fileName, (oImg) => {
      let item = oImg;
      if (canvas && canvas.item(0)) {
        const { top, left, scaleX, scaleY, flipX, aCoords, angle } =
          canvas.item(0);
        canvas.remove(canvas.item(0));

        item = oImg.set({
          flipX: flipX,
          top: top,
          left: left,
          scaleX: scaleX,
          scaleY: scaleY,
          aCoords: aCoords,
          angle: angle,
          ...glassesEditOptions,
        });

        canvas.add(item);
        canvas.setActiveObject(item);
        canvas.renderAll();
      }
    });
  };

  const flipGlasses = () => {
    let activeGlasses = canvas.getActiveObjects();
    let currentGlasses = activeGlasses[0];
    const { aCoords, flipX } = currentGlasses;

    /* is aCoords actually required? */
    const item = currentGlasses.set({ flipX: !flipX, aCoords: aCoords });
    canvas.remove(currentGlasses);
    canvas.add(item);
    canvas.setActiveObject(item);
    canvas.renderAll();

    setGlassesFlip(!glassFlip);
  };

  const search = () => {
    setUploadedImageFile(null);
    updateBg(collection, id);
  };

  const isMobile = () => {
    const { width } = window.screen;
    return width <= MOBILE_MAX_WIDTH;
  };

  useEffect(() => {
    document.addEventListener('mousemove', mouseMoveHandler);

    let newCanvas = new fabric.Canvas('c');
    const { width } = window.screen;

    fabric.Image.fromURL(default_background, (img, isError) => {
      if (isMobile()) {
        img.set({
          top: 0,
          left: 0,
          scaleX: width / img.width,
          scaleY: width / img.height,
        });

        newCanvas.setDimensions({ width: width, height: width });
      } else {
        newCanvas.setDimensions({ width: img.width, height: img.height });
      }

      newCanvas.setBackgroundImage(img, newCanvas.renderAll.bind(newCanvas));
    });

    newCanvas.hoverCursor = 'pointer';

    fabric.Image.fromURL(glassMap.get('glasses-rgb.svg'), (oImg) => {
      oImg.on('selected', function () {
        setActiveSelectedItem(oImg);
      });
      oImg.set(glassesEditOptions);
      newCanvas.add(oImg);
    });

    setCanvas(newCanvas);
  }, []);

  useEffect(() => {
    if (canvas) {
      // temp state holder as state update race condition
      let tempEyeDropperState = eyeDropperVisible;
      let activeObjects = canvas.getActiveObjects();
      let activeObject = activeObjects[0];

      canvas.on('mouse:down', function (options) {
        if (tempEyeDropperState) {
          if (options.pointer) {
            let ctx = canvas.getContext('2d');

            // get the color array for the pixel under the mouse
            var px = ctx.getImageData(
              options.pointer.x,
              options.pointer.y,
              1,
              1
            ).data;
            colorCursorRef.current.style.visibility = 'hidden';
            setCustomRgbColor(`rgb(${px[0]}, ${px[1]}, ${px[2]}, ${px[3]})`);

            addCustomGlasses(`rgb(${px[0]}, ${px[1]}, ${px[2]}, ${px[3]})`);
            //update eyedropper state
            tempEyeDropperState = false;
            setEyeDropperVisible(false);
            if (activeObject) {
              canvas.setActiveObject(activeObject);
              setActiveSelectedItem(activeObject);
            }
          }
        } else {
          if (options.target) {
            setActiveSelectedItem(options.target);
          } else {
            setActiveSelectedItem(null);
          }
        }
      });

      canvas.on('mouse:move', function (options) {
        if (tempEyeDropperState && options.pointer) {
          let ctx = canvas.getContext('2d');

          // get the color array for the pixel under the mouse
          var px = ctx.getImageData(
            options.pointer.x,
            options.pointer.y,
            1,
            1
          ).data;

          setCustomRgbColor(`rgb(${px[0]}, ${px[1]}, ${px[2]}, ${px[3]})`);
        }
      });

      canvas.on('mouse:out', function (options) {
        setCursorContent(`rgb(0, 0, 0)`);
      });
    }
  }, [eyeDropperVisible, canvas]);

  const downloadCanvas = () => {
    const img = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = img;
    link.download = 'nounify';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const updateBg = async (collection, value) => {
    const { width } = window.screen;

    // console.log(collection, value);

    if (collection === 'punks' && value === 10000) {
      alert(`not found`);
      return;
    }

    try {
      const { url, options } = PFPService.fetchImg(`${collection}`, value);
      const response = await fetch(url, options);

      let image_preview = default_background;

      if (response.ok) {
        const { image_preview_url } = await response.json();
        image_preview = image_preview_url;
      }

      setBgUrl(image_preview);

      // this.setState({
      //   bgUrl: image_preview,
      // });

      fabric.Image.fromURL(
        image_preview,
        (img, isError) => {
          if (isError) {
            console.log('error is found', image_preview);
          }

          if (isMobile()) {
            img.set({
              top: 0,
              left: 0,
              scaleX: width / img.width,
              scaleY: width / img.height,
            });

            canvas.setDimensions({ width: width, height: width });
          } else {
            canvas.setDimensions({ width: img.width, height: img.height });
          }

          canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
        },
        { crossOrigin: 'anonymous' }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImageFile = (image) => {
    setUploadedImageFile(image);
    setBgUrl(image);
    // this.setState({
    //   uploadedImageFile: image,
    //   bgUrl: image,
    // });

    const { width, height } = window.screen;
    try {
      fabric.Image.fromURL(
        image,
        (img, isError) => {
          if (isError) {
            console.log('error is found', image);
          }

          let resizeRatio;

          if (isMobile()) {
            resizeRatio = calculateAspectRatioFit(
              img.width,
              img.height,
              width,
              height * 0.6
            );
            img.set({
              top: 0,
              left: 0,
              scaleX: resizeRatio,
              scaleY: resizeRatio,
            });

            canvas.setDimensions({
              width: resizeRatio * img.width,
              height: resizeRatio * img.height,
            });
          } else {
            resizeRatio = calculateAspectRatioFit(
              img.width,
              img.height,
              width * 0.6,
              height * 0.6
            );
            img.set({
              top: 0,
              left: 0,
              scaleX: resizeRatio,
              scaleY: resizeRatio,
            });
            canvas.setDimensions({
              width: resizeRatio * img.width,
              height: resizeRatio * img.height,
            });
          }

          canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
        },
        { crossOrigin: 'anonymous' }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const resetGlassesPosition = () => {
    fabric.Image.fromURL(glassMap.get('glasses-rgb.svg'), (oImg) => {
      // if (canvas && canvas.item(0)) {
      //   canvas.remove(canvas.item(0));
      // }
      canvas.getObjects().forEach((obj) => {
        canvas.remove(obj);
      });

      oImg.on('selected', function () {
        setActiveSelectedItem(oImg);
      });

      oImg.set(glassesEditOptions);

      canvas.add(oImg);
      canvas.setActiveObject(oImg);
      canvas.renderAll();
    });
  };

  const addGlasses = () => {
    fabric.Image.fromURL(glassMap.get('glasses-rgb.svg'), (oImg) => {
      oImg.on('selected', function () {
        setActiveSelectedItem(oImg);
      });

      oImg.set(glassesEditOptions);

      canvas.add(oImg);
      canvas.setActiveObject(oImg);
      canvas.renderAll();
    });
  };

  const removeGlasses = () => {
    canvas.getActiveObjects().forEach((obj) => {
      canvas.remove(obj);
    });
  };

  const [tempdata, setTempdata] = useState(null);
  // // https://stackoverflow.com/questions/54748928/how-can-i-use-an-svg-element-created-with-jsx-as-an-image-source-in-a-canvas
  // http://fabricjs.com/fabric-intro-part-3
  const addCustomGlasses = (color) => {
    let svgString = GlassesSvgString(color);

    let blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });

    // let url = URL.createObjectURL(blob);
    let url = (window.URL ? URL : window.webkitURL).createObjectURL(blob);
    // setTempdata(glassMap.get('glasses-rgb.svg'));

    let activeGlasses = canvas.getActiveObjects();
    let oldGlasses;

    oldGlasses = activeGlasses[0];

    // if (canvas.getActiveObjects().length > 0) {
    //   oldGlasses = activeGlasses[0];
    // } else {
    //   oldGlasses = canvas.item(0) ? canvas.item(0) : null;
    // }

    const { top, left, scaleX, scaleY, flipX, angle, aCoords } = oldGlasses;

    fabric.Image.fromURL(url, (oImg) => {
      canvas.remove(oldGlasses);

      let item = oImg;

      item = oImg.set({
        flipX: flipX,
        top: top,
        left: left,
        scaleX: scaleX,
        scaleY: scaleY,
        angle: angle,
        aCoords: aCoords,
        ...glassesEditOptions,
      });

      item.on('selected', function () {
        setActiveSelectedItem(item);
      });

      canvas.add(item);
      canvas.setActiveObject(item);
      canvas.renderAll();
    });
  };

  const mouseMoveHandler = (e) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  // const moveCursor = () => {
  //   const { mouseX, mouseY, trailingX, trailingY } = this.state;

  //   //  Number in expression is coeficient of the delay. 10 for example. You can play with it.
  //   this.setState(() => {
  //     // Using refs and transform for better performance.
  //     colorCursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  //     animationFrame = requestAnimationFrame(this.moveCursor);
  //   });
  // };

  const activateEyeDropper = (e) => {
    setEyeDropperVisible(true);
    colorCursorRef.current.style.visibility = 'visible';
  };

  return (
    <CanvasWrapper>
      {/* <div
        ref={colorCursorRef}
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
              backgroundColor: `${cursorContent}`,
            }}
          />
        )}
      </div> */}
      <EyedropperTool
        cursorPosition={cursorPosition}
        eyeDropperVisible={eyeDropperVisible}
        customRgbColor={customRgbColor}
        ref={colorCursorRef}
      />

      <ZDiv>
        <Search
          search={() => search()}
          collection={(collection) => onCollectionChange(collection)}
          id={(value) => onIdChange(value)}
          uploadImageFile={uploadImageFile}
        />
      </ZDiv>
      <ContentWrapper>
        <PaintToolWrapper>
          <PaintCanvasWrapper>
            <CanvasContainer>
              <PaintCanvas id="c"></PaintCanvas>
            </CanvasContainer>
            <ButtonContainer>
              <ButtonFlip onClick={() => downloadCanvas()}>
                <i className="gg-software-download"></i>&nbsp;&nbsp;Save as
              </ButtonFlip>
              {/* <p>{tempdata}</p> */}
              {/* {tempdata ? <img alt="huh" src={tempdata} /> : 'no pic'} */}
              {/* <FileUploader uploadImageFile={this.uploadImageFile} /> */}
            </ButtonContainer>
          </PaintCanvasWrapper>
          <ToolWrapper>
            <Palette
              activeSelectedItem={activeSelectedItem}
              canvas={canvas}
              chooseColor={(filename) => switchGlasses(filename)}
              resetGlassesPosition={() => resetGlassesPosition()}
              addCustomGlasses={addCustomGlasses}
              customRgbColor={customRgbColor}
            />
            <FlipWrapper>
              {activeSelectedItem && (
                <ColorSelectors
                  canvas={canvas}
                  activateEyeDropper={activateEyeDropper}
                  flipGlasses={flipGlasses}
                  removeGlasses={removeGlasses}
                  setCustomRgbColor={setCustomRgbColor}
                  customRgbColor={customRgbColor}
                  addCustomGlasses={addCustomGlasses}
                />
              )}
              {!activeSelectedItem && (
                <>
                  <div onClick={() => flipBg()}>
                    <ButtonHover buttonText="Flip Image" />
                  </div>
                  <div onClick={() => addGlasses()}>
                    <ButtonHover buttonText="Add Glasses" />
                  </div>
                  <div onClick={() => resetGlassesPosition()}>
                    <ButtonHover buttonText="Clear Glasses" />
                  </div>
                </>
              )}
            </FlipWrapper>
          </ToolWrapper>
        </PaintToolWrapper>
        {/* Drag n Drop only shown on Desktop */}
        <DragAndDropSection uploadImageFile={uploadImageFile} />
      </ContentWrapper>
    </CanvasWrapper>
  );
};

export default Paint;
