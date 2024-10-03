// ContributionGaugeChart.js
import React, { useState } from "react";
import GaugeChart from "react-gauge-chart";
import { FaInfoCircle } from "react-icons/fa";
import { Card, CardBody, Row, Tooltip } from "reactstrap";

const ContributionGaugeChart = React.memo(
  ({ userContributionPercentage, past30DaysWeight, populationAverage }) => {
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggleTooltip = () => {
      setTooltipOpen((prevState) => !prevState);
    };

    const resetTooltip = () => {
      setTooltipOpen(false);
    };
    return (
      <Card style={{ height: "100%", flex: 1 }}>
        <CardBody>
          {/* Gauge Chart Header */}
          <Row style={{ paddingTop: "2rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <h4
                style={{
                  margin: 0,
                  fontSize: "1.3rem",
                  fontWeight: "bold",
                }}
              >
                Your Monthly Contribution
              </h4>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <h4
                style={{
                  margin: 0,
                  fontSize: "1rem",
                }}
              >
                vs
              </h4>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <h4
                style={{
                  margin: 0,
                  fontSize: "1.3rem",
                  fontWeight: "bold",
                }}
              >
                Average Individuals
              </h4>
            </div>
          </Row>
          {/* Gauge Chart */}
          <Row>
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "auto",
                paddingTop: "35px",
              }}
            >
              <GaugeChart
                id="contribution-gauge"
                nrOfLevels={30}
                arcsLength={[0.5, 0.5]}
                animate={false}
                colors={["#FF5F6D", "#24CBE5"]}
                percent={userContributionPercentage}
                arcPadding={0.02}
                cornerRadius={3}
                needleColor="#cbd2ff"
                needleScale={0.95}
                needleBaseColor="#2754c5"
                textColor="#000"
                style={{ width: "100%", fontSize: "12px" }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: "15px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div
                    style={{
                      width: "15px",
                      height: "15px",
                      backgroundColor: "#FF5F6D",
                      marginRight: "5px",
                    }}
                  ></div>
                  <p style={{ margin: 0 }}>Below Average</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingRight: "15px",
                  }}
                >
                  <div
                    style={{
                      width: "15px",
                      height: "15px",
                      backgroundColor: "#24CBE5",
                      marginRight: "5px",
                    }}
                  ></div>
                  <p style={{ margin: 0 }}>Above Average</p>
                </div>
              </div>
            </div>
          </Row>
          {/* Contribution Details */}
          <Row style={{ padding: "30px 20px 0px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <h6 style={{ fontSize: "1.1rem" }}>
                <strong>Your Contribution: </strong>
                {past30DaysWeight.toFixed(2)} grams
              </h6>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <h6 style={{ fontSize: "1.1rem" }}>
                <strong>
                  Average Individuals
                  <span
                    style={{ cursor: "pointer", padding: "0 3px" }}
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
                      <h3>How do we calculate the average recycling effort?</h3>
                      <p>
                        We use historical data from 2006 to 2019 to determine
                        the total weight of plastic recycling efforts in
                        Australia. By factoring in the country's population
                        during that period, we calculate the per-person
                        contribution. Finally, we divide the total by 12 to
                        estimate the average monthly recycling effort per
                        individual.
                      </p>
                    </div>
                  </Tooltip>
                  :{" "}
                </strong>
                {populationAverage} grams
              </h6>
            </div>
          </Row>
          {/* Motivational Message */}
          <Row>
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "auto",
                padding: "30px 20px 0px",
              }}
            >
              {populationAverage > past30DaysWeight ? (
                <p>
                  You are just{" "}
                  <strong style={{ color: "#003366" }}>
                    {Math.max(
                      0,
                      (populationAverage - past30DaysWeight).toFixed(2)
                    )}{" "}
                    grams away
                  </strong>{" "}
                  from matching the average recycling effort of individuals in
                  Australia over the past 30 days! Keep up the amazing work,
                  every gram makes a difference in protecting our oceans. Stay
                  committed, and you will hit the average in no time!
                </p>
              ) : populationAverage < past30DaysWeight ? (
                <p>
                  Amazing work! You are{" "}
                  <strong style={{ color: "#003366" }}>
                    {Math.max(
                      0,
                      (past30DaysWeight - populationAverage).toFixed(2)
                    )}{" "}
                    grams above
                  </strong>{" "}
                  the average recycling effort of individuals in Australia over
                  the past 30 days! Your dedication is making a real impact,
                  keep going strong! Let’s continue setting the bar higher and
                  inspire others to follow your lead!
                </p>
              ) : (
                <p>
                  Great job! You have{" "}
                  <strong style={{ color: "#003366" }}>matched</strong> the
                  average recycling effort of individuals in Australia over the
                  past 30 days! Your commitment is making a real difference!
                  Keep it up and let’s see how far you can go beyond the
                  average.
                </p>
              )}
            </div>
          </Row>
        </CardBody>
      </Card>
    );
  },
  // Custom comparison function to prevent re-renders unless props change
  (prevProps, nextProps) => {
    return (
      prevProps.userContributionPercentage ===
        nextProps.userContributionPercentage &&
      prevProps.past30DaysWeight === nextProps.past30DaysWeight &&
      prevProps.populationAverage === nextProps.populationAverage
    );
  }
);

export default ContributionGaugeChart;
