import { useLocation } from "react-router-dom";
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
  const location = useLocation();
  const [navbarColor, setNavbarColor] = useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = useState(false);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  useEffect(() => {
    const updateNavbarColor = () => {
      if (
        !(location.pathname === "/") ||
        document.documentElement.scrollTop > 299 ||
        document.body.scrollTop > 299
      ) {
        setNavbarColor("");
      } else {
        setNavbarColor("navbar-transparent");
      }
    };

    // Run the function initially
    updateNavbarColor();

    // Add scroll event listener
    window.addEventListener("scroll", updateNavbarColor);

    return () => {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  }, [location.pathname]);

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

export default BlueNavbar;
