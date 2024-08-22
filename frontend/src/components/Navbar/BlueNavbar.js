import { useState, useEffect } from 'react';
import {
    Collapse,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container,
    Button,
} from 'reactstrap';
import classnames from 'classnames';



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

        return function cleanup() {
            window.removeEventListener("scroll", updateNavbarColor);
        };
    });

    return (

        <Navbar className={classnames("fixed-top", navbarColor)} expand="lg">
            <Container>
                <div className="navbar-translate">
                    <NavbarBrand
                        data-placement="bottom"
                        href="/"
                    >
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
                    <Nav navbar>
                        <NavItem>
                            <NavLink href="/marinelife"
                            // target="_blank"
                            >
                                Marine Life
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/"
                            // target="_blank"
                            >
                                Volunteering
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/"
                            // target="_blank"
                            >
                                Pollution Insights
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/"
                            // target="_blank"
                            >
                                Marine Policies
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>

    )
}

export default BlueNavbar;
