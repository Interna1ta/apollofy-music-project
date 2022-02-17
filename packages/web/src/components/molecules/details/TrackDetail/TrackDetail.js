import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import Box from '@mui/material/Box';

import HomeSmallText from "../../../atoms/body/HomeSmallText";
import DetailText from "../../../atoms/body/DetailText";
import ProfilePlayTrack from "../../../atoms/toggles/ProfilePlayTrack";
import { formatNumReprod } from "../../../../utils/utils";

const TrackLayout = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.3rem;
  border-radius: 0.5rem;
  &:hover {
    background-color: ${({ theme }) => theme.colors.background.secondary_hover};
  }
`;

const TrackPicture = styled.img`
  max-width: 3rem;
  max-height: 3rem;
  margin: 0;
  border-radius: 0.3rem;
`;

const TrackFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding-left: 0.75rem;
  flex-grow: 1;
`;

const TrackLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  &:hover {
    color: ${({ theme }) => theme.colors.label};
  }
`;

const StyledNumTrack = styled.div`
  font-family: ${({ theme }) => theme.fonts.primary};
  margin-left: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  @media only screen and (max-width: ${({ theme }) => theme.media.mobile}) {
    display: none;
  }
`;

const StyledNumber = styled.div`
  padding-left: 0.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

const TrackDetail = ({ track, handlePlayButton }) => {
  return (
    <TrackLayout>
      <Box sx={{ display: 'flex' }}>
        <TrackPicture alt="Track's Thumbnail" src={track?.thumbnails?.url_default} />
        <TrackFlex>
          <TrackLink to={`/albums/${track?.genres}`}>
            <HomeSmallText>{track?.title}</HomeSmallText>
          </TrackLink>
          <TrackLink to={`/users/${track?.user?.id}`}>
            <DetailText>{track?.user?.username}</DetailText>
          </TrackLink>
        </TrackFlex>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <StyledNumTrack>
          <HeadphonesIcon sx={{ color: "purple" }} />
          <StyledNumber>{formatNumReprod(track?.num_plays)}</StyledNumber>
        </StyledNumTrack>
        <ProfilePlayTrack track={track} handlePlayButton={handlePlayButton} />
      </Box>
    </TrackLayout>
  );
};

TrackDetail.propTypes = {
  handlePlayButton: PropTypes.func,
  track: PropTypes.exact({
    id: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    released_date: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string),
    liked_by: PropTypes.arrayOf(PropTypes.object),
    num_plays: PropTypes.number.isRequired,
    num_likes: PropTypes.number.isRequired,
    thumbnails: PropTypes.exact({
      url_default: PropTypes.string,
      url_medium: PropTypes.string,
      url_large: PropTypes.string,
    }),
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
  }),
};

TrackDetail.defaultProps = {
  handlePlayButton: null,
  track: {
    id: null,
    user: {},
    title: null,
    color: null,
    url: null,
    duration: null,
    released_date: null,
    genres: [],
    liked_by: [],
    num_plays: null,
    num_likes: null,
    thumbnails: {
      url_default: null,
      url_medium: null,
      url_large: null,
    },
    created_at: null,
    updated_at: null,
  },
};

export default TrackDetail;
