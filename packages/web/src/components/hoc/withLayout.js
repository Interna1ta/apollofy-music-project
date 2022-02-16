import React from "react";
import { isBrowser, isMobile } from "react-device-detect";
import styled from "styled-components";

import Footer from "../organisms/information/Footer";
import FriendsColumn from "../organisms/information/FriendsColumn";
import AudioPlayer from "../organisms/input-controls/AudioPlayer";
import MenuBar from "../organisms/navigation/MenuBar";
import ControlBar from "../molecules/ControlBar";
import FlexColumn from "../atoms/layout/FlexColumn";

const MainLayout = styled.main`
  display: flex;
  padding: 1.25rem;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto 6rem;
  @media only screen and (max-width: ${({ theme }) => theme.media.tablet}) {
    padding: 1rem 0;
    gap: 0.5rem;
    flex-direction: column;
    justify-content: center;
  }
  @media only screen and (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 1rem 0;
  }
`;

const PageContent = styled.div`
  width: calc(100% - 18rem);
  padding: 0 1.25rem;
  @media only screen and (max-width: ${({ theme }) => theme.media.tablet}) {
    width: 100%;
  }
`;

const RightFlex = styled(FlexColumn)`
  display: flex;
  justify-content: flex-start;
`;

function withLayout(WrappedComponent) {
  function WrapperComponent({ ...props }) {
    return (
      <>
        {isBrowser && (
          <>
            <MainLayout>
              <ControlBar />
              <PageContent>
                <WrappedComponent {...props} />
              </PageContent>
              <RightFlex>
                <MenuBar />
                <FriendsColumn />
                <Footer />
              </RightFlex>
            </MainLayout>
            <AudioPlayer />
          </>
        )}
        {isMobile && (
          <>
            <MainLayout>
              <PageContent>
                <WrappedComponent {...props} />
              </PageContent>
            </MainLayout>
            <AudioPlayer />
            <ControlBar />
          </>
        )}
      </>
    );
  }
  return WrapperComponent;
}

export default withLayout;
