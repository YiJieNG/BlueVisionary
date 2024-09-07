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

function HomeContent_1() {
  const navigate = useNavigate();
  const scrollToFeatures = () => { document.getElementById("key-features-section").scrollIntoView({ behavior: "smooth" }); };
  const cardItems = [
    {
      title: "Endangered Marine Species",
      description:
        "Discover the endangered marine species in Australia’s diverse ecosystems across different states. Learn how each state protects these vital creatures.",
      image: EndangeredSpecies,
      link: "/iter1/marinelife",
    },
    {
      title: "Extent of plastic pollution",
      description:
        "Explore detailed data that show how plastic pollution is affecting Australia’s oceans, helping you to focus conservation efforts where they’re needed most.",
      image: PlasticPollution,
      link: "/iter1",
    },
    {
      title: "Track Your Impact",
      description:
        "Log your conservation activities and visualize your progress over time, staying motivated by seeing the difference you’re making in protecting marine life.",
      image: CleanUp,
      link: "/iter1",
    },
    {
      title: "Educate yourself",
      description:
        "Dive into a variety of resources to expand and test your knowledge on marine conservation and become a more effective advocate to protect our oceans.",
      image: Education,
      link: "/iter1/quiz",
    },
  ];

  return (
    <>
      <div>
        <Container fluid className="homepage-container">
          {/* Hero Section */}
          <Row className="hero-section align-items-center no-margin">
            <Col md="6" className="text-section">
              <h1 className="hero-title">Our Vision</h1>
              <p className="hero-subtitle">
                We envision a world where everyone, regardless of their location
                or busy schedule, can contribute to the health of our oceans to
                save marine lifes especially reptiles. BlueVisionary bridges the
                gap between awareness and action, providing a user-friendly
                platform where you can discover the extent of plastic pollution,
                track your cleanup efforts, and visualize the impact you're
                making.
              </p>
              <Button className="dark-blue-button cta-button" onClick={scrollToFeatures}>
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
              <h1 className="hero-title">Our Goals</h1>
              <p className="hero-subtitle information-margin">
                At BlueVisionary, we empower individuals and communities to
                actively participate in marine conservation. Our platform is
                designed to help you understand the challenges our oceans face,
                reduce plastic pollution, and contribute to protect marine life
                especially reptiles. Through education, actionable insights, and
                community-driven efforts, we aim to make a lasting impact on our
                planet's health.
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
          <Row id="key-features-section" className="card-feature-section card-margin no-margin">
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

export default HomeContent_1;
