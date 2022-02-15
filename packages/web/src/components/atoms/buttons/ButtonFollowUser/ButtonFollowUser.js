import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { useFollowedUsers, useFollowUser } from "../../../../hooks/useUsers";

const ColorButton = styled(Button)`
  color: white;
  background: ${({ theme }) => theme.colors.label};
  &:hover {
    background: purple;
  }
  @media only screen and (max-width: ${({ theme }) => theme.media.mobile}) {
    width: 20px;
  }
`;

const StyledSpan = styled.span`
  @media only screen and (max-width: ${({ theme }) => theme.media.mobile}) {
    margin: 0 !important;
    display: none;
  }
`;

const StyledIcon = styled(StarOutlineIcon)`
  @media only screen and (max-width: ${({ theme }) => theme.media.mobile}) {
    margin-left: 11px;
    border-radius: 100%;
  }
`;

const ButtonFollowUser = ({ id }) => {
  const { mutate } = useFollowUser();
  const { data: users } = useFollowedUsers(true);

  const handleFollow = (userId) => {
    mutate(userId);
  };

  return (
    <Stack spacing={2} direction="row" onClick={() => handleFollow(id)}>
      {users?.data?.data && users.data.data.findIndex((user) => user.id === id) === -1 ? (
        <ColorButton
          variant="contained"
          sx={{ borderRadius: "100px", color: "white" }}
          startIcon={<StarOutlineIcon />}
        >
          {" "}
          <StyledSpan>Follow</StyledSpan>
        </ColorButton>
      ) : (
        <ColorButton
          variant="contained"
          sx={{ borderRadius: "100px", color: "white" }}
          startIcon={<StarIcon />}
        >
          {" "}
          <StyledSpan>Unfollow</StyledSpan>
        </ColorButton>
      )}
    </Stack>
  );
};

ButtonFollowUser.propTypes = {
  id: PropTypes.string,
};

ButtonFollowUser.defaultProps = {
  id: "",
};

export default ButtonFollowUser;