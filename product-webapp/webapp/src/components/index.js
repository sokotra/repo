// import FindCars from "./FindCars";
import FindCars from "./FindCars";
import HomeFooter from "./HomeFooter";
import HomeInfo from "./HomeInfo";
import Footer from './Footer';


export default function Index() {
  return (
    <>
      <FindCars page="Home" />
      <HomeInfo />
      <HomeFooter />
      <Footer />
    </>
  );
}
