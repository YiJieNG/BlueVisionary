import { useState, useEffect } from "react";
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
} from "reactstrap";
import classnames from "classnames";

function CommonNavbar() {
  const [navbarColor, setNavbarColor] = useState("");
  const [navbarCollapse, setNavbarCollapse] = useState(false);
  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  return (
    <Navbar className={classnames("fixed-top", navbarColor)} expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand data-placement="bottom" href="/">
            BlueVisionary
          </NavbarBrand>
          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: navbarCollapse,
            })}
            onClick={toggleNavbarCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={navbarCollapse}
        >
          <Nav navbar className="ml-auto">
            <NavItem>
              <NavLink href="/marinelife">Marine Life</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">Pollution Insights</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">Track Impact</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/quiz">Educate Yourself</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default CommonNavbar;
