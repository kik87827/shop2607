import { Button, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import "./App.css";
import shoebg from "./assets/shoebg.png";
import shoesData from "./data.js";
import { createContext, useState } from "react";
import ProductItem from "./components/ProductItem.jsx";
import { Link, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Detail from "./pages/Detail.jsx";
import axios from "axios";
import Cart from "./pages/Cart.jsx";

export let Context1 = createContext();

function App() {
  let [shoes, setShoes] = useState(shoesData);
  let [more, setMore] = useState(0);
  let [moreBtn, setMoreBtn] = useState(true);
  let [loading, setLoading] = useState(false);
  let [storage, setStorage] = useState([10,11,12]);
  let navigate = useNavigate();

  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate("/detail/0")}>Detail</Nav.Link>
            <Nav.Link onClick={() => navigate("/cart")}>Cart</Nav.Link>
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
                <button
                  onClick={() => {
                    setShoes(shoesData);
                  }}
                >
                  Origin
                </button>
              </div>

              <Container style={{ textAlign: "center" }}>
                <Row md={3}>
                  {shoes.map(({ id, title, content, price }, index) => {
                    return (
                      <ProductItem
                        key={id}
                        id={id}
                        title={title}
                        content={content}
                        navigate={navigate}
                      />
                    );
                  })}
                </Row>
              </Container>
              {loading ? (
                <div style={{ textAlign: "center" }}>loading...</div>
              ) : null}

              <div>
                {moreBtn ? (
                  <button
                    onClick={() => {
                      let dataURL02 =
                        "https://codingapple1.github.io/shop/data2.json";
                      let dataURL03 =
                        "https://codingapple1.github.io/shop/data3.json";

                      setLoading(true);
                      Promise.all([axios.get(dataURL02), axios.get(dataURL03)])
                        .then(([res2, res3]) => {
                          if (more === 0) {
                            console.log(res2.data);
                            setShoes([...shoes, ...res2.data]);
                          } else if (more === 1) {
                            console.log(res3.data);
                            setShoes([...shoes, ...res3.data]);
                            setMoreBtn(false);
                          }
                          setLoading(false);
                          setMore((prev) => prev + 1);
                        })
                        .catch(() => {
                          setLoading(false);
                          setMoreBtn(false);
                        });

                      // axios.post('/saraar',{name : 'kim'})
                    }}
                  >
                    버튼
                  </button>
                ) : null}
              </div>
            </>
          }
        />
        <Route
          path={`/detail/:id`}
          element={
            <Context1.Provider value={{ storage, shoes }}>
              <Detail shoes={shoes} />
            </Context1.Provider>
          }
        />
        <Route path="/about" element={<About />}>
          <Route path="member" element={<div>member</div>} />
          <Route path="location" element={<div>location</div>} />
        </Route>
        <Route path="/event" element={<Event />}>
          <Route path="one" element={<>첫 주문시 양배추즙 서비스</>} />
          <Route path="two" element={<>생일기념 쿠폰받기</>} />
        </Route>
        <Route path="/cart" element={<Cart />} />
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
