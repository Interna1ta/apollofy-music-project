import * as React from "react";
import { styled } from "@mui/system";
import ModalUnstyled from "@mui/base/ModalUnstyled";
import PropTypes from "prop-types";

import { ModalBox } from "../AddFriendsModal/AddFriendsModal";

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme?.colors?.background?.secondary};
  color: ${({ theme }) => theme?.colors?.text};
`;

const Backdrop = styled("div")`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

export default function RegisterModal({ isOpen, handleModal, children }) {
  const handleClose = () => handleModal();

  return (
    <StyledModal
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      open={isOpen}
      onClose={handleClose}
      BackdropComponent={Backdrop}
    >
      <ModalBox>{children}</ModalBox>
    </StyledModal>
  );
}

RegisterModal.propTypes = {
  isOpen: PropTypes.bool,
  handleModal: PropTypes.func,
  children: PropTypes.element,
};

RegisterModal.defaultProps = {
  isOpen: false,
  handleModal: {},
  children: null,
};
