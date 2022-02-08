import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import ProfileNameTrack from "../../atoms/ProfileNameTrack/ProfileNameTrack";
import ProfileNumReprod from "../../atoms/ProfileNumReprod/ProfileNumReprod";
import ProfileNumTrack from "../../atoms/ProfileNumTrack/ProfileNumTrack";
import ProfilePlayTrack from "../../atoms/ProfilePlayTrack/ProfilePlayTrack";
import ProfileTrackImage from "../../atoms/ProfileTrackImage/ProfileTrackImage";


const StyledUserTrack = styled.div`
  font-family: ${({ theme }) => theme.fonts.primary};
  display: flex;
  border-radius: 1rem;
  padding: 0.5rem 0.5rem;
  line-height: 1rem;
  margin: 0.5rem 0;
  &:hover {
    background: #eeeee4;
    cursor: pointer;
  }
`;

const ProfileUserTrack = ({ data, index }) => {
  return (
    <StyledUserTrack>
      <ProfileNumTrack index={index} />
      <ProfileTrackImage data={data} />
      <ProfileNameTrack data={data} />
      <ProfileNumReprod data={data} />
      <ProfilePlayTrack track={data} />
    </StyledUserTrack>
  );
};

ProfileUserTrack.propTypes = {
  data: PropTypes.object,
  index: PropTypes.number
};

ProfileUserTrack.defaultProps = {
  data: {},
  index: 1
};

export default ProfileUserTrack;
