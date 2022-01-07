import React, { useState } from 'react';

const GlassesSvgString = (fillColor) => {
  //   const [fillColor, setFillColor] = useState('#ffffff');
  // Buffer.from(str, 'base64')
  let theString = `<svg width="150" height="80" viewBox="80 95 140 90" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges"><rect width="60" height="10" x="100" y="110" fill="${fillColor}" /><rect width="60" height="10" x="170" y="110" fill="${fillColor}" /><rect width="10" height="10" x="100" y="120" fill="${fillColor}" /><rect width="20" height="10" x="110" y="120" fill="#ffffff" /><rect width="20" height="10" x="130" y="120" fill="#000000" /><rect width="10" height="10" x="150" y="120" fill="${fillColor}" /><rect width="10" height="10" x="170" y="120" fill="${fillColor}" /><rect width="20" height="10" x="180" y="120" fill="#ffffff" /><rect width="20" height="10" x="200" y="120" fill="#000000" /><rect width="10" height="10" x="220" y="120" fill="${fillColor}" /><rect width="40" height="10" x="70" y="130" fill="${fillColor}" /><rect width="20" height="10" x="110" y="130" fill="#ffffff" /><rect width="20" height="10" x="130" y="130" fill="#000000" /><rect width="30" height="10" x="150" y="130" fill="${fillColor}" /><rect width="20" height="10" x="180" y="130" fill="#ffffff" /><rect width="20" height="10" x="200" y="130" fill="#000000" /><rect width="10" height="10" x="220" y="130" fill="${fillColor}" /><rect width="10" height="10" x="70" y="140" fill="${fillColor}" /><rect width="10" height="10" x="100" y="140" fill="${fillColor}" /><rect width="20" height="10" x="110" y="140" fill="#ffffff" /><rect width="20" height="10" x="130" y="140" fill="#000000" /><rect width="10" height="10" x="150" y="140" fill="${fillColor}" /><rect width="10" height="10" x="170" y="140" fill="${fillColor}" /><rect width="20" height="10" x="180" y="140" fill="#ffffff" /><rect width="20" height="10" x="200" y="140" fill="#000000" /><rect width="10" height="10" x="220" y="140" fill="${fillColor}" /><rect width="10" height="10" x="70" y="150" fill="${fillColor}" /><rect width="10" height="10" x="100" y="150" fill="${fillColor}" /><rect width="20" height="10" x="110" y="150" fill="#ffffff" /><rect width="20" height="10" x="130" y="150" fill="#000000" /><rect width="10" height="10" x="150" y="150" fill="${fillColor}" /><rect width="10" height="10" x="170" y="150" fill="${fillColor}" /><rect width="20" height="10" x="180" y="150" fill="#ffffff" /><rect width="20" height="10" x="200" y="150" fill="#000000" /><rect width="10" height="10" x="220" y="150" fill="${fillColor}" /><rect width="60" height="10" x="100" y="160" fill="${fillColor}" /><rect width="60" height="10" x="170" y="160" fill="${fillColor}" /></svg>`;
  return theString;
  //return `<svg width="150" height="80" viewBox="80 95 140 90" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges"><rect width="60" height="10" x="100" y="110" fill="${fillColor}" /><rect width="60" height="10" x="170" y="110" fill="${fillColor}"/><rect width="40" height="10" x="100" y="120" fill="${fillColor}" /><rect width="10" height="10" x="140" y="120" fill="${fillColor}" /><rect width="10" height="10" x="150" y="120" fill="#000000" /><rect width="40" height="10" x="170" y="120" fill="#000000" /><rect width="10" height="10" x="210" y="120" fill="#ffffff" /><rect width="10" height="10" x="220" y="120" fill="#000000" /><rect width="70" height="10" x="70" y="130" fill="#000000" /><rect width="10" height="10" x="140" y="130" fill="#ffffff" /><rect width="60" height="10" x="150" y="130" fill="#000000" /><rect width="10" height="10" x="210" y="130" fill="#ffffff" /><rect width="10" height="10" x="220" y="130" fill="#000000" /><rect width="10" height="10" x="70" y="140" fill="#000000" /><rect width="60" height="10" x="100" y="140" fill="#000000" /><rect width="60" height="10" x="170" y="140" fill="#000000" /><rect width="10" height="10" x="70" y="150" fill="#000000" /><rect width="60" height="10" x="100" y="150" fill="#000000" /><rect width="60" height="10" x="170" y="150" fill="#000000" /><rect width="60" height="10" x="100" y="160" fill="#000000" /><rect width="60" height="10" x="170" y="160" fill="#000000" /></svg>`
  //   return `<svg
  //       width="150"
  //       height="80"
  //       viewBox="80 95 140 90"
  //       xmlns="http://www.w3.org/2000/svg"
  //       shape-rendering="crispEdges"
  //     >
  //       <rect width="60" height="10" x="100" y="110" fill="${fillColor}" />
  //       <rect width="60" height="10" x="170" y="110" fill="${fillColor}" />
  //       <rect width="10" height="10" x="100" y="120" fill="${fillColor}" />
  //       <rect width="20" height="10" x="110" y="120" fill="#ffffff" />
  //       <rect width="20" height="10" x="130" y="120" fill="#000000" />
  //       <rect width="10" height="10" x="150" y="120" fill="${fillColor}" />
  //       <rect width="10" height="10" x="170" y="120" fill="${fillColor}" />
  //       <rect width="20" height="10" x="180" y="120" fill="#ffffff" />
  //       <rect width="20" height="10" x="200" y="120" fill="#000000" />
  //       <rect width="10" height="10" x="220" y="120" fill="${fillColor}" />
  //       <rect width="40" height="10" x="70" y="130" fill="${fillColor}" />
  //       <rect width="20" height="10" x="110" y="130" fill="#ffffff" />
  //       <rect width="20" height="10" x="130" y="130" fill="#000000" />
  //       <rect width="30" height="10" x="150" y="130" fill="${fillColor}" />
  //       <rect width="20" height="10" x="180" y="130" fill="#ffffff" />
  //       <rect width="20" height="10" x="200" y="130" fill="#000000" />
  //       <rect width="10" height="10" x="220" y="130" fill="${fillColor}" />
  //       <rect width="10" height="10" x="70" y="140" fill="${fillColor}" />
  //       <rect width="10" height="10" x="100" y="140" fill="${fillColor}" />
  //       <rect width="20" height="10" x="110" y="140" fill="#ffffff" />
  //       <rect width="20" height="10" x="130" y="140" fill="#000000" />
  //       <rect width="10" height="10" x="150" y="140" fill="${fillColor}" />
  //       <rect width="10" height="10" x="170" y="140" fill="${fillColor}" />
  //       <rect width="20" height="10" x="180" y="140" fill="#ffffff" />
  //       <rect width="20" height="10" x="200" y="140" fill="#000000" />
  //       <rect width="10" height="10" x="220" y="140" fill="${fillColor}" />
  //       <rect width="10" height="10" x="70" y="150" fill="${fillColor}" />
  //       <rect width="10" height="10" x="100" y="150" fill="${fillColor}" />
  //       <rect width="20" height="10" x="110" y="150" fill="#ffffff" />
  //       <rect width="20" height="10" x="130" y="150" fill="#000000" />
  //       <rect width="10" height="10" x="150" y="150" fill="${fillColor}" />
  //       <rect width="10" height="10" x="170" y="150" fill="${fillColor}" />
  //       <rect width="20" height="10" x="180" y="150" fill="#ffffff" />
  //       <rect width="20" height="10" x="200" y="150" fill="#000000" />
  //       <rect width="10" height="10" x="220" y="150" fill="${fillColor}" />
  //       <rect width="60" height="10" x="100" y="160" fill="${fillColor}" />
  //       <rect width="60" height="10" x="170" y="160" fill="${fillColor}" />
  //     </svg>`;
};

