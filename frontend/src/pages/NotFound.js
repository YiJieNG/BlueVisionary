import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      style={{ textAlign: "center", padding: "10%" }}
      className="marine-life-content"
    >
      <h2>404 - Page Not Found</h2>
      <p>
        <strong>The page you are looking for does not exist :(((</strong>
      </p>
      <img
        src="/errorPage.jpg"
        alt="Error Image"
        style={{ width: "25%", height: "25%" }}
      />
      <div>
        <button
          className="normal-button"
          onClick={() => navigate("/")}
          style={{ margin: "1.5%" }}
        >
          Home Page
        </button>
      </div>
    </div>
  );
}

export default NotFound;
