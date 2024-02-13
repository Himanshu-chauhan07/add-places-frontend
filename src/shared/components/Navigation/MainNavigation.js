import React, {useState} from "react";

import { Link } from "react-router-dom/cjs/react-router-dom.min";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./sideDrawer";
import Backdrop from "./../UIElements/Backdrop"
import "./MainNavigation.css";

const MainNavigation = (props) => {
    const [drawerIsOpen , setDrawerIsOpen] = useState(false);
     
    const openDrawerhandler = () => {
        setDrawerIsOpen(true);
    }

    const closeDrawerhandler = () => {
        setDrawerIsOpen(false);
    }

  return (
    <React.Fragment>
        {drawerIsOpen && <Backdrop onClick={closeDrawerhandler}/>}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerhandler}>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>
      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={openDrawerhandler}>
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">Your Places</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
