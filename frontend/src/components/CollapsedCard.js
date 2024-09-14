import { useState, useEffect } from "react";
import { Button, Collapse, Card, CardBody, CardHeader } from "reactstrap";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import axios from "axios";

function CollapsedCard({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  // const [iconImage, setIconImage] = useState([]);
  const [logo, setLogo] = useState(null);

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    const fetchIconImage = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/api/marinelife/marine_life_logo_images"
        );
        // setIconImage(response.data);

        // Find the logo matching the scientific name
        const scientificName = data.content.find(
          (item) => item.title === "Scientific Name"
        ).content;

        const matchedLogo = response.data.find(
          (item) => item.name === scientificName
        );

        if (matchedLogo) {
          setLogo(matchedLogo.icon);
        }
      } catch (error) {
        console.error("Error fetching logos:", error);
      }
    };

    fetchIconImage();
  }, [data]);

  const cardBody = data["content"].map((content, index) => (
    <div key={index}>
      <h4>{content.title}</h4>
      <p>{content.content}</p>
    </div>
  ));

  return (
    <>
      <Card
        style={{
          padding: "0px",
          marginBottom: 10,
          marginLeft: 10,
          width: "98.5%",
        }}
      >
        <CardHeader
          onClick={toggle}
          style={{
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#2776c5",
          }}
        >
          <h5 style={{ color: "white" }}>
            {logo && (
              <img
                src={logo}
                alt="logo"
                style={{
                  width: "30px",
                  height: "30px",
                  filter: "drop-shadow(0 0 3px white)",
                  marginRight: "2px",
                }}
              />
            )}{" "}
            <b>{data.title}</b>
          </h5>

          <Button
            color="#ffffff"
            onClick={toggle}
            style={{ textDecoration: "none" }}
          >
            {isOpen ? (
              <FaChevronUp color="white" />
            ) : (
              <FaChevronDown color="white" />
            )}
          </Button>
        </CardHeader>
        <Collapse isOpen={isOpen}>
          <CardBody>{cardBody}</CardBody>
        </Collapse>
      </Card>
    </>
  );
}

export default CollapsedCard;
