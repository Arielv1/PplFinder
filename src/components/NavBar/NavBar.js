import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Home from "../../pages/Home/index";
import Favorites from "../../pages/Favorites/index";
import { Link } from "react-router-dom";
const NavBar = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_e, newValue) => {
    setValue(newValue);
  };

  const renderPage = (pageValue) => {
    switch (pageValue) {
      case 0:
        return <Home />;
      case 1:
        return <Favorites />;
    }
  };
  return (
    <>
      <AppBar position="static" color="transparent" style={{ position: "fixed", top: 0 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Navigation"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Home" index={0} />
          <Tab label="Favorites" index={1} />
        </Tabs>
      </AppBar>
      {!!value && renderPage(value)}
    </>
  );
};

export default NavBar;
