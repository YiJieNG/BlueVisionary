import { useState, useEffect } from "react";
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  NavbarToggler,
} from "reactstrap";
import classnames from "classnames";

function BlueNavbar() {
  const [navbarColor, setNavbarColor] = useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = useState(false);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 299 ||
        document.body.scrollTop > 299
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 300 ||
        document.body.scrollTop < 300
      ) {
        setNavbarColor("navbar-transparent");
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return () => {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  }, []);

  return (
    <Navbar className={classnames("fixed-top", navbarColor)} expand="lg" light>
      <Container>
        <NavbarBrand href="/" className="mr-auto">
          BlueVisionary
        </NavbarBrand>
        <NavbarToggler
          onClick={toggleNavbarCollapse}
          aria-controls="navbarCollapse"
        />
        <Collapse
          id="navbarCollapse"
          className="justify-content-end"
          isOpen={navbarCollapse}
          navbar
        >
          <Nav navbar className="ml-auto">
            <NavItem>
              <NavLink href="/">Marine Life</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">Volunteering</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">Pollution Insights</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">Marine Policies</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default BlueNavbar;
