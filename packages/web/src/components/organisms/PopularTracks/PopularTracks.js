import React, { useState } from "react";
import styled from "styled-components";

import { SmallText } from "../../atoms/SmallText/SmallText";
import { useTracks } from "../../../hooks/useTracks";
import TrackDetail from "../../molecules/TrackDetail/TrackDetail";

export const SectionLayout = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
`;

export const TracksList = styled(SectionLayout)`
  margin-top: 0;
  background-color: lightgray;
  border-radius: 1.3rem;
  padding: 1rem;
  width: 30rem;
  gap: 1rem;

  @media only screen and (max-width: 600px) {
    margin-top: 1rem;
    width: 100%;
  }
`;

const TracksText = styled(SmallText)`
  @media only screen and (max-width: 600px) {
    margin: auto;
  }
`;

export default function PopularTracks() {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const sort = "num_plays";

  const { data: tracks, isError, error, isLoading } = useTracks(currentPage, undefined, undefined, sort);

  const handlePlayButton = (track) => {
    setSelectedTrack(track);
  }

  if (isLoading) return <h3>Loading...</h3>;
  if (isError)
    return (
      <>
        <h3>Oops, something went wrong</h3>
        <p>{error}</p>
      </>
    );

  return (
    <SectionLayout>
      <TracksText>Popular Tracks</TracksText>
      <TracksList>
        {tracks?.data?.data?.map((track) => (
          <TrackDetail key={track.id} track={track} handlePlayButton={handlePlayButton} />
        ))}
      </TracksList>
    </SectionLayout>
  );
}
