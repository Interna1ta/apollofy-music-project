import React from "react";
import Slider from "react-slick";
import styled from "styled-components";

import PlaylistCard from "../../../molecules/cards/PlaylistCard";
import { useFetchPlaylists } from "../../../../hooks/usePlaylists";

import "./PlaylistCarousel.css";

const Layout = styled.div`
  max-width: 45rem;
  margin: auto;
  padding: 1rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.colors.background.secondary};
`;

export default function PlaylistCarousel() {
  const { data: playlists } = useFetchPlaylists();
  const playlistsList = playlists?.data?.data;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <Layout>
      <Slider {...settings}>
        {playlistsList?.map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </Slider>
    </Layout>
  );
}
