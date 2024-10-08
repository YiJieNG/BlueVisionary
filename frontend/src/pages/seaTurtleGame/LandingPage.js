import React, { useEffect, useState, useCallback } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaInfoCircle } from "react-icons/fa";
import VICImage from "../../assets/img/minigame/VIC.png";
import NSWImage from "../../assets/img/minigame/NSW.png";
import QLDImage from "../../assets/img/minigame/QLD.png";
import WAImage from "../../assets/img/minigame/WA.png";
import SAImage from "../../assets/img/minigame/SA.png";
import TASImage from "../../assets/img/minigame/TAS.png";
import NTImage from "../../assets/img/minigame/NT.png";
import plasticImage from "../../assets/img/minigame/plastic.png";
import { Row, Col, Tooltip } from "reactstrap";

const stateImages = {
  VIC: VICImage,
  NSW: NSWImage,
  QLD: QLDImage,
  WA: WAImage,
  SA: SAImage,
  TAS: TASImage,
  NT: NTImage,
};

const LandingPage = ({ onStartGame, gameStateData }) => {
  const [selectedDifficultyLevel, setSelectedDifficultyLevel] = useState("ALL");
  const [selectedState, setSelectedState] = useState(gameStateData[0]);
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current index of the carousel
  const [filteredStateData, setFilteredStateData] = useState(gameStateData);

  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggleTooltip = () => {
    setTooltipOpen((prevState) => !prevState);
  };

  const resetTooltip = () => {
    setTooltipOpen(false);
  };

  useEffect(() => {
    setSelectedState(gameStateData[0]);
    setCurrentIndex(0);
    setFilteredStateData(gameStateData);
  }, [gameStateData]);

  useEffect(() => {
    document.title = "Role-Play Journey";
  }, []);

  const filteredData = useCallback(
    (myData) => {
      return myData.filter(
        (data) =>
          selectedDifficultyLevel === "ALL" ||
          data.difficultyLevel === selectedDifficultyLevel
      );
    },
    [selectedDifficultyLevel] // Add selectedDifficultyLevel as a dependency
  );

  useEffect(() => {
    setFilteredStateData(filteredData(gameStateData));
    setSelectedState(filteredData(gameStateData)[0]);
  }, [selectedDifficultyLevel, filteredData, gameStateData]);

  // Handler when difficulty changes
  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficultyLevel(difficulty);
    setCurrentIndex(0); // Reset index to 0 whenever difficulty changes
  };

  // const filteredData = (myData) => {
  //   return myData.filter(
  //     (data) =>
  //       selectedDifficultyLevel === "ALL" ||
  //       data.difficultyLevel === selectedDifficultyLevel
  //   );
  // };

  const handleStartGame = () => {
    if (selectedState) {
      onStartGame(
        selectedState.state,
        selectedState.difficulty,
        selectedState.difficultyLevel,
        selectedState.name,
        selectedState.score,
        selectedState.score
      );
    }
  };

  return (
    <div className="game-landing-page">
      <div className="content">
        <h2>Welcome to our immersive sea-turtle role-play game</h2>
        <p>
          Experience the dangers of plastic pollution through the eyes of a sea
          turtle
        </p>
        <p className="subtitle">State selection (Difficulty level):</p>

        <div className="difficulty-buttons">
          {["ALL", "EASY", "MEDIUM", "HARD"].map((difficulty) => (
            <button
              key={difficulty}
              className={`option-button ${
                selectedDifficultyLevel === difficulty ? "selected" : ""
              }`}
              onClick={() => handleDifficultyChange(difficulty)} // Update selectedDifficultyLevel and reset carousel
            >
              {difficulty}
            </button>
          ))}
        </div>
        <div className="states-card">
          {selectedState ? (
            <Carousel
              showThumbs={false}
              showStatus={false}
              infiniteLoop={true}
              emulateTouch={true}
              selectedItem={currentIndex} // Control the current index based on the state
              onChange={(index) => {
                setCurrentIndex(index); // Update currentIndex when user navigates manually
                setSelectedState(filteredData(gameStateData)[index]); // Memorise the selected state
              }}
              renderArrowPrev={(onClickHandler, hasPrev) =>
                hasPrev && (
                  <button
                    className="carousel-arrow prev-arrow"
                    onClick={onClickHandler}
                  >
                    &#8249;
                  </button>
                )
              }
              renderArrowNext={(onClickHandler, hasNext) =>
                hasNext && (
                  <button
                    className="carousel-arrow next-arrow"
                    onClick={onClickHandler}
                  >
                    &#8250;
                  </button>
                )
              }
              renderIndicator={(onClickHandler, isSelected, index, label) => {
                return (
                  <li
                    className={`carousel-dot ${isSelected ? "selected" : ""}`}
                    onClick={onClickHandler}
                    key={index}
                  />
                );
              }}
            >
              {filteredStateData.map((data, index) => (
                <Row key={index} className="state-card">
                  <Col md="6">
                    <div className="state-shape">
                      <img
                        // style={{ height: "120px", width: "50%" }}
                        src={stateImages[data.state]} // Dynamically set the source based on the state
                        alt={data.state} // Alt text as the state name
                      />{" "}
                      {/* <span>{data.state}</span> */}
                    </div>
                  </Col>
                  <Col md="6" className="state-card-details ">
                    <div key={index}>
                      <h2>{data.name}</h2>
                      <div className="card-content ">
                        <p
                          className="difficulty-rating"
                          style={{ fontWeight: "bold" }}
                        >
                          <span
                            style={{ marginLeft: "10px", cursor: "pointer" }}
                            id="turtleClassInfo"
                            onMouseLeave={resetTooltip}
                          >
                            <FaInfoCircle />
                          </span>
                          <Tooltip
                            isOpen={tooltipOpen}
                            target="turtleClassInfo"
                            toggle={toggleTooltip}
                            placement="right"
                          >
                            <div className="custom-tooltip">
                              <h3>Formula applied to classify difficulty</h3>

                              <p>
                                The number of polymers in the dataset is
                                directly proportional to the difficulty level
                                (i.e., the greater the pollution severity, the
                                higher the difficulty). On the other hand, the
                                number of marine laws is inversely proportional
                                to the difficulty (i.e., more laws in the state
                                result in lower difficulty). Both factors
                                contribute equally to determining the
                                difficulty.
                              </p>
                              <h3>Data sources: </h3>
                              <p>
                                Pollution Data:
                                https://portal.aodn.org.au/search?uuid=fd3d74b0-0234-4864-bbc6-751c44e41f5e
                              </p>
                              <p>
                                Marine Law Data:
                                https://www.researchgate.net/figure/List-of-environmental-legislation-and-policy-reviewed_tbl1_331023282
                              </p>
                            </div>
                          </Tooltip>
                          {/* Softmax (polymerCount / oceanArea) * 0.5 + Softmax
                          (-lawCount) * 0.5, then scaled in 25. */}
                          {"  "}
                          Difficulty Rating:
                        </p>
                        {Array.from({ length: data.difficulty }).map(
                          (_, idx) => (
                            <img
                              key={idx}
                              src={plasticImage}
                              alt="plastic bottle"
                              style={{ width: "30px", margin: "10px 5px" }}
                            />
                          )
                        )}
                        <p className="description-insight">
                          <strong>Pollution Rating: </strong>
                          {data.pollutionSeverity}%,{" "}
                          <strong>Marine Laws: </strong> {data.marineLaws}
                        </p>

                        {/* {data.marineLaws === 2
                      ? "Low"
                      : data.marineLaws === 3
                      ? "Medium"
                      : "High"}{" "} */}

                        <button
                          className="start-game-button"
                          onClick={handleStartGame}
                          disabled={!selectedState}
                        >
                          START GAME
                        </button>
                      </div>
                    </div>
                  </Col>
                </Row>
              ))}
            </Carousel>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
