import Image from "../assests/images/vendor2.png";
import "../styles/home.css";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function HomeFooter ()  {
  const navigate=useNavigate()
  return(

  <section className="vendorinfo">
    <Container className="container">
      <Row>
        <Col lg="6" md="6" sm="12">
          <h2 className="title">
            Rent Your Car Out &<br />
            Make More Money
          </h2>
          <button  onClick={()=>navigate("/signup")} className="registernow">Register Now</button>
        </Col>
        <Col lg="6" md="6" sm="12">
          <img src={Image} alt="" className="w-100" />
        </Col>
      </Row>
    </Container>
  </section>
  )
};
export default HomeFooter;
