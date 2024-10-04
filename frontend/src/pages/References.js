import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, CardBody } from "reactstrap";

function References() {
  const navigate = useNavigate();

  return (
    <div className="section-with-space">
      <div className="section-marinelife marine-life-content">
        <Container fluid>
          <Row>
            <Col md="12" sm={{ size: "auto" }}>
              <div
                style={{
                  margin: "50px 40px 30px 40px",
                  padding: "10px",
                }}
              >
                <h2 className="feature-title">
                  Data references and Attribution
                </h2>
                <h4
                  className="feature-description"
                  style={{ color: "#3f4447" }}
                >
                  We aim to provide data sources used and attribute resources
                  applied in BlueVisionary
                </h4>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md="12" sm={{ size: "auto" }}>
              <div
                style={{
                  margin: "0px 40px 30px 40px",
                }}
              >
                <h3 className="feature-title">a) Data references</h3>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md="12" xs="12" style={{ paddingBottom: "2rem" }}>
              <Card
                style={{
                  "margin-left": "40px",
                  "margin-right": "40px",
                  padding: "20px",
                  //   background: "linear-gradient(45deg, #cbd2ff, #cbecff)",
                }}
              >
                <h4>
                  <b>Marine Life</b>
                </h4>
                <h6 className="facility-caption">
                  1.{" "}
                  <a href="https://fed.dcceew.gov.au/datasets/erin::species-of-national-environmental-significance-and-selected-marine-and-cetacean-species/explore?location=-19.690183%2C-73.460000%2C2.72&showTable=true">
                    Species Dataset
                  </a>
                </h6>
                <h6 className="facility-caption">
                  2.{" "}
                  <a href="https://data.gov.au/data/dataset/ae652011-f39e-4c6c-91b8-1dc2d2dfee8f/resource/78401dce-1f40-49d3-92c4-3713d6e34974/download/20240716spcs.csv">
                    Species state
                  </a>
                </h6>
                <h6 className="facility-caption">
                  3.{" "}
                  <a href="https://apiv3.iucnredlist.org/api/v3/docs#version">
                    Species API narrative
                  </a>
                </h6>
              </Card>
              <Card
                style={{
                  "margin-top": "20px",
                  "margin-left": "40px",
                  "margin-right": "40px",
                  padding: "20px",
                  //   background: "linear-gradient(45deg, #cbd2ff, #cbecff)",
                }}
              >
                <h4>
                  <b>Pollution Insights</b>
                </h4>
                <h6 className="facility-caption">
                  1.{" "}
                  <a href="https://portal.aodn.org.au/search?uuid=fd3d74b0-0234-4864-bbc6-751c44e41f5e">
                    MicroPlastic distribution dataset
                  </a>
                </h6>
              </Card>
              <Card
                style={{
                  "margin-top": "20px",
                  "margin-left": "40px",
                  "margin-right": "40px",
                  padding: "20px",
                  //   background: "linear-gradient(45deg, #cbd2ff, #cbecff)",
                }}
              >
                <h4>
                  <b>Minigame</b>
                </h4>
                <h6 className="facility-caption">
                  1.{" "}
                  <a href="https://portal.aodn.org.au/search?uuid=fd3d74b0-0234-4864-bbc6-751c44e41f5e">
                    MicroPlastic distribution dataset
                  </a>
                </h6>
                <h6 className="facility-caption">
                  2.{" "}
                  <a href="https://www.researchgate.net/figure/List-of-environmental-legislation-and-policy-reviewed_tbl1_331023282">
                    MarineLaw dataset
                  </a>
                </h6>
              </Card>
              <Card
                style={{
                  "margin-top": "20px",
                  "margin-left": "40px",
                  "margin-right": "40px",
                  padding: "20px",
                  //   background: "linear-gradient(45deg, #cbd2ff, #cbecff)",
                }}
              >
                <h4>
                  <b>Tracker</b>
                </h4>
                <h6 className="facility-caption">
                  1.{" "}
                  <a href="https://universe.roboflow.com/asia-pacific-university-msg4d/plastic-detection-o3dr4">
                    Plastic object detection dataset 1
                  </a>
                </h6>
                <h6 className="facility-caption">
                  2.{" "}
                  <a href="https://universe.roboflow.com/yolov5-6agzx/plastic-waste-management-6p8kw">
                    Plastic object detection dataset 2
                  </a>
                </h6>
              </Card>
              <Card
                style={{
                  "margin-top": "20px",
                  "margin-left": "40px",
                  "margin-right": "40px",
                  padding: "20px",
                  //   background: "linear-gradient(45deg, #cbd2ff, #cbecff)",
                }}
              >
                <h4>
                  <b>Plastic Facility</b>
                </h4>
                <h6 className="facility-caption">
                  1.{" "}
                  <a href="https://universe.roboflow.com/asia-pacific-university-msg4d/plastic-detection-o3dr4">
                    Facility dataset
                  </a>
                </h6>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md="12" sm={{ size: "auto" }}>
              <div
                style={{
                  margin: "0px 40px 30px 40px",
                }}
              >
                <h3 className="feature-title">b) Attribution</h3>
              </div>
            </Col>
          </Row>

          <Row>
            <Col md="12" xs="12" style={{ paddingBottom: "2rem" }}>
              <Card
                style={{
                  "margin-left": "40px",
                  "margin-right": "40px",
                  padding: "20px",
                  //   background: "linear-gradient(45deg, #cbd2ff, #cbecff)",
                }}
              >
                <h4>
                  <b>Home page</b>
                </h4>
                <h6 className="facility-caption">
                  1. Sea turtle under feature 2: Photo by{" "}
                  <a href="https://unsplash.com/@dustinhaney?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
                    Dustin Haney
                  </a>{" "}
                  on{" "}
                  <a href="https://unsplash.com/photos/underwater-photography-of-sea-turtle-s6B6mlgqIjk?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
                    Unsplash
                  </a>
                </h6>
                <h6 className="facility-caption">
                  2. Plastic under feature 3: Photo by{" "}
                  <a href="https://unsplash.com/@naja_bertolt_jensen?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
                    Naja Bertolt Jensen
                  </a>{" "}
                  on{" "}
                  <a href="https://unsplash.com/photos/school-of-fish-in-water-BJUoZu0mpt0?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
                    Unsplash
                  </a>
                </h6>
                <h6 className="facility-caption">
                  3. Education under feature 4: Photo by{" "}
                  <a href="https://unsplash.com/@comparefibre?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
                    Compare Fibre
                  </a>{" "}
                  on{" "}
                  <a href="https://unsplash.com/photos/person-in-red-shirt-wearing-black-and-gray-headphones-Y8TiLvKnLeg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
                    Unsplash
                  </a>
                </h6>
                <h6 className="facility-caption">
                  4. Tracker under feature 5: Photo by{" "}
                  <a href="https://unsplash.com/@tobiastu?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
                    Tobias Tullius{" "}
                  </a>{" "}
                  on{" "}
                  <a href="https://unsplash.com/photos/3-blue-garbage-cans-in-beach--wR0XMaegRo?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
                    Unsplash
                  </a>
                </h6>
                <h6 className="facility-caption">
                  5. Facility under feature 6: Photo by{" "}
                  <a href="https://unsplash.com/@jon_chng?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
                    Jonathan Chng
                  </a>{" "}
                  on{" "}
                  <a href="https://unsplash.com/photos/white-plastic-bottle-lot-OTDyDgPoJ_0?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
                    Unsplash
                  </a>
                </h6>
                <h4>
                  <b>Quiz</b>
                </h4>
                <h6 className="facility-caption">
                  1. Sea turtle under landing page: Photo by{" "}
                  <a href="https://unsplash.com/@rayyu?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
                    Rayyu Maldives
                  </a>{" "}
                  on{" "}
                  <a href="https://unsplash.com/photos/a-turtle-swimming-in-the-ocean-cDsfRDTqg_8?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
                    Unsplash
                  </a>
                </h6>
                <h4>
                  <b>Minigame</b>
                </h4>
                <h6 className="facility-caption">
                  1.{" "}
                  <a href="https://craftpix.net/freebies/octopus-jellyfish-shark-and-turtle-free-sprite-pixel-art/?num=1&count=13&sq=turtle&pos=5">
                    Sprite Pixel
                  </a>{" "}
                </h6>
                <h6 className="facility-caption">
                  2.{" "}
                  <a href="https://opengameart.org/content/underwater-fantasy">
                    Background Image
                  </a>{" "}
                </h6>
                <h6 className="facility-caption">
                  3.{" "}
                  <a href="https://opengameart.org/content/bubble-0">
                    Bubble Image
                  </a>{" "}
                </h6>
                <h6 className="facility-caption">
                  4.{" "}
                  <a href="https://craftpix.net/freebies/island-game-gui/">
                    Board Image
                  </a>{" "}
                </h6>
                <h4>
                  <b>Icon used</b>
                </h4>
                <h6 className="facility-caption">
                  1. Icons used in Bluevisionary are from{" "}
                  <a href="https://react-icons.github.io/react-icons/">
                    React Icon
                  </a>{" "}
                  and <a href="https://icons8.com/icons/set/seahorse">Icons8</a>
                </h6>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default References;
