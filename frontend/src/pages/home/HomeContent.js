import { Container, Row, Col, Button, Card, CardBody } from 'reactstrap';

function HomeContent() {
    return (
        <>
            <div >
            <Container fluid className="homepage-container">
            {/* Hero Section */}
            <Row className="hero-section align-items-center">
                <Col md="6" className="text-section">
                    <h1 className="hero-title">Our Vision</h1>
                    <p className="hero-subtitle">
                    We envision a world where everyone, regardless of their location or busy schedule, can contribute to the health of our oceans. BlueVisionary bridges the gap between awareness and action, providing a user-friendly platform where you can discover the extent of plastic pollution, track your cleanup efforts, and visualize the impact you're making.
                    </p>
                    <Button color="info" className="cta-button">Getting Started</Button>
                </Col>
                <Col md="6" className="image-section image-autofill">
                    <img src="https://picsum.photos/1200/500" alt="Hero Image" className="img-fluid image-border"/>
                </Col>
            </Row>

            {/* Features Section */}
            <Row className="features-section">
                <Col md="4">
                    <Card className="feature-card features-row">
                        <CardBody>
                            <h5 className="feature-title">Extent of plastic pollution.</h5>
                            <p className="feature-description">
                            Explore detailed data and maps that show how plastic pollution is affecting Australia’s oceans, helping you focus your conservation efforts where they’re needed most.
                            </p>
                            <img src="https://picsum.photos/100" alt="Small Icon" className="img-fluid image-border"/>
                        </CardBody>
                    </Card>
                </Col>
                <Col md="4">
                    <Card className="feature-card features-row">
                        <CardBody>
                            <h5 className="feature-title">Track Your Impact</h5>
                            <p className="feature-description">
                                Log your conservation activities and visualize your progress over time, staying motivated by seeing the difference you’re making in protecting marine life.
                            </p>
                            <img src="https://picsum.photos/100" alt="Small Icon" className="img-fluid image-border"/>
                        </CardBody>
                    </Card>
                </Col>
                <Col md="4">
                    <Card className="feature-card features-row">
                        <CardBody>
                            <h5 className="feature-title">Educate Yourself</h5>
                            <p className="feature-description">
                                Dive into a variety of resources to expand your knowledge on marine conservation and become a more effective advocate to protect our oceans.
                            </p>
                            <img src="https://picsum.photos/100" alt="Small Icon" className="img-fluid image-border"/>
                        </CardBody>
                    </Card>
                </Col>

            </Row>
        </Container>
            </div>
        </>
    );
}

export default HomeContent;