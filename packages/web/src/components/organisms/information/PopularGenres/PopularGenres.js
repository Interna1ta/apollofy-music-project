import React from "react";
import styled from "styled-components";

import { useFetchGenres } from "../../../../hooks/useGenres";
import GenreDetail from "../../../molecules/details/GenreDetail";
import SmallText from "../../../atoms/body/SmallText";
import { SectionLayout } from "../PopularTracks/PopularTracks";

const GenresList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;

  @media only screen and (max-width: ${({ theme }) => theme.media.mobile}) {
    padding: 2rem;
  }
`;

const GenresText = styled(SmallText)`
  @media only screen and (max-width: ${({ theme }) => theme.media.mobile}) {
    margin: auto;
  }
`;

export default function PopularGenres() {
  const { data: genres } = useFetchGenres();
  return (
    <SectionLayout>
      <GenresText>Genres</GenresText>
      <GenresList>
        {genres?.data?.data?.map((genre) => (
          <GenreDetail key={genre.id} genre={genre} />
        ))}
      </GenresList>
    </SectionLayout>
  );
}
