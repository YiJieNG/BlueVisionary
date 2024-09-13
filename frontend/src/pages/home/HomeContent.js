import { Container, Row, Col, Button, Card, CardBody } from "reactstrap";
import { GiEarthAsiaOceania, GiSeaTurtle } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import { TbBottleOff } from "react-icons/tb";
import { BsSearchHeart } from "react-icons/bs";
import SeaTurtle from "../../assets/img/SeaTurtle.jpg";
import PlasticPollution from "../../assets/img/PlasticPollution.jpg";
import CleanUp from "../../assets/img/CleanUp.jpg";
import EndangeredSpecies from "../../assets/img/EndangeredSpecies.jpg";
import Education from "../../assets/img/Education.jpg";
import MiniGame from "../../assets/img/MiniGame.png";

function HomeContent() {
  const navigate = useNavigate();
  const scrollToFeatures = () => {
    document
      .getElementById("key-features-section")
      .scrollIntoView({ behavior: "smooth" });
  };
  const cardItems = [
    {
      title: "Endangered Marine Species",
      description:
        "Discover the endangered marine species in Australia’s diverse ecosystems across different states. Learn how each state protects these vital creatures.",
      image: EndangeredSpecies,
      link: "/marinelife",
    },
    {
      title: "Extent of plastic pollution",
      description:
        "Explore detailed data that show how plastic pollution is affecting Australia’s oceans, helping you to focus conservation efforts where they’re needed most.",
      image: PlasticPollution,
      link: "/pollution",
    },
    // {
    //   title: "Track Your Impact",
    //   description:
    //     "Log your conservation activities and visualize your progress over time, staying motivated by seeing the difference you’re making in protecting marine life.",
    //   image: CleanUp,
    //   link: "/",
    // },
    {
      title: "Sea Turtle Journey",
      description:
        "Step into the flippers of a sea turtle, experience the challenges they face and gain a deeper understanding of the effects of plastic pollution on marine reptiles.",
      image: MiniGame,
      link: "/minigame",
    },
    {
      title: "Educate yourself",
      description:
        "Dive into a variety of resources to expand and test your knowledge on marine conservation and become a more effective advocate to protect our oceans.",
      image: Education,
      link: "/quiz",
    },
  ];

  return (
    <>
      <div>
        <Container fluid className="homepage-container">
          {/* Hero Section */}
          <Row className="hero-section align-items-center no-margin">
            <Col md="6" className="text-section">
              <h1 className="hero-title">Your Vision in Action</h1>
              <p className="hero-subtitle">
                Imagine a world where you, no matter where you are or how busy
                your schedule, can make a meaningful contribution to the health
                of our oceans and save marine life, especially reptiles.
                BlueVisionary empowers you to take action, helping you
                understand challenges faced by marine reptiles, explore the
                scale of plastic pollution, track your cleanup efforts, and see
                the real impact you’re making.
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

          {/* Header Section */}
          <Row className="information-section text-center no-margin">
            <Col>
              <h1 className="hero-title">What You Can Achieve</h1>
              <p className="hero-subtitle information-margin">
                With BlueVisionary, you have the power to actively engage in
                marine conservation. Our platform helps you understand the
                challenges our oceans face, reduce plastic pollution, and make a
                real difference in protecting marine life, especially reptiles.
                Through education, actionable insights, and community-driven
                efforts, you can help create a lasting positive impact on the
                health of our planet.
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
          {/* Icons Row */}

          {/* Features Section */}
          <Row
            id="key-features-section"
            className="card-feature-section card-margin no-margin"
          >
            <h2 className="feature-header">Key Features</h2>
            {cardItems.map((cardItem, index) => (
              <Col md="3" sm="6" xs="12" key={index} className="mb-4 d-flex">
                <Card
                  className="feature-card features-row custom-border"
                  style={{ padding: "1rem 1.5rem", cursor: "pointer" }}
                  onClick={() => navigate(cardItem.link)}
                >
                  <CardBody className="d-flex flex-column">
                    <h5 className="feature-title">{cardItem.title}</h5>
                    <p className="feature-description">
                      {cardItem.description}
                    </p>
                    <img
                      src={cardItem.image}
                      alt="Small Icon"
                      className="img-fluid custom-border mt-auto"
                    />
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
}

export default HomeContent;
