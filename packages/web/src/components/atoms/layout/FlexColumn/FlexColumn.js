import styled from "styled-components";

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.45rem;
  align-items: center;
  flex-grow: 1;
  @media only screen and (max-width: ${({ theme }) => theme.media.tablet}) {
    display: none;
  }
`;

export default FlexColumn;
