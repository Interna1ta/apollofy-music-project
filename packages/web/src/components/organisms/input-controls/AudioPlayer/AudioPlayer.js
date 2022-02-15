import React from "react";
import Player from "react-material-music-player"; // default export
import styled from "styled-components";

const ResponsiveDiv = styled.div`
  width: "100vw";
  position: "fixed";
  bottom: 0;
  @media only screen and (max-width: ${({ theme }) => theme.media.tablet}) {
    width: "100vw";
    position: "relative";
    bottom: 2rem;
  }
`;

const AudioPlayer = () => {
  return (
    <ResponsiveDiv>
      <Player />
    </ResponsiveDiv>
  );
};

export default AudioPlayer;
