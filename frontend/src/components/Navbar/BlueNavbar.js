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

  const normalizePath = (path) => {
    return path.endsWith("/") ? path.slice(0, -1) : path; // Remove trailing slash if exists
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
          <img
            src="/logo.png"
            alt="BlueVisionary Logo"
            style={{ width: "35px", height: "35px", marginRight: "5px" }}
          />{" "}
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
              <NavLink
                href="/marinelife"
                className={
                  normalizePath(location.pathname) === "/marinelife"
                    ? "active"
                    : ""
                }
              >
                Marine Life
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="/pollution"
                className={
                  normalizePath(location.pathname) === "/pollution"
                    ? "active"
                    : ""
                }
              >
                Pollution Insights
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="/minigame"
                className={
                  normalizePath(location.pathname) === "/minigame"
                    ? "active"
                    : ""
                }
              >
                Mini Game
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="/quiz"
                className={
                  normalizePath(location.pathname) === "/quiz" ? "active" : ""
                }
              >
                Educate Yourself
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default BlueNavbar;
