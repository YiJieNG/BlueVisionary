import { LineChart } from "@mui/x-charts";
import { Row } from "reactstrap";

function PlasticLineChart() {
  return (
    <>
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Row>
          <LineChart
            xAxis={[
              {
                type: "category", // Ensure it's treated as a categorical axis
                data: ["2021", "2022", "2023", "2024", "2025", "2026"], // Your specific years
                // valueFormatter: (value) => `${value}`,
              },
            ]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
                area: true,
              },
            ]}
            width={500}
            height={350}
          />
        </Row>
      </div>
    </>
  );
}

export default PlasticLineChart;
