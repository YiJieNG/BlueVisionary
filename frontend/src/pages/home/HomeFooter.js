import { Container, Row, Col } from 'reactstrap';


function HomeFooter() {
    return (
        <>
            <footer className="footer-section">
            <Container>
                <Row>
                    <Col md="4">
                        <h6 className="footer-title">ABOUT BLUEVISIONARY</h6>
                        <ul className="footer-list">
                            <li><a href="/about-us">About us</a></li>
                            <li><a href="/contact">Contact us</a></li>
                            <li><a href="/copyright">&copy; Copyright</a></li>
                        </ul>
                    </Col>
                    <Col md="4">
                        <h6 className="footer-title">SERVICES</h6>
                        <ul className="footer-list">
                        <li><a href="/counts">Endangered Species Data and Insights</a></li>
                        <li><a href="/experts">Marine Policies</a></li>
                        <li><a href="/parkiteer">Plastic Pollution Extent</a></li>
                        <li><a href="/insure">Monitor Your Conservation Impact</a></li>
                        <li><a href="/reporter">Educational Resources</a></li>
                        <li><a href="/reporter">Species Identification Tool</a></li>
                        </ul>
                    </Col>
                    <Col md="4">
                        <h6 className="footer-title">NEWSROOM</h6>
                        <ul className="footer-list">
                            <li><a href="/media">Media releases</a></li>
                        </ul>
                    </Col>
                </Row>
                <Row className="footer-bottom-row">
                    <Col md="12" className="text-center">
                        <p>&copy; 2024, made with by BlueVisionary | <a href="/privacy">Privacy policy</a> | <a href="/advertising">Advertising & partnerships</a></p>
                    </Col>
                </Row>
            </Container>
        </footer>
        </>
    );
}

export default HomeFooter;