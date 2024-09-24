import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlasticInput = () => {
  // State variables to manage the flow
  const [currentStep, setCurrentStep] = useState(1);
  const [knowWeight, setKnowWeight] = useState(null); // null, true, or false
  const [knowCount, setKnowCount] = useState(null); // null, true, or false
  const [quantities, setQuantities] = useState({
    "Plastic Bag": 0,
    "Plastic Bottle": 0,
    "Plastic Container": 0,
    "Plastic Cup": 0,
    "Plastic Straw": 0,
    "Plastic Utensil": 0,
  });
  const [weightsPerItem, setWeightsPerItem] = useState({
    "Plastic Bag": 0,
    "Plastic Bottle": 0,
    "Plastic Container": 0,
    "Plastic Cup": 0,
    "Plastic Straw": 0,
    "Plastic Utensil": 0,
  });
  const [result, setResult] = useState(null); // For storing calculation results
  const [submissionData, setSubmissionData] = useState(null); // For storing submission data

  // Average weights in grams for each item
  const itemWeights = {
    "Plastic Bag": 5,
    "Plastic Bottle": 15,
    "Plastic Container": 15,
    "Plastic Cup": 3,
    "Plastic Straw": 0.4,
    "Plastic Utensil": 3,
  };

  // Calculate the total weight in grams based on item counts
  const totalWeightGrams = Object.keys(quantities).reduce(
    (total, item) => total + quantities[item] * itemWeights[item],
    0
  );

  // Calculate total weight from weightsPerItem
  const totalWeight = Object.values(weightsPerItem).reduce(
    (sum, weight) => sum + parseFloat(weight || 0),
    0
  );

  // Updated items array with new names and icons
  const items = [
    { name: "Plastic Bag", icon: "🛍️" },
    { name: "Plastic Bottle", icon: "🧴" },
    { name: "Plastic Container", icon: "🥡" },
    { name: "Plastic Cup", icon: "🥤" },
    { name: "Plastic Straw", icon: "📏" },
    { name: "Plastic Utensil", icon: "🍴" },
  ];

  const handlePhotoUpload = async () => {
    const fileInput = document.getElementById("uploadPhoto").files[0];

    // Ensure the file is selected
    if (!fileInput) {
      alert("Please select a file before proceeding.");
      return;
    }

    // Prepare the FormData for file upload
    const formData = new FormData();
    formData.append("image", fileInput);

    try {
      // Make the API call to the Flask backend
      const response = await axios.post(
        "http://127.0.0.1:5000/api/plasticInput/plasticDetection",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Assuming the response contains a "counter" object with the quantities of detected items
      const detectedQuantities = {
        "Plastic Bag": response.data.counter[0],
        "Plastic Bottle": response.data.counter[1],
        "Plastic Container": response.data.counter[2],
        "Plastic Cup": response.data.counter[3],
        "Plastic Straw": response.data.counter[4],
        "Plastic Utensil": response.data.counter[5],
      };

      // Update the quantities state with the actual detected values
      setQuantities(detectedQuantities);
      setCurrentStep(4); // Proceed to the next step
    } catch (error) {
      console.error("Error during image upload:", error);
      alert("There was an error processing your image. Please try again.");
    }
  };

  // Functions to handle increment and decrement of quantities
  const increment = (item) => {
    setQuantities((prevState) => ({
      ...prevState,
      [item]: prevState[item] + 1,
    }));
  };

  const decrement = (item) => {
    setQuantities((prevState) => ({
      ...prevState,
      [item]: prevState[item] > 0 ? prevState[item] - 1 : 0,
    }));
  };

  // Function to reset counts and weights
  const resetCountsAndWeights = () => {
    setQuantities({
      "Plastic Bag": 0,
      "Plastic Bottle": 0,
      "Plastic Container": 0,
      "Plastic Cup": 0,
      "Plastic Straw": 0,
      "Plastic Utensil": 0,
    });
    setWeightsPerItem({
      "Plastic Bag": 0,
      "Plastic Bottle": 0,
      "Plastic Container": 0,
      "Plastic Cup": 0,
      "Plastic Straw": 0,
      "Plastic Utensil": 0,
    });
  };

  // Function to render the left panel steps based on user choices
  const renderSteps = () => {
    let steps = [{ number: 1, label: "Weight Choice" }];

    if (knowWeight === true) {
      steps.push({ number: 2, label: "Enter Weight per Item" });
      steps.push({ number: 3, label: "Confirm Weight" });
      steps.push({ number: 4, label: "Results" });
    } else if (knowWeight === false) {
      steps.push({ number: 2, label: "Count Choice" });
      steps.push({ number: 3, label: "Enter Item Counts / Upload Photo" });
      steps.push({ number: 4, label: "Confirm Counts" });
      steps.push({ number: 5, label: "Results" });
      if (knowCount === true) {
        steps[2].label = "Enter Item Counts";
      } else if (knowCount === false) {
        steps[2].label = "Upload Photo";
      }
    }

    return (
      <div className="registration-text">
        <h2>Help save sea turtles</h2>
        <p style={{ paddingBottom: "2rem" }}>
          Start recording your recycled plastic waste now to see your impact on
          saving the sea turtle!
        </p>
        {steps.map((step) => (
          <div key={step.number}>
            <p className={step.number === currentStep ? "active-step" : ""}>
              <subtitle> STEP {step.number}</subtitle>:{" "}
              <strong>{step.label}</strong>
            </p>
          </div>
        ))}
      </div>
    );
  };

  // Function to render the content of the current step
  const renderContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="content-center">
            <h4>Do you know your plastic weight?</h4>
            <Row className="justify-content-between mt-4">
              <Col xs="12" md="6">
                <Button
                  className="yes-btn"
                  onClick={() => {
                    setKnowWeight(true);
                    setCurrentStep(2);
                  }}
                  block
                >
                  Yes
                </Button>{" "}
              </Col>

              <Col xs="12" md="6">
                <Button
                  className="no-btn"
                  onClick={() => {
                    setKnowWeight(false);
                    setCurrentStep(2);
                  }}
                  block
                >
                  No
                </Button>
              </Col>
            </Row>
          </div>
        );
      case 2:
        // Enter weight manually
        if (knowWeight === true) {
          return (
            <div className="content-center">
              <h4>Please enter the weight per plastic item</h4>
              <Row>
                {items.map((item, index) => (
                  <Col xs="6" md="4" key={index} className="text-center mb-4">
                    <div className="item-box">
                      <div className="icon">{item.icon}</div>
                      <div className="item-name">{item.name}</div>
                      <FormGroup>
                        <Label for={`weight-${index}`}>Weight (g)</Label>
                        <Input
                          type="number"
                          min="0"
                          name={`weight-${index}`}
                          id={`weight-${index}`}
                          value={weightsPerItem[item.name]}
                          onChange={(e) => {
                            const newWeight = e.target.value;
                            setWeightsPerItem((prevWeights) => ({
                              ...prevWeights,
                              [item.name]: newWeight,
                            }));
                          }}
                        />
                      </FormGroup>
                    </div>
                  </Col>
                ))}
              </Row>
              <Row className="justify-content-between mt-4">
                <Col xs="12">
                  <Button color="warning" onClick={resetCountsAndWeights} block>
                    Reset
                  </Button>
                </Col>
              </Row>
              {/* Navigation Buttons */}
              <Row className="justify-content-between mt-4">
                <Col xs="12" md="6">
                  <Button
                    color="secondary"
                    onClick={() => setCurrentStep(1)}
                    block
                  >
                    Back
                  </Button>{" "}
                </Col>
                <Col xs="12" md="6">
                  <Button
                    color="primary"
                    onClick={() => {
                      setCurrentStep(3);
                    }}
                    block
                  >
                    Next
                  </Button>
                </Col>
              </Row>
            </div>
          );
        } else {
          return (
            <div className="content-center">
              <h4>Do you know the count of the items?</h4>
              <Row className="justify-content-between mt-4">
                <Col xs="12" md="6">
                  <Button
                    className="yes-btn"
                    onClick={() => {
                      setKnowCount(true);
                      setCurrentStep(3);
                    }}
                    block
                  >
                    Yes
                  </Button>
                </Col>
                <Col xs="12" md="6">
                  <Button
                    className="no-btn"
                    onClick={() => {
                      setKnowCount(false);
                      setCurrentStep(3);
                    }}
                    block
                  >
                    No
                  </Button>
                </Col>
              </Row>
              <Row className="mt-4">
                <Col xs="12">
                  <Button
                    color="secondary"
                    onClick={() => setCurrentStep(1)}
                    block
                  >
                    Back
                  </Button>
                </Col>
              </Row>
            </div>
          );
        }
      case 3:
        if (knowWeight === true) {
          // Confirm Weight per Item
          return (
            <div className="content-center">
              <h4>Please confirm the Weight per Item</h4>
              <p style={{ paddingBottom: "0.8rem" }}>
                <strong>
                  as you will not be able to change it anymore once you confirm
                  the weight here :)
                </strong>
              </p>
              <FormGroup>
                {items.map((item, index) => (
                  <Row key={index} className="align-items-center mb-3">
                    <Col xs="6" md="6">
                      <div className="item-name">
                        {item.icon} {item.name} (in gram)
                      </div>
                    </Col>
                    <Col xs="6" md="6">
                      <Input
                        type="number"
                        min="0"
                        name={`confirm-weight-${index}`}
                        id={`confirm-weight-${index}`}
                        placeholder="Weight (g)"
                        value={weightsPerItem[item.name]}
                        onChange={(e) => {
                          const newWeight = e.target.value;
                          setWeightsPerItem((prevWeights) => ({
                            ...prevWeights,
                            [item.name]: newWeight,
                          }));
                        }}
                      />
                    </Col>
                  </Row>
                ))}
              </FormGroup>
              <Row className="justify-content-between mt-4">
                <Col xs="12">
                  <h4>Total Weight:</h4>
                  <p>{totalWeight.toFixed(2)} g</p>
                </Col>
              </Row>
              <Row className="justify-content-between mt-4">
                <Col xs="12" md="6">
                  <Button
                    color="secondary"
                    onClick={() => setCurrentStep(2)}
                    block
                  >
                    Back
                  </Button>{" "}
                </Col>
                <Col xs="12" md="6">
                  <Button
                    className="yes-btn"
                    onClick={() => {
                      if (totalWeight <= 0) {
                        alert("Please enter a weight greater than 0.");
                      } else {
                        // Collect date
                        const date = new Date();

                        // Collect plastic items, their weights, and approximate counts
                        const plasticItems = {};
                        items.forEach((item) => {
                          const itemName = item.name;
                          const weight =
                            parseFloat(weightsPerItem[itemName]) || 0;
                          if (weight > 0) {
                            const avgItemWeight = itemWeights[itemName];
                            const approxCount = weight / avgItemWeight;
                            plasticItems[itemName] = {
                              weight: weight,
                              approximateCount: approxCount,
                            };
                          }
                        });

                        // Calculate estimated items by summing approximate counts
                        const estimatedItems = Object.values(
                          plasticItems
                        ).reduce((sum, item) => sum + item.approximateCount, 0);

                        // Calculate sea turtles saved
                        const seaTurtlesSaved = (estimatedItems / 14) * 0.5;

                        // Set submission data
                        setSubmissionData({
                          date: date,
                          plasticItems: plasticItems,
                          totalWeight: totalWeight,
                        });

                        // Set result and proceed
                        setResult({
                          estimatedItems: estimatedItems,
                          seaTurtlesSaved: seaTurtlesSaved,
                        });
                        setCurrentStep(4); // Changed from 5 to 4
                      }
                    }}
                    block
                  >
                    Confirm
                  </Button>
                </Col>
              </Row>
            </div>
          );
        } else {
          if (knowCount === true) {
            // Enter Item Counts
            return (
              <div>
                <h4>Enter your contribution</h4>
                <Row>
                  {items.map((item, index) => (
                    <Col xs="6" md="4" key={index} className="text-center mb-4">
                      <div className="item-box">
                        {quantities[item.name] > 0 && (
                          <div className="quantity-badge">
                            {quantities[item.name]}
                          </div>
                        )}
                        <div className="icon">{item.icon}</div>
                        <div className="item-name">{item.name}</div>
                        <div className="buttons">
                          <Button
                            className="quantity-btn"
                            onClick={() => decrement(item.name)}
                          >
                            -
                          </Button>
                          <Button
                            className="quantity-btn"
                            onClick={() => increment(item.name)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
                <Row className="justify-content-between mt-4">
                  <Col xs="12">
                    <Button
                      color="warning"
                      onClick={resetCountsAndWeights}
                      block
                    >
                      Reset
                    </Button>
                  </Col>
                </Row>
                {/* Navigation Buttons */}
                <Row className="justify-content-between mt-4">
                  <Col xs="12" md="6">
                    <Button
                      color="secondary"
                      onClick={() => setCurrentStep(2)}
                      block
                    >
                      Back
                    </Button>
                  </Col>
                  <Col xs="12" md="6">
                    <Button
                      color="primary"
                      onClick={() => {
                        setCurrentStep(4);
                      }}
                      block
                    >
                      Next
                    </Button>
                  </Col>
                </Row>
              </div>
            );
          } else {
            // Upload Photo
            return (
              <div className="content-center">
                <h4>Upload Photo</h4>
                <FormGroup>
                  <Input type="file" name="file" id="uploadPhoto" />
                </FormGroup>
                {/* Implement photo processing logic here */}
                <Row className="justify-content-between mt-4">
                  <Col xs="12" md="6">
                    <Button
                      color="secondary"
                      onClick={() => setCurrentStep(2)}
                      block
                    >
                      Back
                    </Button>
                  </Col>
                  <Col xs="12" md="6">
                    <Button color="primary" onClick={handlePhotoUpload} block>
                      Next
                    </Button>
                  </Col>
                </Row>
              </div>
            );
          }
        }
      case 4:
        if (knowWeight === true) {
          // Display Results and log data
          console.log("Submission Data:", submissionData);
          return (
            <div className="content-center">
              <h4>Thank you for your contribution!</h4>
              <p>
                You have recycled approximately{" "}
                <strong>{result.estimatedItems.toFixed(0)}</strong> plastic
                items.
              </p>
              <p>
                This action potentially saved{" "}
                <strong>{result.seaTurtlesSaved.toFixed(2)}</strong> sea
                turtles.
              </p>
              <Button
                color="primary"
                onClick={() => {
                  // Reset everything to start over
                  setCurrentStep(1);
                  setKnowWeight(null);
                  setKnowCount(null);
                  resetCountsAndWeights();
                  setResult(null);
                  setSubmissionData(null);
                }}
                block
              >
                Record Another Contribution
              </Button>
            </div>
          );
        } else {
          return (
            <div className="content-center">
              <h4>Confirm Counts</h4>
              <p>
                <strong>
                  You will not be able to change it anymore once you confirm the
                  counts
                </strong>
              </p>
              <FormGroup>
                {items.map((item, index) => (
                  <Row key={index} className="align-items-center mb-3">
                    <Col xs="3" md="3">
                      <Input
                        type="number"
                        min="0"
                        name={`confirm-count-${index}`}
                        id={`confirm-count-${index}`}
                        value={quantities[item.name]}
                        onChange={(e) => {
                          const newCount = parseInt(e.target.value) || 0;
                          setQuantities((prevQuantities) => ({
                            ...prevQuantities,
                            [item.name]: newCount,
                          }));
                        }}
                      />
                    </Col>
                    <Col xs="9" md="9">
                      <div className="item-name">
                        x {item.name} {item.icon} ={" "}
                        {(
                          quantities[item.name] * itemWeights[item.name]
                        ).toFixed(2)}
                        g
                      </div>
                    </Col>
                  </Row>
                ))}
              </FormGroup>

              <Row className="justify-content-between mt-4">
                <Col xs="12">
                  <h4>Estimated Weight: {totalWeightGrams.toFixed(2)} g</h4>
                </Col>
              </Row>
              <Row className="justify-content-between mt-4">
                <Col xs="12" md="6">
                  <Button
                    color="secondary"
                    onClick={() => setCurrentStep(3)}
                    block
                  >
                    Back
                  </Button>{" "}
                </Col>
                <Col xs="12" md="6">
                  <Button
                    className="yes-btn"
                    onClick={() => {
                      const totalItems = Object.values(quantities).reduce(
                        (sum, qty) => sum + qty,
                        0
                      );
                      if (totalItems <= 0) {
                        alert("Please enter at least one item.");
                      } else {
                        // Calculate sea turtles saved
                        const seaTurtlesSaved = (totalItems / 14) * 0.5;

                        // Collect date
                        const date = new Date();

                        // Collect plastic items and their counts and weights
                        const plasticItems = {};
                        items.forEach((item) => {
                          const itemName = item.name;
                          const count = quantities[itemName];
                          if (count > 0) {
                            const weight = count * itemWeights[itemName];
                            plasticItems[itemName] = {
                              count: count,
                              weight: weight,
                            };
                          }
                        });

                        // Set submission data
                        setSubmissionData({
                          date: date,
                          plasticItems: plasticItems,
                          totalWeight: totalWeightGrams,
                        });

                        // Set result and proceed
                        setResult({
                          estimatedItems: totalItems,
                          seaTurtlesSaved: seaTurtlesSaved,
                        });
                        setCurrentStep(5);
                      }
                    }}
                    block
                  >
                    Confirm
                  </Button>
                </Col>
              </Row>
            </div>
          );
        }
      case 5:
        // Display Results and log data
        console.log("Submission Data:", submissionData);
        return (
          <div className="content-center">
            <h4>Thank you for your contribution!</h4>
            <p>
              You have recycled{" "}
              <strong>{result.estimatedItems.toFixed(0)}</strong> plastic items.
            </p>
            <p>
              This action potentially saved{" "}
              <strong>{result.seaTurtlesSaved.toFixed(2)}</strong> sea turtles.
            </p>
            <Button
              color="primary"
              onClick={() => {
                // Reset everything to start over
                setCurrentStep(1);
                setKnowWeight(null);
                setKnowCount(null);
                resetCountsAndWeights();
                setResult(null);
                setSubmissionData(null);
              }}
              block
            >
              Record Another Contribution
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="plastic-input-page" style={{ paddingTop: "10rem" }}>
      <Container fluid>
        <Row className="justify-content-center">
          <Col md="10">
            <Card style={{ border: "none", boxShadow: "none" }}>
              <CardBody>
                <Row style={{ margin: "0px" }}>
                  <Col md="4" className="left-panel">
                    {renderSteps()}
                  </Col>
                  <Col md="8" className="right-panel">
                    {renderContent()}
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PlasticInput;
