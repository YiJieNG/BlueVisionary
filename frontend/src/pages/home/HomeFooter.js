import { Container, Row, Col } from "reactstrap";

function HomeFooter() {
  return (
    <>
      <footer className="footer-section">
        <Container>
          {/* <Row>
                    <Col md="4">
                        <h6 className="footer-title">ABOUT BLUEVISIONARY</h6>
                        <ul className="footer-list">
                            <li><a href="/">About us</a></li>
                            <li><a href="/">Contact us</a></li>
                            <li><a href="/">&copy; Copyright</a></li>
                        </ul>
                    </Col>
                    <Col md="4">
                        <h6 className="footer-title">SERVICES</h6>
                        <ul className="footer-list">
                        <li><a href="/marinelife">Endangered Species Data and Insights</a></li>
                        <li><a href="/">Plastic Pollution Extent</a></li>
                        <li><a href="/">Monitor Your Conservation Impact</a></li>
                        <li><a href="/quiz">Educational Resources</a></li>
                        <li><a href="/">Species Identification Tool</a></li>
                        </ul>
                    </Col>
                    <Col md="4">
                        <h6 className="footer-title">NEWSROOM</h6>
                        <ul className="footer-list">
                            <li><a href="/">Media releases</a></li>
                        </ul>
                    </Col>
                </Row> */}
          {/* <Row className="footer-bottom-row"> */}
          <Col md="12" className="text-center">
            <p style={{ margin: "0" }}>
              &copy; 2024, made with love by BlueVisionary &copy; |{" "}
              <a href="/references">References</a>
            </p>
          </Col>
          {/* </Row> */}
        </Container>
      </footer>
    </>
  );
}

export default HomeFooter;
