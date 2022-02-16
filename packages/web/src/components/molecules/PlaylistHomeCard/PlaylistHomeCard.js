import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

import HomeSmallText from "../../atoms/body/HomeSmallText";
import SmallText from "../../atoms/body/SmallText";
import FlexColumn from "../../atoms/layout/FlexColumn";

const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  &:hover {
    color: white;
  }
`;

const CardLayout = styled(FlexColumn)`
  justify-content: space-between;
  min-height: 90%;
`;

const HoverIcon = styled(PlayCircleIcon)`
  position: absolute;
  color: purple;
  visibility: hidden;
  transition: 1ms all;
  width: 3rem;

  ${CardLayout}:hover {
    transition: 1ms all;
    visibility: visible;
  }
`;

export default function PlaylistHomeCard(props) {
  const { playlist } = props;
  
  const Card = styled.div`
    margin: 0.5rem;
    padding: 1rem;
    border-radius: 1.25rem;
    height: 15rem;
    max-width: 15rem;
    background-size: cover;
    transition: 1s;
    background-image: url(${playlist.thumbnails.url_default});
  `;

 
  console.log(playlist);

  return (
    <CardLink to={`/playlists/${playlist.id}`}>
      <Card playlist={playlist}>
        <HomeSmallText>{playlist.num_tracks} Tracks</HomeSmallText>
        <CardLayout>
          <SmallText>{playlist.title}</SmallText>
          <HoverIcon />
          <HomeSmallText>{playlist.num_followers} listeners</HomeSmallText>
        </CardLayout>
      </Card>
    </CardLink>
  );
}

PlaylistHomeCard.propTypes = {
  playlist: PropTypes.exact({
    id: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    color: PropTypes.string,
    tracks: PropTypes.arrayOf(PropTypes.object),
    num_tracks: PropTypes.number.isRequired,
    num_followers: PropTypes.number.isRequired,
    followed_by: PropTypes.arrayOf(PropTypes.object),
    thumbnails: PropTypes.exact({
      url_default: PropTypes.string,
      url_medium: PropTypes.string,
      url_large: PropTypes.string,
    }),
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
  }),
};

PlaylistHomeCard.defaultProps = {
  playlist: {
    id: null,
    user: {},
    title: null,
    description: null,
    color: null,
    tracks: [],
    num_tracks: null,
    num_followers: null,
    followed_by: [],
    thumbnails: {
      url_default: null,
      url_medium: null,
      url_large: null,
    },
    created_at: null,
    updated_at: null,
  },
};
