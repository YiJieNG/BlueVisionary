import { useEffect } from "react";
// import BlueNavbar from "../../components/Navbar/BlueNavbar";
import HomeHeader_1 from "./HomeHeader_1";
import HomeContent_1 from "./HomeContent_1";
import HomeFooter_1 from "./HomeFooter_1";

function Home_1() {
  document.documentElement.classList.remove("nav-open");
  useEffect(() => {
    document.body.classList.add("index");
    return function cleanup() {
      document.body.classList.remove("index");
    };
  });
  return (
    <>
      <HomeHeader_1 />
      <HomeContent_1 />
      <HomeFooter_1 />
    </>
  );
}

export default Home_1;
