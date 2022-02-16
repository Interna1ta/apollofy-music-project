import React from "react";
import styled from "styled-components";

import CategoryButton from "../../atoms/buttons/ProfileButtonCategory";

const GroupButtons = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 0rem 0rem 1.45rem 0rem;
  @media only screen and (max-width: ${({ theme }) => theme.media.tablet}) {
    display: none;
  }
`;

const ProfileGroupButtons = () => {
  return (
    <GroupButtons>
      <CategoryButton text="Tracks" />
      <CategoryButton text="Playlists" />
      <CategoryButton text="Albums" />
    </GroupButtons>
  );
};
export default ProfileGroupButtons;
