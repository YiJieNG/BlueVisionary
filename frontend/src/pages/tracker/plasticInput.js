import React, { useState } from "react";
import { Container, Row, Col, Button, Card, CardBody } from "reactstrap";

const PlasticInput = () => {
  // Define the initial state with all quantities set to 0
  const [quantities, setQuantities] = useState({
    "Plastic Bag": 0,
    "Plastic Bottle": 0,
    "Plastic Container": 0,
    "Plastic Cup": 0,
    "Plastic Straw": 0,
    "Plastic Utensil": 0,
  });

  // Average weights in grams for each item
  const itemWeights = {
    "Plastic Bag": 5,
    "Plastic Bottle": 15,
    "Plastic Container": 15,
    "Plastic Cup": 3,
    "Plastic Straw": 0.4,
    "Plastic Utensil": 3,
  };

  // Increment or decrement the quantity
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

  // Calculate the total weight in kilograms
  const totalWeightGrams = Object.keys(quantities).reduce(
    (total, item) => total + quantities[item] * itemWeights[item],
    0
  );
  const totalWeightKg = (totalWeightGrams / 1000).toFixed(3); // Convert to kg and round to 3 decimal places

  // Updated items array with new names and icons
  const items = [
    { name: "Plastic Bag", icon: "🛍️" },
    { name: "Plastic Bottle", icon: "🧴" },
    { name: "Plastic Container", icon: "🍱" },
    { name: "Plastic Cup", icon: "🥤" },
    { name: "Plastic Straw", icon: "🥤" },
    { name: "Plastic Utensil", icon: "🍴" },
  ];

  return (
    <div className="general-padding-top plastic-input-page">
      <Container fluid>
        <Row className="justify-content-center">
          <Col md="10">
            <Card style={{ border: "none", boxShadow: "none" }}>
              <CardBody>
                <Row style={{ margin: "0px" }}>
                  <Col md="4" className="left-panel">
                    <div className="registration-text">
                      <h2>STEP</h2>
                      <p>Step Description</p>
                    </div>
                  </Col>

                  <Col md="8" className="right-panel">
                    <h4>Enter your contribution</h4>
                    <Row>
                      {items.map((item, index) => (
                        <Col
                          xs="6"
                          md="4"
                          key={index}
                          className="text-center mb-4"
                        >
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
                      <div>
                        <h4>Estimated weight:</h4>
                        <p>{totalWeightKg} kg</p>
                      </div>
                    </Row>

                    <Row className="justify-content-between mt-4">
                      <Col xs="6">
                        <Button color="secondary" block>
                          Cancel
                        </Button>
                      </Col>
                      <Col xs="6">
                        <Button color="primary" block>
                          Confirm
                        </Button>
                      </Col>
                    </Row>
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
