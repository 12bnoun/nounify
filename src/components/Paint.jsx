import React from 'react';
import styled from 'styled-components';
import { fabric } from 'fabric';
import PFPService from '../services/PFPService.js';

import glassMap from './glasses/GetGlasses.js';

import Palette from './Palette';
import Search from './SearchGroup';

import ButtonHover from './ButtonHover';

import notfound from './notfound.png';
import default_lastpunk from './9999.png';

import { PaintCanvas,
  ButtonFlip,
  PaintToolWrapper,
  ToolWrapper,
  PaintCanvasWrapper,
  CanvasWrapper,
  ButtonFlipE,
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

class Paint extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      bgFlip: false,
      canvas : null,
      glassFlip: false,
      collection: 'punks',
      id: '9999',
      bgUrl: default_lastpunk,
      downloadPng: false,
      canvasDataURL: null,
    };

    this.flipBg = this.flipBg.bind(this);
    this.flipGlasses = this.flipGlasses.bind(this);
    this.switchGlasses = this.switchGlasses.bind(this);

    this.onIdChange = this.onIdChange.bind(this);
    this.onCollectionChange = this.onCollectionChange.bind(this);
    this.search = this.search.bind(this);
    this.downloadPng = this.downloadPng.bind(this);
  }

  switchGlasses(fileName) {
    this.renderGlasses(glassMap.get(fileName))
  }

  onIdChange(value) {
    this.setState({
      id: value
    });
  }

  onCollectionChange(collection) {
    this.setState({
      collection: collection
    });
  }

  flipBg() {

    const { bgFlip, canvas, bgUrl } = this.state;
    fabric.Image.fromURL(bgUrl, (img, isError) => {

      this.setState({ bgFlip: !bgFlip });

      /* Flip img and update background */
      img.set({ flipX: !bgFlip });
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
    }, { crossOrigin: 'anonymous' });
  }

  renderGlasses(fileName) {

    const { canvas, glassFlip } = this.state;

    fabric.Image.fromURL(fileName, (oImg) => {

      let item = oImg;
      if (canvas.item(0)) {

        const { top, left } = canvas.item(0);
        canvas.remove(canvas.item(0));

        item = oImg.set({ flipX: glassFlip, top: top, left: left });
      }

      canvas.add(item);
    });
  }

  flipGlasses() {

    const { canvas, glassFlip } = this.state;
    const { aCoords } = canvas.item(0);

    /* is aCoords actually required? */
    const item = canvas.item(0).set({ flipX: !glassFlip, aCoords: aCoords });
    canvas.remove(canvas.item(0));
    canvas.add(item);
    this.setState({
      glassFlip: !glassFlip
    });
  }

  search() {
    const { collection, id } = this.state;
    this.updateBg(collection, id);
  }

  isMobile() {
    const { width } = window.screen;
    return width <= MOBILE_MAX_WIDTH;
  }

  componentDidMount() {
    var canvas = new fabric.Canvas('c');
    this.setState({ canvas: canvas });
    const { width } = window.screen;

    fabric.Image.fromURL(default_lastpunk, (img, isError) => {

      if (this.isMobile()) {
        img.set({
          top: 0,
          left: 0,
          scaleX: width/img.width,
          scaleY: width/img.height,
        });

        canvas.setDimensions({ width: width, height: width });
      } else {
        console.log(`width 9999`, img.width);
        canvas.setDimensions({ width: img.width, height: img.height });
      }

      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
      this.renderGlasses(glassMap.get('glasses-rgb.svg'));
    });
  }

  downloadPng() {

    const { canvas } = this.state;
    const img = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = img;
    link.download = "nounify";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  async updateBg(collection, value) {

    const { canvas } = this.state;
    const { width } = window.screen;

    if (collection === 'collection') {
      return;
    }

    try {

      const { url, options } = PFPService.fetchImg(`${collection}`, value);
      const response = await fetch(url, options);

      let image_preview = notfound;

      if (response.ok) {
        const { image_preview_url } = await response.json();
        image_preview = image_preview_url;
      }


      this.setState({
        bgUrl: image_preview
      });

      fabric.Image.fromURL(image_preview, (img, isError) => {

        if (isError) {
          img = new Image();
          console.log("error is found", image_preview);
        }

        if (this.isMobile()) {
          img.set({
            top: 0,
            left: 0,
            scaleX: width/img.width,
            scaleY: width/img.height,
          });

          canvas.setDimensions({ width: width, height: width });
        } else {
          canvas.setDimensions({ width: img.width, height: img.height });
        }

        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
      });
    } catch(error) {
      console.log(error);
    }
  }

  render() {

    return (
      <CanvasWrapper>
        <ZDiv>
          <Search search={() => this.search()} collection={(collection) => this.onCollectionChange(collection)} id={(value) => this.onIdChange(value)}/>
        </ZDiv>
        <PaintToolWrapper>
          <PaintCanvasWrapper>
            <PaintCanvas id="c"></PaintCanvas>
            <ButtonFlip onClick={() => this.downloadPng()}><i className="gg-software-download"></i>&nbsp;&nbsp;Save as</ButtonFlip>
          </PaintCanvasWrapper>
          <ToolWrapper>
            <Palette chooseColor={(filename) => this.switchGlasses(filename)}/>
            <FlipWrapper>
              <div onClick={() => this.flipBg()}>
                <ButtonHover buttonText="Flip Background" />
              </div>
              <div onClick={() => this.flipGlasses()}>
                <ButtonHover buttonText="Flip Glasses" />
              </div>
            </FlipWrapper>
          </ToolWrapper>
        </PaintToolWrapper>
      </CanvasWrapper>
    )
  }
}

export default Paint;
