import React, { useState, useEffect, useRef } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useHistory } from "react-router-dom";

const NavBar = () => {
  const [value, setValue] = useState(0);
  const prevValue = useRef(0);
  const history = useHistory();

  /* update index on focused tab */
  const handleChange = (_e, newValue) => {
    if (newValue === value) return;
    setValue(newValue);
  };

  /* reroute if clicked on different tab */
  useEffect(() => {
    if (prevValue.current === value) return;
    switch (value) {
      case 0:
        history.push("/");
        break;
      case 1:
        history.push("/Favorites");
        break;
    }
    prevValue.current = value;
  }, [value]);

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
    </>
  );
};

export default NavBar;
