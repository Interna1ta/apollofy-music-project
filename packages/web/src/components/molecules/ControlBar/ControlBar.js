import React from "react";
import { Link, useLocation } from "react-router-dom";

import styled from "styled-components";
import SVG from "react-inlinesvg";

import ScoreSVG from "../../../assets/score.svg";
import HomeSVG from "../../../assets/home.svg";
import SearchSVG from "../../../assets/search.svg";
import StatsSVG from "../../../assets/bar_chart.svg";
import Toggle from "../../atoms/toggles/Switch/Switch";
import { useDarkMode } from "../../../hooks/useDarkMode";

const Bar = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  @media only screen and (max-width: ${({ theme }) => theme.media.tablet}) {
    flex-direction: row;
    position: fixed;
    bottom: 0;
    border: 1px solid ${({ theme }) => theme.colors.border};
    width: 100vw;
    justify-content: space-between;
    padding: 1rem 3rem;
    margin: 0;
    background-color: ${({ theme }) => theme.colors.background.primary};
    z-index: 1;
  }
`;

const NavSVG = styled(SVG)`
  width: 2rem;
  height: 2rem;
  .icon-color {
    fill: ${({ theme }) => theme.colors.text};
  }
`;

const SelectedNavSVG = styled(SVG)`
  width: 2rem;
  height: 2rem;
  .icon-color {
    fill: ${({ theme }) => theme.colors.label};
  }
`;

export default function ControlBar() {
  const { pathname } = useLocation();

  return (
    <Bar>
      <Link to="/">
        {pathname === "/" ? <SelectedNavSVG src={HomeSVG} /> : <NavSVG src={HomeSVG} />}
      </Link>
      <Link to="/create">
        {pathname === "/create" ? <SelectedNavSVG src={ScoreSVG} /> : <NavSVG src={ScoreSVG} />}
      </Link>
      <Link to="/search">
        {pathname === "/search" ? <SelectedNavSVG src={SearchSVG} /> : <NavSVG src={SearchSVG} />}
      </Link>
      <Link to="/stats">
        {pathname === "/stats" ? <SelectedNavSVG src={StatsSVG} /> : <NavSVG src={StatsSVG} />}
      </Link>
      <Toggle />
    </Bar>
  );
}
