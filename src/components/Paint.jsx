import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../App.css';
import styled from 'styled-components';
import { fabric } from 'fabric';
import PFPService from '../services/PFPService.js';

import glassMap, { glassesArray } from './glasses/GetGlasses.js';
import redGlasses from './glasses/glasses-red.svg';

import Palette from './Palette';
import Search from './SearchGroup';

import IconButton from './IconButton.jsx';

import default_background from './nyancat.jpg';
import not_found from './notfound.png';

import GlassesSvgString from './GlassesSvgString.jsx';

// import DragAndDropSection from './DragAndDropSection.jsx';

import { calculateAspectRatioFit } from '../utils/utils';
import ColorSelectors from './ColorSelectors';
import EyedropperTool from './EyedropperTool';

import { useDropzone } from 'react-dropzone';

import { BsTrash } from 'react-icons/bs';
import { IoDuplicateOutline } from 'react-icons/io5';
import { CgEditFlipH } from 'react-icons/cg';

import {
  PaintCanvas,
  ButtonFlip,
  PaintToolWrapper,
  ToolWrapper,
  PaintCanvasWrapper,
  CanvasWrapper,
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
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Divider = styled.hr`
  margin-top: 20px;
  padding: 0px;
  width: 200px;
  background-color: #dbb6c8;
  height: 1px;
  border: none;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  // margin-top: -30px;
  padding: 0px;
  background-color: rgba(0, 0, 0, 0.33);
  z-index: 999999999;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  @media (max-width: 768px) {
    // margin-top: -30px;
    overflow: hidden;
  }
`;

const LoadingContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 2rem;
`;

const DragnDropText = styled.div`
  display: flex;
  font-size: 1rem;
  margin: 20px 0px 0px 10px;
  text-align: center;
  line-height: 110%;
  @media (max-width: 768px) {
    display: none;
  }
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
  const [collection, setCollection] = useState('CUSTOM');
  const [id, setId] = useState('1');
  const [bgUrl, setBgUrl] = useState(default_background);
  // const [downloadPng, setDownloadPng] = useState(false);
  // const [canvasDataURL, setCanvasDataURL] = useState(null);
  const [uploadedImageFile, setUploadedImageFile] = useState(null);
  const [activeSelectedItem, setActiveSelectedItem] = useState(null);
  const [lastActiveGlasses, setLastActiveGlasses] = useState(null);
  const [eyeDropperVisible, setEyeDropperVisible] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [customRgbColor, setCustomRgbColor] = useState('rgb(0, 0, 0)');

  const [loading, setLoading] = useState(false);
  const [loadingIcon, setLoadingIcon] = useState(redGlasses);

  const canvasRef = useRef(null);
  const colorCursorRef = useRef();
  const canvasContainerRef = useRef();

  const RESIZERATIO = 0.55;
  const MOBILERESIZERATIO = 0.65;

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
  };

  const onIdChange = (value) => {
    setId(value);
  };

  const onCollectionChange = (collection) => {
    setCollection(collection);
    setUploadedImageFile(null);

    if (collection !== 'CUSTOM') {
      updateBg(collection, id);
    } else {
      const { width, height } = window.screen;
      setBgUrl(default_background);
      let resizeRatio;
      fabric.Image.fromURL(default_background, (img, isError) => {
        if (isMobile()) {
          resizeRatio = calculateAspectRatioFit(
            img.width,
            img.height,
            width,
            height * MOBILERESIZERATIO
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
            width * RESIZERATIO,
            height * RESIZERATIO
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
      });
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

        let resizeRatio;

        // If flipping user image background, must resize
        if (uploadedImageFile || bgUrl === default_background) {
          if (isMobile()) {
            resizeRatio = calculateAspectRatioFit(
              img.width,
              img.height,
              width,
              height * MOBILERESIZERATIO
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
              width * RESIZERATIO,
              height * RESIZERATIO
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
    // fabric.js event handlers made me do it this ugly way :(

    let newCanvas = new fabric.Canvas(canvasRef.current);
    const { width, height } = window.screen;

    let resizeRatio;

    fabric.Image.fromURL(default_background, (img, isError) => {
      if (isMobile()) {
        resizeRatio = calculateAspectRatioFit(
          img.width,
          img.height,
          width,
          height * MOBILERESIZERATIO
        );

        img.set({
          top: 0,
          left: 0,
          scaleX: resizeRatio,
          scaleY: resizeRatio,
        });

        newCanvas.setDimensions({
          width: resizeRatio * img.width,
          height: resizeRatio * img.height,
        });
      } else {
        resizeRatio = calculateAspectRatioFit(
          img.width,
          img.height,
          width * RESIZERATIO,
          height * RESIZERATIO
        );
        img.set({
          top: 0,
          left: 0,
          scaleX: resizeRatio,
          scaleY: resizeRatio,
        });
        newCanvas.setDimensions({
          width: resizeRatio * img.width,
          height: resizeRatio * img.height,
        });
      }

      newCanvas.setBackgroundImage(img, newCanvas.renderAll.bind(newCanvas));

      newCanvas.hoverCursor = 'pointer';
      newCanvas.selection = false;

      fabric.Image.fromURL(glassMap.get('glasses-sky-blue.svg'), (oImg) => {
        oImg.on('selected', function () {
          setActiveSelectedItem(oImg);
        });
        oImg.set(glassesEditOptions);
        newCanvas.add(oImg);
        newCanvas.setActiveObject(oImg);
        newCanvas.centerObject(oImg);
      });

      setCanvas(newCanvas);
    });
  }, []);

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

    if (collection === 'punks' && value === 10000) {
      alert(`not found`);
      return;
    }

    try {
      setLoading(true);
      const { url, options } = PFPService.fetchImg(`${collection}`, value);
      const response = await fetch(url, options);

      let image_preview = not_found;

      if (response.ok) {
        const { image_preview_url } = await response.json();
        image_preview = image_preview_url;
      }

      setBgUrl(image_preview);

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
          setLoading(false);
        },
        { crossOrigin: 'anonymous' }
      );
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const uploadImageFile = (image) => {
    setUploadedImageFile(image);
    setBgUrl(image);

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
              height * MOBILERESIZERATIO
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
              width * RESIZERATIO,
              height * RESIZERATIO
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
    fabric.Image.fromURL(glassMap.get('glasses-black.svg'), (oImg) => {
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
    fabric.Image.fromURL(glassMap.get('glasses-black.svg'), (oImg) => {
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

  const addCustomGlasses = useCallback(
    (color) => {
      let svgString = GlassesSvgString(color);

      // let blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      let blob = new File([svgString], 'tempSvg.svg', {
        type: 'image/svg+xml',
      });

      // let url = URL.createObjectURL(blob);
      let url = (window.URL ? URL : window.webkitURL).createObjectURL(blob);

      let activeGlasses = canvas.getActiveObjects();
      let oldGlasses;

      oldGlasses = activeGlasses[0];

      if (canvas.getActiveObjects().length > 0) {
        oldGlasses = activeGlasses[0];
      } else if (lastActiveGlasses) {
        oldGlasses = lastActiveGlasses;
      } else {
        oldGlasses = canvas.item(0);
      }

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
    },
    [canvas, lastActiveGlasses]
  );

  const activateEyeDropper = () => {
    let activeGlasses = canvas.getActiveObjects();
    setLastActiveGlasses(activeGlasses[0]);
    setEyeDropperVisible(true);
    colorCursorRef.current.style.visibility = 'visible';
  };

  const onCanvasTouch = useCallback(
    (options) => {
      if (
        canvasRef.current &&
        canvasContainerRef.current.contains(options.target) &&
        eyeDropperVisible
      ) {
        let rect = canvasRef.current.getBoundingClientRect();

        let ctx = canvasRef.current.getContext('2d');

        // get the color array for the pixel under the mouse
        let position = {
          x:
            ((options.touches[0].clientX - rect.left) /
              (rect.right - rect.left)) *
            canvasRef.current.width,
          y:
            ((options.touches[0].clientY - rect.top) /
              (rect.bottom - rect.top)) *
            canvasRef.current.height,
        };
        // get the color array for the pixel under the mouse
        let px = ctx.getImageData(position.x, position.y, 1, 1).data;
        setCustomRgbColor(`rgb(${px[0]}, ${px[1]}, ${px[2]}, ${px[3]})`);

        // update glasses with the new color
        addCustomGlasses(`rgb(${px[0]}, ${px[1]}, ${px[2]}, ${px[3]})`);
        colorCursorRef.current.style.visibility = 'hidden';
        setEyeDropperVisible(false);
      }
    },
    [eyeDropperVisible, addCustomGlasses]
  );

  const onCanvasClick = useCallback(
    (options) => {
      if (
        canvasRef.current &&
        canvasContainerRef.current.contains(options.target) &&
        eyeDropperVisible
      ) {
        let rect = canvasRef.current.getBoundingClientRect();

        let ctx = canvasRef.current.getContext('2d');

        // get the color array for the pixel under the mouse
        let position = {
          x:
            ((options.clientX - rect.left) / (rect.right - rect.left)) *
            canvasRef.current.width,
          y:
            ((options.clientY - rect.top) / (rect.bottom - rect.top)) *
            canvasRef.current.height,
        };

        // get the color array for the pixel under the mouse
        let px = ctx.getImageData(position.x, position.y, 1, 1).data;

        setCustomRgbColor(`rgb(${px[0]}, ${px[1]}, ${px[2]}, ${px[3]})`);

        // update glasses with the new color
        addCustomGlasses(`rgb(${px[0]}, ${px[1]}, ${px[2]}, ${px[3]})`);
        colorCursorRef.current.style.visibility = 'hidden';
        setEyeDropperVisible(false);
      }
    },
    [eyeDropperVisible, addCustomGlasses]
  );

  const mouseMoveHandler = useCallback(
    (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });

      if (canvasRef && eyeDropperVisible) {
        let rect = canvasRef.current.getBoundingClientRect();

        let ctx = canvasRef.current.getContext('2d');

        // get the color array for the pixel under the mouse
        let position = {
          x:
            ((e.clientX - rect.left) / (rect.right - rect.left)) *
            canvasRef.current.width,
          y:
            ((e.clientY - rect.top) / (rect.bottom - rect.top)) *
            canvasRef.current.height,
        };

        // get the color array for the pixel under the mouse
        let px = ctx.getImageData(position.x, position.y, 1, 1).data;

        setCustomRgbColor(`rgb(${px[0]}, ${px[1]}, ${px[2]}, ${px[3]})`);
      }
    },
    [eyeDropperVisible]
  );

  useEffect(() => {
    if (canvas) {
      canvas.on('mouse:down', function (options) {
        if (options.target) {
          setActiveSelectedItem(options.target);
        } else {
          setActiveSelectedItem(null);
        }
      });

      // adding stupid event listeners the awful way to override built-in events...thanks fabric.js
      document.addEventListener('click', onCanvasClick);
      document.addEventListener('touchstart', onCanvasTouch);
      document.addEventListener('mousemove', mouseMoveHandler);

      return () => {
        document.removeEventListener('click', onCanvasClick);
        document.removeEventListener('touchstart', onCanvasTouch);
        document.removeEventListener('mousemove', mouseMoveHandler);
      };
    }
  }, [
    eyeDropperVisible,
    canvas,
    onCanvasClick,
    mouseMoveHandler,
    onCanvasTouch,
  ]);

  useEffect(() => {
    if (loading) {
      const switchImage = setInterval(() => {
        setLoadingIcon(
          glassesArray[Math.floor(Math.random() * glassesArray.length)]
        );
      }, 250);
      return () => {
        clearInterval(switchImage);
      };
    }
  }, [loading]);

  const { getRootProps } = useDropzone({
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
    <CanvasWrapper {...getRootProps()}>
      {loading && (
        <LoadingOverlay>
          <LoadingContent>
            {`Loading...`}
            <img alt="loading" src={loadingIcon} />
          </LoadingContent>
        </LoadingOverlay>
      )}
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
            <CanvasContainer ref={canvasContainerRef}>
              <PaintCanvas ref={canvasRef} id="c"></PaintCanvas>
            </CanvasContainer>
            <ButtonContainer>
              <ButtonFlip onClick={() => downloadCanvas()}>
                <i className="gg-software-download"></i>&nbsp;&nbsp;Save as
              </ButtonFlip>
              <DragnDropText>
                Drag 'n' Drop
                <br />
                Image to Upload
              </DragnDropText>
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
              <ColorSelectors
                canvas={canvas}
                activateEyeDropper={activateEyeDropper}
                flipGlasses={flipGlasses}
                removeGlasses={removeGlasses}
                setCustomRgbColor={setCustomRgbColor}
                customRgbColor={customRgbColor}
                addCustomGlasses={addCustomGlasses}
                activeSelectedItem={activeSelectedItem}
                eyeDropperVisible={eyeDropperVisible}
              />
              <>
                <Divider />
                <IconButton
                  ButtonIcon={CgEditFlipH}
                  buttonText={'Flip Image'}
                  clickEvent={flipBg}
                />
                <IconButton
                  ButtonIcon={IoDuplicateOutline}
                  buttonText={'Add Glasses'}
                  clickEvent={addGlasses}
                />
                <IconButton
                  ButtonIcon={BsTrash}
                  buttonText={'Reset Glasses'}
                  clickEvent={resetGlassesPosition}
                />
              </>
            </FlipWrapper>
          </ToolWrapper>
        </PaintToolWrapper>
        {/* Drag n Drop only shown on Desktop */}
        {/* <DragAndDropSection uploadImageFile={uploadImageFile} /> */}
      </ContentWrapper>
    </CanvasWrapper>
  );
};

export default Paint;