export const TestGlassesWorking = () => {
  const [fillColor, setFillColor] = useState('#ffffff');
  return (
    <svg
      width="150"
      height="80"
      viewBox="80 95 140 90"
      xmlns="http://www.w3.org/2000/svg"
      shape-rendering="crispEdges"
    >
      <rect width="60" height="10" x="100" y="110" fill={fillColor} />
      <rect width="60" height="10" x="170" y="110" fill={fillColor} />
      <rect width="10" height="10" x="100" y="120" fill={fillColor} />
      <rect width="20" height="10" x="110" y="120" fill="#ffffff" />
      <rect width="20" height="10" x="130" y="120" fill="#000000" />
      <rect width="10" height="10" x="150" y="120" fill={fillColor} />
      <rect width="10" height="10" x="170" y="120" fill={fillColor} />
      <rect width="20" height="10" x="180" y="120" fill="#ffffff" />
      <rect width="20" height="10" x="200" y="120" fill="#000000" />
      <rect width="10" height="10" x="220" y="120" fill={fillColor} />
      <rect width="40" height="10" x="70" y="130" fill={fillColor} />
      <rect width="20" height="10" x="110" y="130" fill="#ffffff" />
      <rect width="20" height="10" x="130" y="130" fill="#000000" />
      <rect width="30" height="10" x="150" y="130" fill={fillColor} />
      <rect width="20" height="10" x="180" y="130" fill="#ffffff" />
      <rect width="20" height="10" x="200" y="130" fill="#000000" />
      <rect width="10" height="10" x="220" y="130" fill={fillColor} />
      <rect width="10" height="10" x="70" y="140" fill={fillColor} />
      <rect width="10" height="10" x="100" y="140" fill={fillColor} />
      <rect width="20" height="10" x="110" y="140" fill="#ffffff" />
      <rect width="20" height="10" x="130" y="140" fill="#000000" />
      <rect width="10" height="10" x="150" y="140" fill={fillColor} />
      <rect width="10" height="10" x="170" y="140" fill={fillColor} />
      <rect width="20" height="10" x="180" y="140" fill="#ffffff" />
      <rect width="20" height="10" x="200" y="140" fill="#000000" />
      <rect width="10" height="10" x="220" y="140" fill={fillColor} />
      <rect width="10" height="10" x="70" y="150" fill={fillColor} />
      <rect width="10" height="10" x="100" y="150" fill={fillColor} />
      <rect width="20" height="10" x="110" y="150" fill="#ffffff" />
      <rect width="20" height="10" x="130" y="150" fill="#000000" />
      <rect width="10" height="10" x="150" y="150" fill={fillColor} />
      <rect width="10" height="10" x="170" y="150" fill={fillColor} />
      <rect width="20" height="10" x="180" y="150" fill="#ffffff" />
      <rect width="20" height="10" x="200" y="150" fill="#000000" />
      <rect width="10" height="10" x="220" y="150" fill={fillColor} />
      <rect width="60" height="10" x="100" y="160" fill={fillColor} />
      <rect width="60" height="10" x="170" y="160" fill={fillColor} />
    </svg>
  );
};

