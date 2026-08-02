import React, { useContext, useEffect, useRef, useState } from "react";
import { Nav } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import styled from "styled-components"

import { Context1 } from "../App";
import { pushProduct } from "../store/userCart";
import { useDispatch } from "react-redux";


let YellowBtn = styled.button`
  background : ${ props => props.bg };
  color : ${ props => props.bg === 'blue' ? 'white' : 'black'};
  padding : 10px;
`
let NewBtn = styled(YellowBtn)`
  border-radius : 10px;
  border:0;
`

let Box = styled.div`
  background : grey;
  padding : 20px;
`

class Detail2 extends React.Component {
  componentDidMount(){

  }
  componentDidUpdate(){

  }
  componentWillUnmount(){

  }
}


const Detail = ({ shoes }) => {
  let params = useParams();
  let paraId = parseFloat(params.id);

  let [count,setCount] = useState(0);
  let [boxAlert,setBoxAlert] = useState(true);
  let [input,setInput] = useState("");
  let [warn,setWarn] = useState(false);
  let alertBox = useRef(null);

  let [detail, setDetail] = useState("");
  let loadTimer = 0;

  let { storage } = useContext(Context1);

  let dispatch = useDispatch();
  let navigate = useNavigate();

  // console.log(storage, shoes);

  useEffect(() => {
    setDetail("tran-end");
    return () => {
      setDetail("")
    }
  },[])

  useEffect(()=>{
    console.log('안녕')
    /* for (var i =0; i < 10000; i++){
      console.log(1)
    } */
   let timerId = setTimeout(()=>{
     if(!alertBox.current){return}
     alertBox.current.style.display = "none"
     setBoxAlert(false)
   },2000)

    // clean up function
    return () => {
      timerId = 0;
      clearTimeout(timerId);
    }
  },[])

  useEffect(() =>{
    if (!isNaN(input)) {
     // console.log("숫자");
        setWarn(false);
    } else {
      //console.log("숫자가 아님");
        setWarn(true);
    }
  },[input])
  
  if (!shoes[paraId]) {
    return <div>상품이 없습니다.</div>;
  }
  
  let filterItem = shoes.find((item) => item.id === paraId);
  let { title, price, content } = shoes[paraId];
  let [tabActive, setTabActive] = useState(0);

  useEffect(() => {
    let watchedArray = JSON.parse(localStorage.getItem("watched"));
    watchedArray.push(filterItem.id);
    localStorage.setItem(
      "watched",
      JSON.stringify([...new Set(watchedArray)])
    );
  }, [])
  
  return (
    <div className={["container","tran-start", detail].filter(Boolean).join(" ")}>
      <div>
        <input
          value={input}
          onChange={(e) => {
            const value = e.target.value;
            setInput(e.target.value);
            /* if(typeof etvalue !== "number"){
            setWarn(true);
          } */
            /* let etvalue = parseFloat(e.target.value);
          console.log(typeof etvalue)
          if(typeof etvalue !== "number"){
            setWarn(true);
          } */
          }}
        />
        {warn ? <p style={{ color: "red" }}>숫자만 입력하세요</p> : null}
      </div>
      <Box>
        {count}
        <YellowBtn
          bg="blue"
          onClick={() => {
            setCount((prev) => prev + 1);
          }}
        >
          버튼
        </YellowBtn>
        <YellowBtn bg="orange">버튼</YellowBtn>
        <NewBtn bg="orange">버튼</NewBtn>
      </Box>
      <div className="alert alert-warning" ref={alertBox}>
        2초 이내 구매시 할인
      </div>
      {boxAlert ? (
        <div className="alert alert-warning">2초 이내 구매시 할인2</div>
      ) : null}

      <div className="row">
        <div className="col-md-6">
          <img
            src={`https://codingapple1.github.io/shop/shoes${
              filterItem.id + 1
            }.jpg`}
            width="100%"
          />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{filterItem.title}</h4>
          <p>{filterItem.content}</p>
          <p>{filterItem.price}원</p>
          <button className="btn btn-danger" onClick={() => {
            dispatch(pushProduct(filterItem));
            navigate('/cart')
          }}>주문하기</button>
        </div>
      </div>

      <Nav variant="tabs" defaultActiveKey={`link` + tabActive}>
        <Nav.Item>
          <Nav.Link onClick={() => setTabActive(0)} eventKey="link0">
            탭1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setTabActive(1)} eventKey="link1">
            탭2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tabActive={tabActive} shoes={shoes} />
    </div>
  );
};


function TabContent({ tabActive, shoes }) {
  let [tabModi, setTabModi] = useState("");
  let timer = 0;
  let { storage } = useContext(Context1);
  useEffect(() => {
    timer = setTimeout(() => {
      setTabModi("tran-end");
    }, 50);
    return () => {
      clearTimeout(timer);
      setTabModi("");
    };
  }, [tabActive]);
  return (
    <div className={["tran-start", tabModi].filter(Boolean).join(" ")}>
      {[<div>탭1 {storage}</div>, <div>탭2 내용</div>][tabActive]}
    </div>
  );
}

export default Detail;
