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

const PlasticInput = () => {
  // State variables to manage the flow
  const [currentStep, setCurrentStep] = useState(1);
  const [knowWeight, setKnowWeight] = useState(null); // null, true, or false
  const [manualWeight, setManualWeight] = useState("");
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
  const [finalWeight, setFinalWeight] = useState(""); // For confirming weight

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
    { name: "Plastic Container", icon: "🍱" },
    { name: "Plastic Cup", icon: "🥤" },
    { name: "Plastic Straw", icon: "🥤" },
    { name: "Plastic Utensil", icon: "🍴" },
  ];

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

  // Function to render the left panel steps based on user choices
  const renderSteps = () => {
    let steps = [{ number: 1, label: "Weight Choice" }];

    if (knowWeight === true) {
      steps.push({ number: 2, label: "Enter Weight per Item" });
      steps.push({ number: 3, label: "Confirm Weight" });
    } else if (knowWeight === false) {
      steps.push({ number: 2, label: "Count Choice" });
      if (knowCount === true) {
        steps.push({ number: 3, label: "Enter Item Counts" });
        steps.push({ number: 4, label: "Confirm Counts" });
      } else if (knowCount === false) {
        steps.push({ number: 3, label: "Upload Photo" });
        steps.push({ number: 4, label: "Confirm Weight" });
      }
    }

    return (
      <div className="registration-text">
        <h2 style={{ paddingBottom: "2rem" }}>
          Save marine reptiles by tracking the plastic waste now
        </h2>
        {steps.map((step) => (
          <div key={step.number}>
            <h2 className={step.number === currentStep ? "active-step" : ""}>
              STEP {step.number}
            </h2>
            <p>
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
            <h4>Do you know the plastic weight?</h4>
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
        if (knowWeight === true) {
          return (
            <div className="content-center">
              <h4>Enter the weight per plastic item</h4>
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
              {/* <Row className="justify-content-between mt-4">
                <Col xs="12">
                  <h4>Total Weight:</h4>
                  <p>{totalWeight.toFixed(2)} g</p>
                </Col>
              </Row> */}
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
                      setFinalWeight(totalWeight.toFixed(2));
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
              <h4>Confirm Weight per Item</h4>
              <p>
                <strong>
                  You will not be able to change it anymore once you confirm the
                  weight
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
                      setFinalWeight(totalWeight.toFixed(2));
                      alert("Weight Confirmed");
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
                {/* <Row className="justify-content-between mt-4">
                  <Col xs="12">
                    <h4>Estimated weight:</h4>
                    <p>{totalWeightGrams.toFixed(2)} g</p>
                  </Col>
                </Row> */}
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
                        setFinalWeight(totalWeightGrams.toFixed(2));
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
                    <Button
                      color="primary"
                      onClick={() => {
                        // For demonstration, we'll assume some estimated counts
                        setQuantities({
                          "Plastic Bag": 5,
                          "Plastic Bottle": 3,
                          "Plastic Container": 2,
                          "Plastic Cup": 4,
                          "Plastic Straw": 10,
                          "Plastic Utensil": 6,
                        });
                        setFinalWeight(totalWeightGrams.toFixed(2));
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
          }
        }
      case 4:
        if (knowCount === true) {
          // Confirm Counts per Item
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
                      setFinalWeight(totalWeightGrams.toFixed(2));
                      alert("Counts Confirmed");
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
          // Confirm Weight
          return (
            <div className="content-center">
              <h4>Confirm Weight</h4>
              <FormGroup>
                <Label for="confirmWeight">Weight (grams)</Label>
                <Input
                  type="number"
                  name="weight"
                  id="confirmWeight"
                  value={finalWeight}
                  onChange={(e) => setFinalWeight(e.target.value)}
                />
              </FormGroup>
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
                    onClick={() => alert("Weight Confirmed")}
                    block
                  >
                    Confirm
                  </Button>
                </Col>
              </Row>
            </div>
          );
        }
      default:
        return null;
    }
  };

  return (
    <div className="plastic-input-page" style={{ paddingTop: "100px" }}>
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