export default GlassesSvgString;

/* 
 return (
    'data:image/svg+xml;base64,' +
    btoa(
      `<svg
      width="150"
      height="80"
      viewBox="80 95 140 90"
      xmlns="http://www.w3.org/2000/svg"
      shape-rendering="crispEdges"
    >
      <rect width="60" height="10" x="100" y="110" fill="${fillColor}" />
      <rect width="60" height="10" x="170" y="110" fill="${fillColor}" />
      <rect width="10" height="10" x="100" y="120" fill="${fillColor}" />
      <rect width="20" height="10" x="110" y="120" fill="#ffffff" />
      <rect width="20" height="10" x="130" y="120" fill="#000000" />
      <rect width="10" height="10" x="150" y="120" fill="${fillColor}" />
      <rect width="10" height="10" x="170" y="120" fill="${fillColor}" />
      <rect width="20" height="10" x="180" y="120" fill="#ffffff" />
      <rect width="20" height="10" x="200" y="120" fill="#000000" />
      <rect width="10" height="10" x="220" y="120" fill="${fillColor}" />
      <rect width="40" height="10" x="70" y="130" fill="${fillColor}" />
      <rect width="20" height="10" x="110" y="130" fill="#ffffff" />
      <rect width="20" height="10" x="130" y="130" fill="#000000" />
      <rect width="30" height="10" x="150" y="130" fill="${fillColor}" />
      <rect width="20" height="10" x="180" y="130" fill="#ffffff" />
      <rect width="20" height="10" x="200" y="130" fill="#000000" />
      <rect width="10" height="10" x="220" y="130" fill="${fillColor}" />
      <rect width="10" height="10" x="70" y="140" fill="${fillColor}" />
      <rect width="10" height="10" x="100" y="140" fill="${fillColor}" />
      <rect width="20" height="10" x="110" y="140" fill="#ffffff" />
      <rect width="20" height="10" x="130" y="140" fill="#000000" />
      <rect width="10" height="10" x="150" y="140" fill="${fillColor}" />
      <rect width="10" height="10" x="170" y="140" fill="${fillColor}" />
      <rect width="20" height="10" x="180" y="140" fill="#ffffff" />
      <rect width="20" height="10" x="200" y="140" fill="#000000" />
      <rect width="10" height="10" x="220" y="140" fill="${fillColor}" />
      <rect width="10" height="10" x="70" y="150" fill="${fillColor}" />
      <rect width="10" height="10" x="100" y="150" fill="${fillColor}" />
      <rect width="20" height="10" x="110" y="150" fill="#ffffff" />
      <rect width="20" height="10" x="130" y="150" fill="#000000" />
      <rect width="10" height="10" x="150" y="150" fill="${fillColor}" />
      <rect width="10" height="10" x="170" y="150" fill="${fillColor}" />
      <rect width="20" height="10" x="180" y="150" fill="#ffffff" />
      <rect width="20" height="10" x="200" y="150" fill="#000000" />
      <rect width="10" height="10" x="220" y="150" fill="${fillColor}" />
      <rect width="60" height="10" x="100" y="160" fill="${fillColor}" />
      <rect width="60" height="10" x="170" y="160" fill="${fillColor}" />
    </svg>`
    )
*/
