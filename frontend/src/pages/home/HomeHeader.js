import { Container } from "reactstrap";

function HomeHeader() {
  return (
    <>
      <div
        className="page-header section-dark"
        style={{
          backgroundImage:
            "url(" + require("../../assets/img/HomeBackground.jpg") + ")",
        }}
      >
        <div className="filter" />
        <div className="content-center">
          <Container>
            <div className="title-brand">
              <h1 className="presentation-title">BlueVisionary</h1>
            </div>
            <h2 className="presentation-subtitle text-center">
              Discover. Learn. Protect.
            </h2>
          </Container>
        </div>
        {/* <div
                    className="moving-clouds"
                    style={{
                        backgroundImage: "url(" + require("../../assets/img/clouds.png") + ")",
                    }}
                /> */}
      </div>
    </>
  );
}

export default HomeHeader;
