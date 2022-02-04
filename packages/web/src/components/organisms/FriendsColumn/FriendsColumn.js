import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { authSelector } from "../../../redux/auth";

import { PrimaryButton } from "../../atoms/buttons/PrimaryButton";
import { FlexColumn } from "../../atoms/FlexColumn/FlexColumn";
import { HomeSmallText } from "../../atoms/HomeSmallText/HomeSmallText";
import { rightSideBar } from "../../atoms/RightSideBar/RightSideBar";
import FriendInfo from "../../molecules/FriendInfo/FriendInfo";
import AddFriendsModal from "../modal/AddFriendsModal";

const FriendsColumnLayout = styled(rightSideBar)`
  height: auto;
`;

export default function FriendsColumn() {
  const { currentUser } = useSelector(authSelector);
  const [isOpen, setOpen] = useState(false);

  const handleModal = () => {
    setOpen(!isOpen);
  };

  return (
    <FriendsColumnLayout>
      <FlexColumn>
        {currentUser?.followed_users && currentUser?.followed_users[0] ? (
          currentUser.followed_users.map((friend) => {
            <FriendInfo
              key={friend.id}
              profilePicture={friend.thumbnails.url_default}
              name={friend.username}
            />;
          })
        ) : (
          <HomeSmallText>You do not follow anyone yet</HomeSmallText>
        )}
        <PrimaryButton onClick={handleModal}>Add Friends</PrimaryButton>
        <AddFriendsModal isOpen={isOpen} handleModal={handleModal} />
      </FlexColumn>
    </FriendsColumnLayout>
  );
}
