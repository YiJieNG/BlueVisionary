import React, { useState } from "react";
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

const stateImages = {
  VIC: VICImage,
  NSW: NSWImage,
  QLD: QLDImage,
  WA: WAImage,
  SA: SAImage,
  TAS: TASImage,
  NT: NTImage,
};

const dummyData = [
  {
    state: "VIC",
    name: "VICTORIA",
    difficulty: 4,
    pollutionSeverity: 200,
    marineLaws: 2,
    difficultyLevel: "HARD",
  },
  {
    state: "NSW",
    name: "NEW SOUTH WAVES",
    difficulty: 3,
    pollutionSeverity: 150,
    marineLaws: 3,
    difficultyLevel: "MEDIUM",
  },
  {
    state: "QLD",
    name: "QUEENSLAND",
    difficulty: 2,
    pollutionSeverity: 100,
    marineLaws: 4,
    difficultyLevel: "EASY",
  },
  {
    state: "WA",
    name: "WESTERN AUSTRALIA",
    difficulty: 4,
    pollutionSeverity: 180,
    marineLaws: 2,
    difficultyLevel: "HARD",
  },
  {
    state: "SA",
    name: "SOUTH AUSTRALIA",
    difficulty: 3,
    pollutionSeverity: 130,
    marineLaws: 3,
    difficultyLevel: "MEDIUM",
  },
  {
    state: "TAS",
    name: "TASMANIA",
    difficulty: 2,
    pollutionSeverity: 90,
    marineLaws: 5,
    difficultyLevel: "EASY",
  },
  {
    state: "NT",
    name: "NORTHERN TERRITORY",
    difficulty: 1,
    pollutionSeverity: 70,
    marineLaws: 5,
    difficultyLevel: "EASY",
  },
];

const LandingPage = ({ onStartGame }) => {
  const [selectedDifficulty, setSelectedDifficulty] = useState("ALL");
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current index of the carousel

  // Handler when difficulty changes
  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulty(difficulty);
    setCurrentIndex(0); // Reset index to 0 whenever difficulty changes
  };

  return (
    <div className="game-landing-page">
      <div className="content">
        <h2>Welcome to our informative sea-turtle role-play game!</h2>
        <p>Welcome to our informative sea-turtle role-play game!</p>
        <p className="subtitle">Difficulty level:</p>

        <div className="difficulty-buttons">
          {["ALL", "EASY", "MEDIUM", "HARD"].map((difficulty) => (
            <button
              key={difficulty}
              className={`option-button ${
                selectedDifficulty === difficulty ? "selected" : ""
              }`}
              onClick={() => handleDifficultyChange(difficulty)} // Update selectedDifficulty and reset carousel
            >
              {difficulty}
            </button>
          ))}
        </div>
        <div className="states-card">
          <p className="subtitle">State selection:</p>

          {/* Carousel Component */}
          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop={true}
            emulateTouch={true}
            selectedItem={currentIndex} // Control the current index based on the state
            onChange={(index) => setCurrentIndex(index)} // Update currentIndex when user navigates manually
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
            {dummyData
              .filter(
                (data) =>
                  selectedDifficulty === "ALL" ||
                  data.difficultyLevel === selectedDifficulty
              )
              .map((data, index) => (
                <div key={index} className="state-card">
                  <h4>{data.name}</h4>
                  <div className="card-content ">
                    <div className="state-shape">
                      <img
                        style={{ height: "120px", width: "50%" }}
                        src={stateImages[data.state]} // Dynamically set the source based on the state
                        alt={data.state} // Alt text as the state name
                      />{" "}
                      {/* <span>{data.state}</span> */}
                    </div>
                    <p
                      className="difficulty-rating"
                      style={{ fontWeight: "bold" }}
                    >
                      Difficulty Rating:
                    </p>
                    {Array.from({ length: data.difficulty }).map((_, idx) => (
                      <img
                        key={idx}
                        src={plasticImage}
                        alt="plastic bottle"
                        style={{ width: "30px", margin: "10px 5px" }}
                      />
                    ))}
                    <p className="description-insight">
                      <strong>Pollution Severity: </strong>
                      {data.pollutionSeverity}, <strong>Marine Laws: </strong>{" "}
                      {data.marineLaws}
                    </p>

                    {/* {data.marineLaws === 2
                        ? "Low"
                        : data.marineLaws === 3
                        ? "Medium"
                        : "High"}{" "} */}

                    <button
                      className="start-game-button"
                      onClick={() => onStartGame(selectedDifficulty)}
                    >
                      START GAME
                    </button>
                  </div>
                </div>
              ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
