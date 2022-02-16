import React from "react";
import { func, string } from "prop-types";
import { styled as styledMaterial } from "@mui/system";
import SwitchUnstyled, { switchUnstyledClasses } from "@mui/base/SwitchUnstyled";

import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeTwoToneIcon from "@mui/icons-material/DarkModeTwoTone";

const blue = {
  500: "#007FFF",
};

const grey = {
  400: "#BFC7CF",
  500: "#AAB4BE",
};

const Root = styledMaterial("span")`
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  margin: 10px;
  cursor: pointer;

  &.${switchUnstyledClasses.disabled} {
    opacity: 0.4;
    cursor: not-allowed;
  }

  & .${switchUnstyledClasses.track} {
    background: ${grey[400]};
    border-radius: 10px;
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
  }

  & .${switchUnstyledClasses.thumb} {
    display: block;
    width: 14px;
    height: 14px;
    top: 3px;
    left: 3px;
    border-radius: 16px;
    background-color: #fff;
    position: relative;
    transition: all 200ms ease;
  }

  &.${switchUnstyledClasses.focusVisible} .${switchUnstyledClasses.thumb} {
    background-color: ${grey[500]};
    box-shadow: 0 0 1px 8px rgba(0, 0, 0, 0.25);
  }

  &.${switchUnstyledClasses.checked} {
    .${switchUnstyledClasses.thumb} {
      left: 22px;
      top: 3px;
      background-color: #fff;
    }

    .${switchUnstyledClasses.track} {
      background: ${blue[500]};
    }
  }

  & .${switchUnstyledClasses.input} {
    cursor: inherit;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
    margin: 0;
  }
`;

const Toggle = ({ theme, toggleTheme }) => {
  const label = { componentsProps: { input: { "aria-label": "Demo switch" } } };

  return (
    // <Brightness4Icon
    //   // sx={{ display: "block" }}
    //   color="disabled"
    //   component={Root}
    //   {...label}
    //   defaultChecked
    //   onClick={toggleTheme}
    // />

    <Box
      sx={{
        display: "flex",
        borderRadius: 1,
        justifyContent: "center",
        padding: 0,
      }}
    >
      <IconButton sx={{ margin: 0, padding: 0 }} onClick={toggleTheme} color="inherit">
        {theme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
};

Toggle.propTypes = {
  theme: string.isRequired,
  toggleTheme: func.isRequired,
};

export default Toggle;
