import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { authSelector, signUpWithEmailRequest } from "../../../../store/auth";
import FlexColumn from "../../../atoms/layout/FlexColumn";
import MiddleTitle from "../../../atoms/headings/MiddleTitle";
import SmallText from "../../../atoms/body/SmallText";
import ButtonLoginModal from "../../../atoms/buttons/ButtonLoginModal";

const DescriptionArea = styled.textarea`
  width: 22rem;
  height: 8rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0.5rem;
  border-radius: 0.3rem;
  margin-bottom: 0.5rem;
  background-color: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.text};
`;

export default function DescriptionForm() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const { currentUser } = useSelector(authSelector);

  function handleDescription() {
    if (value.length <= 250) {
      const updatedCurrentUser = {
        username: currentUser.username,
        email: currentUser.email,
        thumbnails: {
          url_default: currentUser.pictureLink,
        },
        birth_date: currentUser.birth_date,
        description: value,
      };

      dispatch(signUpWithEmailRequest(currentUser.email, currentUser.password, updatedCurrentUser));
    } else {
      toast.error("Your description is too long", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  }

  return (
    <FlexColumn>
      <MiddleTitle>Describe Yourself</MiddleTitle>
      <SmallText>
        What makes you special? Don&apos;t think too hard, just have fun with it
      </SmallText>
      <DescriptionArea
        placeholder="Type a few lines about you..."
        defaultValue={currentUser?.description || ""}
        maxlength="250"
        onChange={(e) => setValue(e.target.value)}
      />
      <ButtonLoginModal variant="login" btnColor="#B04AFF" onClick={() => handleDescription()}>
        Finish
      </ButtonLoginModal>
      <ToastContainer />
    </FlexColumn>
  );
}
