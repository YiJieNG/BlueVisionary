import React, { useEffect } from "react";
import { Container, Row, Col, Button, Card, CardBody } from "reactstrap";
import { GiEarthAsiaOceania, GiSeaTurtle } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { TbBottleOff } from "react-icons/tb";
import { BsSearchHeart } from "react-icons/bs";
import SeaTurtle from "../../assets/img/SeaTurtle.jpg";
import PlasticPollution from "../../assets/img/PlasticPollution.jpg";
import EndangeredSpecies from "../../assets/img/EndangeredSpecies.jpg";
import Education from "../../assets/img/Education.jpg";
import MiniGame from "../../assets/img/MiniGame.png";
import Tracker from "../../assets/img/Tracker.jpg";
import PlasticFacility from "../../assets/img/Facility.jpg";

import { FaAnglesDown, FaCircleArrowRight } from "react-icons/fa6";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

function HomeContent() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const scrollToFeatures = () => {
    document
      .getElementById("key-features-section")
      .scrollIntoView({ behavior: "smooth" });
  };
  const scrollDown = () => {
    document
      .getElementById("vision-in-action-section")
      .scrollIntoView({ behavior: "smooth" });
  };
  const cardItems = [
    {
      title: "Sea Turtle Journey",
      description:
        "Step into the flippers of a sea turtle, experience the challenges they face and gain a deeper understanding of the effects of plastic pollution on marine reptiles.",
      image: MiniGame,
      link: "/seaturtlegame",
      iconText: "DISCOVER",
    },
    {
      title: "Endangered Marine Species",
      description:
        "Discover the endangered marine species in Australia’s diverse ecosystems across different states. Learn how each state protects these vital creatures.",
      image: EndangeredSpecies,
      link: "/marinelife",
      iconText: "DISCOVER",
    },
    {
      title: "Extent of Plastic Pollution",
      description:
        "Explore detailed data that show how plastic pollution is affecting Australia’s oceans, helping you to focus conservation efforts where they’re needed most.",
      image: PlasticPollution,
      link: "/pollution",
      iconText: "LEARN",
    },
    {
      title: "Educate Yourself",
      description:
        "Dive into a variety of resources to expand and test your knowledge on marine conservation and become a more effective advocate to protect our oceans.",
      image: Education,
      link: "/quiz",
      iconText: "LEARN",
    },
    {
      title: "Track Your Impact",
      description:
        "Track your plastic waste recycling efforts, visualize your progress, and see the impact of your contributions on saving sea turtles and other marine life.",
      image: Tracker,
      link: "/tracker",
      iconText: "PROTECT",
    },
    {
      title: "Give Plastic a Second Life",
      description:
        "Find facilities near you that accept collected plastic waste. Get location details, contact information, and a list of accepted items to help repurpose your recyclables.",
      image: PlasticFacility,
      link: "/facility",
      iconText: "PROTECT",
    },
  ];

  return (
    <>
      <div>
        <div
          className="page-header section-dark"
          style={{
            backgroundImage:
              "url(" +
              require("../../assets/img/naja-bertolt-jensen-Uu1CtKngEXY-unsplash.jpg") +
              ")",
          }}
        >
          <div className="filter" />
          <div className="content-center">
            <Container>
              <div className="title-brand">
                <h1 className="presentation-title">BlueVisionary</h1>
              </div>
              <h2 className="presentation-subtitle text-center">
                Discover. Learn. Protect
              </h2>
              <p className="presentation-descriptions text-center">
                Protect Marine Reptiles for Future Generations now !!!{" "}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <Button
                  onClick={scrollDown}
                  style={{
                    background: "transparent",
                    border: "1px solid transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FaAnglesDown />
                </Button>
              </div>
            </Container>
          </div>
        </div>
        <Container fluid className="homepage-container">
          {/* Hero Section */}
          <Row
            id="vision-in-action-section"
            className="hero-section align-items-center no-margin"
            data-aos="fade-up"
          >
            <Col md="6" className="text-section">
              <h1 className="hero-title">
                Combatting Plastic Pollution to Protect Marine Reptiles
              </h1>
              <p className="hero-subtitle">
                Every year, around 8 million metric tons of plastic enter the
                oceans. It is estimated that 52% of all sea turtles have
                ingested plastic debris. Marine reptiles including turtles are
                particularly vulnerable to plastic pollution, mistaking plastic
                items for food or becoming entangled in debris. BlueVisionary
                empowers you to take action by helping you understand the
                profound challenges faced by marine reptiles, exploring the
                growing scale of plastic pollution, and tracking the real impact
                your efforts can make.
              </p>
              <Button
                className="dark-blue-button cta-button"
                onClick={scrollToFeatures}
              >
                Getting Started
              </Button>
            </Col>
            <Col md="6" className="image-section image-autofill">
              <img src={SeaTurtle} alt="Sea Turtle" className="img-fluid" />
            </Col>
          </Row>

          {/* Information Section */}
          <Row
            className="information-section text-center no-margin"
            data-aos="fade-up"
          >
            <Col>
              <h1 className="hero-title">
                How You Can Protect Marine Reptiles
              </h1>
              <p className="hero-subtitle information-margin">
                With BlueVisionary, you have the power to actively protect
                marine reptiles and contribute to the health of our oceans. Our
                platform equips you with the tools and knowledge to take
                meaningful action. By reducing plastic pollution, raising
                awareness, and driving conservation efforts, you can make a real
                difference.
              </p>
            </Col>
            <Row className="icons-row text-center mb-5 justify-content-center">
              <Col xs="auto" className="icon-margin">
                <GiEarthAsiaOceania size={80} />
                <p className="icon-word-padding">Protect Ocean</p>
              </Col>
              <Col xs="auto" className="icon-margin">
                <TbBottleOff size={80} />
                <p className="icon-word-padding">No Plastic</p>
              </Col>
              <Col xs="auto" className="icon-margin">
                <BsSearchHeart size={80} />
                <p className="icon-word-padding">Awareness</p>
              </Col>
              <Col xs="auto" className="icon-margin">
                <GiSeaTurtle size={80} />
                <p className="icon-word-padding">Save Reptiles</p>
              </Col>
            </Row>
          </Row>

          {/* Features Section */}
          <div
            id="key-features-section"
            className="card-feature-section card-margin no-margin"
            data-aos="fade-up"
            style={{ background: "linear-gradient(45deg, #9cd8fd, #eff9ff)" }}
          >
            <h2 className="feature-header">
              {" "}
              <GiSeaTurtle size={45} /> Start Your Journey Here
            </h2>
            <VerticalTimeline>
              {cardItems.map((cardItem, index) => (
                <VerticalTimelineElement
                  key={index}
                  className={`vertical-timeline-element--work ${
                    index % 2 !== 0 ? "custom-left-icon" : ""
                  }`}
                  contentStyle={{
                    background: "#ebfafd",
                    color: "#000",
                    cursor: "pointer",
                  }}
                  contentArrowStyle={{
                    borderRight: "7px solid  #ebfafd",
                  }}
                  iconStyle={{
                    background: "#2776c5",
                    color: "#fff",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "60px",
                    width: "150px",
                    fontSize: "20px",
                    borderRadius: "5px",
                  }}
                  icon={
                    <div style={{ color: "#fff" }}>{cardItem.iconText}</div>
                  }
                  // data-aos="fade-up"
                >
                  <div
                    onClick={() => {
                      navigate(cardItem.link);
                      window.scrollTo(0, 0);
                    }}
                  >
                    <h3 className="vertical-timeline-element-title">
                      {cardItem.title}
                    </h3>
                    <p className="feature-description">
                      {cardItem.description}
                    </p>
                    <img
                      src={cardItem.image}
                      alt="Small Icon"
                      className="img-fluid custom-border mt-auto"
                      style={{ paddingTop: "0.8rem" }}
                    />
                  </div>
                </VerticalTimelineElement>
              ))}
            </VerticalTimeline>
          </div>
        </Container>
      </div>
    </>
  );
}

export default HomeContent;
