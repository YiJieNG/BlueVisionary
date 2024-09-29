import { LineChart } from "@mui/x-charts";
import { Row } from "reactstrap";

function PlasticLineChart() {
  return (
    <>
      <div
        style={{
          //   padding: "13px",
          //   display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Row
        //   style={{
        //     height: "200px",
        //     width: "100%",
        //   }}
        >
          <LineChart
            xAxis={[{ data: [2020, 2021, 2022, 2023, 2024, 2025] }]}
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
