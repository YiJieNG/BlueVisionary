import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import VICImage from "../../assets/img/minigame/VIC.png";
import NSWImage from "../../assets/img/minigame/NSW.png";
import QLDImage from "../../assets/img/minigame/QLD.png";
import WAImage from "../../assets/img/minigame/WA.png";
import SAImage from "../../assets/img/minigame/SA.png";
import TASImage from "../../assets/img/minigame/TAS.png";
import NTImage from "../../assets/img/minigame/NT.png";
import plasticImage from "../../assets/img/minigame/plastic.png";
import { Row, Col } from "reactstrap";

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
  useEffect(() => {
    setSelectedState(gameStateData[0]);
    setCurrentIndex(0);
    setFilteredStateData(gameStateData);
  }, [gameStateData]);

  useEffect(() => {
    setFilteredStateData(filteredData(gameStateData));
    setSelectedState(filteredData(gameStateData)[0]);
  }, [selectedDifficultyLevel]);

  // Handler when difficulty changes
  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficultyLevel(difficulty);
    setCurrentIndex(0); // Reset index to 0 whenever difficulty changes
  };

  const filteredData = (myData) => {
    return myData.filter(
      (data) =>
        selectedDifficultyLevel === "ALL" ||
        data.difficultyLevel === selectedDifficultyLevel
    );
  };

  const handleStartGame = () => {
    console.log(selectedDifficultyLevel);
    console.log(selectedState);
    if (selectedState) {
      onStartGame(
        selectedState.state,
        selectedState.difficulty,
        selectedState.difficultyLevel
      );
    }
  };

  return (
    <div className="game-landing-page">
      <div className="content">
        <h2>Welcome to our informative sea-turtle role-play game!</h2>
        <p>Welcome to our informative sea-turtle role-play game!</p>
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
                          <strong>Pollution Severity: </strong>
                          {data.pollutionSeverity},{" "}
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
