import { useState } from 'react'
import './App.css'
import { Button, Col, Container, Nav, Navbar, Row } from './components/ui'
import { cn } from './lib/utils'

function App() {

  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className={cn("h-[300px] bg-[url('/images/bg-1.png')] bg-cover bg-no-repeat bg-center")}></div>

      <Container className={cn("text-center")}>
        <Row>
          <Col className={cn("text-center")}>
            <img src={'/images/shoes1.jpg'} className={cn("w-[80%] m-auto")} alt="" />
            <h4>상품명</h4>
            <p>상품설명</p>
          </Col>
          <Col>
            <img src="https://codingapple1.github.io/shop/shoes2.jpg" className={cn("w-[80%] m-auto")} alt="" />
            <h4>상품명</h4>
            <p>상품설명</p>
          </Col>
          <Col>
            <img src="https://codingapple1.github.io/shop/shoes3.jpg" className={cn("w-[80%] m-auto")} alt="" />
            <h4>상품명</h4>
            <p>상품설명</p>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App
