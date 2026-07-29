import { Button, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import "./App.css";
import shoebg from "./assets/shoebg.png";
import shoesData from "./data.js";
import { useState } from "react";
import ProductItem from "./components/ProductItem.jsx";
import { Link, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Detail from "./pages/Detail.jsx";

function App() {
  let [shoes, setShoes] = useState(shoesData);
  let navigate = useNavigate();

  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate("/detail")}>Detail</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* <Link to="/">홈</Link>
      <Link to="detail">상세페이지</Link> */}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div
                className="main-bg"
                style={{ backgroundImage: `url(${shoebg})` }}
              ></div>

              <div>
                <button
                  onClick={() => {
                    let copyShoes = [...shoes];
                    let sortShoes = copyShoes.sort((a, b) =>
                      a.title.localeCompare(b.title)
                    );
                    setShoes(sortShoes);
                  }}
                >
                  SORT
                </button>
                <button onClick={() => {
                  setShoes(shoesData);
                }}>Origin</button>
              </div>

              <Container style={{ textAlign: "center" }}>
                <Row>
                  {shoes.map(({ id, title, content, price }, index) => {
                    return (
                      <ProductItem
                        key={id}
                        id={id}
                        title={title}
                        content={content}
                        navigate = {navigate}
                      />
                    );
                  })}
                </Row>
              </Container>
            </>
          }
        />
        <Route path={`/detail/:id`} element={<Detail shoes={shoes} />} />
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>member</div>} />
          <Route path="location" element={<div>location</div>} />
        </Route>
        <Route path="/event" element={<Event />}>
          <Route path="one" element={<>첫 주문시 양배추즙 서비스</>} />
          <Route path="two" element={<>생일기념 쿠폰받기</>} />
        </Route>
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </div>
  );
}

function About() {
  return (
    <>
      <h4>About</h4>
      <Outlet />
    </>
  );
}

function Event() {
  return (
    <>
      <h4>오늘의 이벤트</h4>
      <Outlet />
    </>
  );
}

export default App;
