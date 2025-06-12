import React from "react";
import styled, { keyframes } from "styled-components";

// Keyframes animation
const loaderAnimation = keyframes`
  0%   {box-shadow: 20px 0 #000, -20px 0 #0002; background: #000;}
  33%  {box-shadow: 20px 0 #000, -20px 0 #0002; background: #0002;}
  66%  {box-shadow: 20px 0 #0002, -20px 0 #000; background: #0002;}
  100% {box-shadow: 20px 0 #0002, -20px 0 #000; background: #000;}
`;

// Styled component
const LoaderContainer = styled.div`
  width: 15px;
  aspect-ratio: 1;
  border-radius: 50%;
  animation: ${loaderAnimation} 1s infinite linear alternate;
`;

// Loader component
const Loader = () => {
  return <LoaderContainer />;
};

export default Loader;
