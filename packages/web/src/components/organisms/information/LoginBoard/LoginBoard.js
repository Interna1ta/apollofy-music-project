import React from "react";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const GradientBG = styled.div`
  width: 100%;
  background-image: url("assets/svg/whole-bg.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  flex-basis: 40%;
  z-index: -2;
  overflow: hidden;
  border-right: 4px solid black;

  @media only screen and (max-width: ${({ theme }) => theme.media.mobile}) {
    display: none;
  }
`;

const RotatingSymbols = styled.div`
  width: 135%;
  border-radius: 50%;
  height: 135%;
  background-image: url("assets/svg/music-pattern.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: 110rem 110rem;
  margin: auto;
  position: relative;
  left: -15%;
  top: -18%;
  z-index: -1;

  animation: ${rotate} 25s linear infinite;
`;

const Logo = styled.img`
  position: absolute;
  top: 7rem;
  left: 4rem;
  z-index: 999;
  margin: auto;
  width: 35%;
  height: 60%;

  @media only screen and (max-width: ${({ theme }) => theme.media.desktop}) {
    left: 3rem;
    width: 30%;
  }
  @media only screen and (max-width: ${({ theme }) => theme.media.tablet}) {
    left: 2rem;
    width: 25%;
  }
`;

function LoginBoard() {
  return (
    <GradientBG>
      <RotatingSymbols />
      <Logo src="assets/svg/big-logo.svg" alt="Strings Logo" />
    </GradientBG>
  );
}

export default LoginBoard;
